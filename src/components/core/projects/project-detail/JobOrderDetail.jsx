import { useEffect, useRef, useState } from "react";
import {
  FiFileText,
  FiUser,
  FiCalendar,
  FiMapPin,
  FiPackage,
  FiFolder,
  FiPhone,
  FiMail,
  FiCheckCircle,
  FiClock,
} from "react-icons/fi";
import Button from "../../../shared/ui/Button";
import JoborderTemplate from "../../templates/job-order/JobOrderTemplate";
import LocalPurchaseOrder from "../../templates/local-purchase-order/LocalPurchaseOrder";
import { Chip, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { PiMoneyWavyLight } from "react-icons/pi";
import { LuDownload } from "react-icons/lu";
import { findProjectType } from "../../../../utils/findProjectType";
import useDrawerStore from "../../../../hooks/useDrawerStore";
import { useLocation } from "react-router-dom";
import { useCreateQrCode } from "../../../../service/api/general";

export default function JobOrderDetail({ details }) {
  const jobOrder = details?.data || {};

  const { openDrawer } = useDrawerStore();

  const location = useLocation().pathname;

  const [templateDownloadColor, setTemplateDownloadColor] = useState("");

  const componentRef = useRef();
  const jobOrderRef = useRef();

  const [templateQrCode, setTemplateQrCode] = useState("");

  const formatDate = (dateString) => {
    if (!dateString) return null;
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

  const [viewTemplate, setViewTemplate] = useState(false);

  const handleViewTemplate = () => {
    setViewTemplate(true);
  };
  const handleCloseViewTemplate = () => {
    setViewTemplate(false);
  };

  const handleDownload = () => {
    if (!componentRef?.current && !jobOrderRef?.current) return;

    const element =
      findProjectType(jobOrder.ORDER_TYPE)?.value == "2"
        ? componentRef.current
        : jobOrderRef.current;

    // Fallback approach: open a print-friendly window and let the user "Save as PDF"
    const printWindow = window.open("", "_blank", "width=900,height=1100");
    if (!printWindow) return;

    // Clone document head to preserve styles (tailwind/build css links)
    const headContent = document.head.innerHTML;

    printWindow.document.write(`<!doctype html>
      <html>
        <head>${headContent}
        <style>
        /*Ensure print styles here if needed*/
        @media print {
        body {
          margin: 0;
        }
          /* Force each section to start on a new page */
      .print\\:break-before-page {
        page-break-before: always;
        break-before: page;
      }
      
      /* Prevent page breaks inside each section */
      .print\\:break-after-page {
        page-break-after: always;
        break-after: page;
      }
      
      /* Optional: avoid breaking the first page */
      .print\\:break-before-page:first-child {
        page-break-before: auto;
        break-before: auto;
      }
    }
        </style>
        </head>
        <body>${element.outerHTML}</body>
      </html>`);

    printWindow.document.close();

    printWindow.addEventListener("load", () => {
      printWindow.focus();

      // Wait a tick so resources load, then trigger print dialog
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    });

    // Fallback timeout in case load event doesn't fire
    setTimeout(() => {
      if (!printWindow.closed) {
        printWindow.print();
        printWindow.close();
      }
    }, 3000);
  };

  const handleOpenChangeStatus = () => {
    openDrawer({
      viewName: "update-procurement-status",
      projectDetail: details,
    });
  };

  const templateClrs =
    findProjectType(jobOrder.ORDER_TYPE)?.value === "2"
      ? ["", "bg-blue-500", "bg-green-400", "bg-pink-400"]
      : ["", "bg-blue-400", "bg-yellow-400"];

  const { mutateAsync: createQrCode } = useCreateQrCode();

  useEffect(() => {
    const handleGenerateQrCode = async () => {
      const baseUrl = `${window.location.protocol}//${window.location.host}`;
      try {
        const res = await createQrCode({
          data: `${baseUrl}/template/document/${jobOrder?.ID}`,
        });
        setTemplateQrCode(res?.data);
        // setQr_link(res?.data?.data);

        // const file = base64ToFile(
        //   res?.data?.data,
        //   `doc_${memoDetail?.MEMO_ID}_QR.jpg`
        // );

        // const uploadRes = await uploadFileData(file);
        // await updateQrCode({
        //   memo_id: memoDetail?.MEMO_ID,
        //   link: uploadRes?.file_url,
        // });
      } catch (error) {
        console.log(error);
      }
    };

    handleGenerateQrCode();
  }, [createQrCode, jobOrder?.ID, jobOrder?.IS_APPROVED]);

  return (
    <>
      {viewTemplate ? (
        <div className="relative">
          <div className="flex justify-between flex-row-reverse">
            <Button
              radius="sm"
              size="sm"
              color="primary"
              onPress={handleCloseViewTemplate}
            >
              <FaRegEyeSlash /> Close Template
            </Button>

            <div className="">
              <Popover placement="right-end" showArrow={true} radius="sm">
                <PopoverTrigger>
                  <Button radius="full" isIconOnly={true}>
                    <LuDownload size={20} />
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col gap-2">
                    {templateClrs.map((clr) => (
                      <Button
                        radius="full"
                        onPress={() => {
                          setTemplateDownloadColor(clr);

                          setTimeout(() => {
                            handleDownload();
                          }, 500);
                        }}
                        isIconOnly={true}
                        className={`${clr} text-white`}
                      >
                        {!clr && <LuDownload size={20} />}
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          {findProjectType(jobOrder.ORDER_TYPE)?.value === "2" ? (
            <>
              <LocalPurchaseOrder
                details={{ ...details, qrCode: templateQrCode }}
                componentRef={componentRef}
                bgColor={templateDownloadColor}
                qrCode={templateQrCode}
              />
            </>
          ) : (
            <JoborderTemplate
              details={{ ...details, qrCode: templateQrCode }}
              componentRef={jobOrderRef}
              bgColor={templateDownloadColor}
              qrCode={templateQrCode}
            />
          )}
        </div>
      ) : (
        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-5xl mx-auto">
            {/* Header */}
            <div className="bg-primary rounded-lg p-3 px-6 mb-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold">{jobOrder.ORDER_TYPE}</h1>
                </div>
                <div className="flex gap-2 items-center flex-row-reverse">
                  <div>
                    <Button
                      className="bg-amber-400 font-primary font-medium text-white text-sm"
                      size="sm"
                      radius="sm"
                      onPress={handleViewTemplate}
                    >
                      <FaRegEye /> View Template
                    </Button>
                  </div>
                  {location.includes("request") && (
                    <Button
                      radius="sm"
                      size="sm"
                      onPress={handleOpenChangeStatus}
                    >
                      Change Status
                    </Button>
                  )}

                  {!location.includes("request") &&
                    (jobOrder.IS_APPROVED ? (
                      <Chip
                        color={
                          jobOrder.IS_APPROVED
                            ? "success"
                            : jobOrder?.IS_APPROVED === -1
                            ? "danger"
                            : "warning"
                        }
                        variant="solid"
                        className="text-white mt-1"
                      >
                        <div className="flex gap-1">
                          {jobOrder.IS_APPROVED ? (
                            <FiCheckCircle className="w-4 h-4" />
                          ) : (
                            <FiClock className="w-4 h-4" />
                          )}
                          <span className="font-semibold">
                            {jobOrder.IS_APPROVED
                              ? "Approved"
                              : "Pending Approval"}
                          </span>
                        </div>
                      </Chip>
                    ) : (
                      ""
                      // <p className="text-sm opacity-90">
                      //   Approval Stage: {jobOrder.CURRENT_APPROVAL_SN} of{" "}
                      //   {jobOrder.MAX_SN}
                      // </p>
                    ))}
                </div>
              </div>
            </div>

            {location.includes("request") && (
              <div className="flex justify-end mb-2 items-center gap-2">
                <p>Status:</p>
                <p className="px-2 font-primary rounded-full bg-blue-100 text-blue-500 capitalize">
                  <span className="text-xs">
                    {jobOrder?.STATUS_NAME?.toLowerCase()}
                  </span>
                </p>
              </div>
            )}

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
              {jobOrder.ORDER_TYPE == "Job Order" && (
                <Section title="Financial Details">
                  <div className="grid grid-cols-2 gap-6"></div>
                  <DetailItem
                    icon={PiMoneyWavyLight}
                    label="Job Amount"
                    value={formatCurrency(jobOrder.JOB_AMOUNT || 0)}
                  />
                  <DetailItem
                    icon={PiMoneyWavyLight}
                    label="Tax Rate"
                    value={`${Number(jobOrder.TAX_VALUE) || 0}%`}
                  />
                  <DetailItem
                    icon={PiMoneyWavyLight}
                    label="Tax Amount"
                    value={formatCurrency(
                      (parseFloat(jobOrder.JOB_AMOUNT || 0) *
                        parseFloat(Number(jobOrder.TAX_VALUE) || 0)) /
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
                              parseFloat(Number(jobOrder.TAX_VALUE) || 0)) /
                              100
                        )}
                      </span>
                    </div>
                  </div>
                </Section>
              )}

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
              {/* Receiving Details */}
              {(jobOrder?.RECEIVED_BY || jobOrder?.RECEIVED_NOTE_NO) && (
                <Section title="Receiving Information">
                  <DetailItem
                    icon={FiUser}
                    label="Received By"
                    value={jobOrder.RECEIVED_BY}
                  />
                  <DetailItem
                    icon={FiFileText}
                    label="Received Note Number"
                    value={jobOrder.RECEIVED_NOTE_NO}
                  />
                </Section>
              )}
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
          </div>
        </div>
      )}
    </>
  );
}

// eslint-disable-next-line no-unused-vars
const DetailItem = ({ icon: Icon, label, value }) =>
  value ? (
    <div className="flex items-start space-x-3 py-2 border-b border-gray-100 last:border-0">
      <div className="shrink-0 mt-1">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <p className="text-base text-gray-900 mt-1">{value || "N/A"}</p>
      </div>
    </div>
  ) : (
    ""
  );

const Section = ({ title, children }) => (
  <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
    <h2 className="text-lg font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-200">
      {title}
    </h2>
    {children}
  </div>
);
