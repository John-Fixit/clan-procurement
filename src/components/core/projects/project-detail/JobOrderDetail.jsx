import { Chip } from "@heroui/react";
import React from "react";
import {
  FiFileText,
  FiUser,
  FiCalendar,
  FiMapPin,
  FiDollarSign,
  FiPackage,
  FiCheckCircle,
  FiClock,
  FiFolder,
  FiPhone,
  FiMail,
} from "react-icons/fi";

export default function JobOrderDetail({ details }) {
  const jobOrder = details?.data || {};

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="bg-gray-200 rounded-lg p-3 px-6 mb-6 textwhite">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">{jobOrder.ORDER_TYPE}</h1>
            </div>
            <div className="text-right">
              <div>
                <Chip
                  color={
                    jobOrder.IS_APPROVED
                      ? "success"
                      : jobOrder?.IS_APPROVED === -1
                      ? "danger"
                      : "warning"
                  }
                  variant="flat"
                >
                  <div className="flex gap-1">
                    {jobOrder.IS_APPROVED ? (
                      <FiCheckCircle className="w-4 h-4" />
                    ) : (
                      <FiClock className="w-4 h-4" />
                    )}
                    <span className="font-semibold">
                      {jobOrder.IS_APPROVED ? "Approved" : "Pending Approval"}
                    </span>
                  </div>
                </Chip>
              </div>
              {/* <div
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${
                  jobOrder.IS_APPROVED
                    ? "bg-green-500"
                    : jobOrder?.IS_APPROVED === -1
                    ? "bg-red-100 text-red-500"
                    : "bg-[#b08548] text-[#f5a525]"
                }`}
              >
                {jobOrder.IS_APPROVED ? (
                  <FiCheckCircle className="w-5 h-5" />
                ) : (
                  <FiClock className="w-5 h-5" />
                )}
                <span className="font-semibold">
                  {jobOrder.IS_APPROVED ? "Approved" : "Pending Approval"}
                </span>
              </div> */}
              <p className="text-sm mt-3 opacity-90">
                Approval Stage: {jobOrder.CURRENT_APPROVAL_SN} of{" "}
                {jobOrder.MAX_SN}
              </p>
            </div>
          </div>
        </div>

        {/* Vendor Information */}
        <Section title="Vendor Information">
          <div className="grid grid-cols-2 gap-6">
            <DetailItem
              icon={FiUser}
              label="Vendor Name"
              value={jobOrder.VENDOR_NAME}
            />
            <DetailItem
              icon={FiMail}
              label="Email Address"
              value={jobOrder.VENDOR_EMAIL}
            />
            <DetailItem
              icon={FiPhone}
              label="Phone Number"
              value={jobOrder.VENDOR_PHONE}
            />

            {jobOrder.VENDOR_STATEMENT && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg border border-blue-100">
                <p className="text-sm font-medium text-blue-900 mb-1">
                  Vendor Statement
                </p>
                <p className="text-sm text-blue-800">
                  {jobOrder.VENDOR_STATEMENT}
                </p>
              </div>
            )}
          </div>
        </Section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Financial Details */}
          <Section title="Financial Details">
            <div className="grid grid-cols-2 gap-6"></div>
            <DetailItem
              icon={FiDollarSign}
              label="Job Amount"
              value={formatCurrency(jobOrder.JOB_AMOUNT || 0)}
            />
            <DetailItem
              icon={FiDollarSign}
              label="Tax Rate"
              value={`${jobOrder.TAX_VALUE || 0}%`}
            />
            <DetailItem
              icon={FiDollarSign}
              label="Tax Amount"
              value={formatCurrency(
                (parseFloat(jobOrder.JOB_AMOUNT || 0) *
                  parseFloat(jobOrder.TAX_VALUE || 0)) /
                  100
              )}
            />
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-gray-700">
                  Total Amount
                </span>
                <span className="text-xl font-bold text-gray-900">
                  {formatCurrency(
                    parseFloat(jobOrder.JOB_AMOUNT || 0) +
                      (parseFloat(jobOrder.JOB_AMOUNT || 0) *
                        parseFloat(jobOrder.TAX_VALUE || 0)) /
                        100
                  )}
                </span>
              </div>
            </div>
          </Section>

          {/* Project Details */}
          <Section title="Project Details">
            <DetailItem
              icon={FiMapPin}
              label="Location of Work"
              value={jobOrder.LOCATION_OF_WORK}
            />
            <DetailItem
              icon={FiFolder}
              label="File Reference"
              value={jobOrder.FILE_REFERENCE}
            />
            <DetailItem
              icon={FiFileText}
              label="Tender Reference"
              value={jobOrder.TENDER_REFERENCE}
            />
            <DetailItem
              icon={FiPackage}
              label="Department"
              value={`Department ${jobOrder.DEPARTMENT_SUPPLIED}`}
            />
          </Section>
        </div>

        {/* Dates & Timeline */}
        <Section title="Dates">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
            <DetailItem
              icon={FiCalendar}
              label="Date Awarded"
              value={formatDate(jobOrder.DATE_AWARDED)}
            />
            <DetailItem
              icon={FiCalendar}
              label="Date Supplied"
              value={formatDate(jobOrder.DATE_SUPPLIED)}
            />
            <DetailItem
              icon={FiCalendar}
              label="Received Date"
              value={formatDate(jobOrder.RECEIVED_DATE)}
            />
            <DetailItem
              icon={FiCalendar}
              label="Received Note Date"
              value={formatDate(jobOrder.RECEIVED_NOTE_DATE)}
            />
          </div>
        </Section>

        {/* Receiving Details */}
        <Section title="Receiving Information">
          <DetailItem
            icon={FiUser}
            label="Received By"
            value={` ${jobOrder.RECEIVED_BY || "N/A"}`}
          />
          <DetailItem
            icon={FiFileText}
            label="Received Note Number"
            value={jobOrder.RECEIVED_NOTE_NO}
          />
        </Section>
      </div>
    </div>
  );
}

// eslint-disable-next-line no-unused-vars
const DetailItem = ({ icon: Icon, label, value }) => (
  <div className="flex items-start space-x-3 py-2 border-b border-gray-100 last:border-0">
    <div className="flex-shrink-0 mt-1">
      <Icon className="w-5 h-5 text-blue-600" />
    </div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="text-base text-gray-900 mt-1">{value || "N/A"}</p>
    </div>
  </div>
);

const Section = ({ title, children }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
      {title}
    </h2>
    {children}
  </div>
);
