import {
  BsFileText,
  BsEnvelope,
  BsTelephone,
  BsGeoAlt,
  BsBriefcase,
  BsCalendar3,
  BsBoxArrowUpRight,
} from "react-icons/bs";
import useDrawerStore from "../../../hooks/useDrawerStore";
import { Avatar } from "@heroui/react";
import { preProfileLink } from "../../../utils/pre-profile-link";

export default function VendorDetail() {
  const { data } = useDrawerStore();
  const { vendorDetail: vendor } = data;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getDocumentName = (doc) => {
    return doc.DOCUMENT_NAME || `Document #${doc.DOCUMENT_ID}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start justify-between">
            <div className="flex gap-3 items-center">
              <Avatar
                src={preProfileLink(vendor.FULLNAME)}
                className="w-20 h-20"
              />
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {vendor.FULLNAME}
                </h1>
              </div>
            </div>
            <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Active
            </span>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Contact Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                <BsEnvelope className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="text-gray-900">{vendor.EMAIL}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <BsTelephone className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="text-gray-900">{vendor.PHONE}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center">
                <BsBriefcase className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Business Type</p>
                <p className="text-gray-900">{vendor.BUSINESS}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <BsGeoAlt className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Address</p>
                <p className="text-gray-900">
                  {vendor.ADDRESS || "Not provided"}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Documents
          </h2>

          {vendor.VENDOR_DOCUMENTS.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <BsFileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No documents available</p>
            </div>
          ) : (
            <div className="space-y-4">
              {vendor.VENDOR_DOCUMENTS.map((doc) => (
                <div
                  key={doc.DOCUMENT_ID}
                  className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
                        <BsFileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 mb-1">
                          {getDocumentName(doc)}
                        </h3>

                        <div className="flex items-center gap-4 text-sm">
                          {doc?.START_DATE && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <BsCalendar3 className="w-4 h-4" />
                              <span>Start: {formatDate(doc.START_DATE)}</span>
                            </div>
                          )}
                          {doc.END_DATE && (
                            <div className="flex items-center gap-1 text-gray-600">
                              <BsCalendar3 className="w-4 h-4" />
                              <span>End: {formatDate(doc.END_DATE)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <a
                      href={doc.DOCUMENT_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      View
                      <BsBoxArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
