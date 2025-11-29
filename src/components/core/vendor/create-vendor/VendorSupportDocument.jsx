import { CiCalendar, CiFileOn } from "react-icons/ci";
import { FaCheckCircle } from "react-icons/fa";
import { IoAlertCircle, IoChevronBackOutline } from "react-icons/io5";
import { TbUpload } from "react-icons/tb";
import { TfiTrash } from "react-icons/tfi";
import Button from "../../../shared/ui/Button";
import { uploadFileData } from "../../../../utils/uploadFile";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useState } from "react";
import StarLoader from "../../loaders/StarLoader";

const VendorSupportDocument = (props) => {
  const { handlePrev, setValue, watch, handleSubmit, isSubmitting } = props;

  const documents = watch("support_documents");

  const setDocuments = (val) => {
    setValue("support_documents", val);
  };

  const { userData } = useCurrentUser();

  const handleUploadFile = async (file) => {
    try {
      const res = await uploadFileData(file, userData?.token);
      return res;
    } catch (err) {
      throw new Error(err);
    }
  };

  const [uploadingDocFile, setUploadingDocFile] = useState({
    state: false,
    docId: null,
  });

  const handleFileUpload = async (docId, event) => {
    const file = event.target.files[0];
    if (file) {
      setUploadingDocFile({ state: true, docId });
      const uploadedFile = await handleUploadFile(file);
      setUploadingDocFile({ state: false });
      if (uploadedFile?.file_url) {
        const newDoc = documents.map((doc) =>
          doc.id === docId
            ? {
                ...doc,
                file,
                url: uploadedFile?.file_url,
                uploaded: true,
                status: "uploaded",
              }
            : doc
        );
        setDocuments(newDoc);
      }
    }
  };

  const handleDateChange = (docId, field, value) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === docId ? { ...doc, [field]: value } : doc
      )
    );
  };

  const handleRemoveFile = (docId) => {
    const newDoc = documents.map((doc) =>
      doc.id === docId
        ? {
            ...doc,
            file: null,
            uploaded: false,
            status: "pending",
            startDate: "",
            endDate: "",
          }
        : doc
    );
    setDocuments(newDoc);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "uploaded":
        return "text-green-600 bg-green-50";
      case "pending":
        return "text-amber-600 bg-amber-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const completedCount = documents?.filter((d) => d?.uploaded)?.length;
  const totalCount = documents?.length;
  const progress = (completedCount / totalCount) * 100;

  console.log(documents);

  return (
    <div className="min-h-screen bg-gray50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="font-outfit  text-2xl font-semibold text-primary">
            Support Document
          </h2>
          <p className="text-gray-500 font-outfit text-sm">
            Please upload all required documents to complete your vendor
            registration
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700 font-outfit">
              Upload Progress
            </span>
            <span className="text-sm text-gray-500 font-outfit">
              {completedCount} of {totalCount} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className={`h-full rounded-full ${
                progress === 100 ? "bg-emerald-500" : "bg-yellow-400"
              }`}
              style={{
                width: `${progress}%`,
                background:
                  progress === 100
                    ? "repeating-linear-gradient(45deg, #10b981, #10b981 10px, #059669 10px, #059669 20px)"
                    : `repeating-linear-gradient(
  45deg,
  #ffc008,
  #ffc008 10px,
  #ffca47 10px,
  #ffca47 20px
)`,
              }}
            />
          </div>
        </div>

        {/* Documents List */}
        <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {documents?.map((doc) => (
            <div
              key={doc?.id}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden h-full"
            >
              <div className="p-4 relative">
                {/* Document Header */}
                <span
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium absolute top-2 right-2 ${getStatusColor(
                    doc.status
                  )}`}
                >
                  {doc.status === "uploaded" ? (
                    <>
                      <FaCheckCircle className="w-3 h-3" />
                      Uploaded
                    </>
                  ) : (
                    <>
                      <IoAlertCircle className="w-3 h-3" />
                      Pending
                    </>
                  )}
                </span>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-1">
                      <CiFileOn className="w-6 h-6 text-gray-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text- font-medium text-gray-600 font-primary">
                        {doc.name}
                      </h3>
                      <p className="text-gray-600 font-primary text-[13px]">
                        {doc.description}
                      </p>
                      {doc.requiresRenewal ? (
                        <span className="inline-flex items-center gap-1 mt-2 text-xs font-medium text-primary bg-blue-50 px-2 py-1 rounded-full font-outfit">
                          <CiCalendar className="w-3 h-3" />
                          Requires validity dates
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>

                {/* Upload Area */}
                {!doc.uploaded ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg px-8 py-3 text-center hover:border-blue-400 transition-colors">
                    {uploadingDocFile?.state &&
                    uploadingDocFile?.docId === doc.id ? (
                      <>
                        <label className="cursor-pointer flex flex-col items-center">
                          <StarLoader />
                          <span className="text-sm font-medium text-gray-500 mb-1 font-outfit">
                            File uploading
                          </span>
                        </label>
                      </>
                    ) : (
                      <>
                        <input
                          type="file"
                          id={`file-${doc.id}`}
                          className="hidden"
                          onChange={(e) => handleFileUpload(doc.id, e)}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />

                        <label
                          htmlFor={`file-${doc.id}`}
                          className="cursor-pointer flex flex-col items-center"
                        >
                          <TbUpload className="w-10 h-10 text-gray-400 mb-3" />
                          <span className="text-sm font-medium text-gray-700 mb-1 font-outfit">
                            Click to upload or drag and drop
                          </span>
                          <span className="text-xs text-gray-500 font-outfit">
                            PDF, JPG, PNG (Max 10MB)
                          </span>
                        </label>
                      </>
                    )}
                  </div>
                ) : (
                  <>
                    {/* Uploaded File Info */}
                    <div className="bg-green-50 border border-green-200 rounded-lg px-2 py-4 mb-2 relative">
                      <div className="absolute top-0 right-0">
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          onClick={() => handleRemoveFile(doc.id)}
                          className="text-red-600 hover:text-red-700 p-1"
                        >
                          <TfiTrash className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div>
                            <FaCheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900 wrap-anywhere">
                              {doc.file?.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              {doc.file?.size &&
                                (doc.file?.size / 1024).toFixed(2)}{" "}
                              {doc.file?.size && "KB"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Date Inputs for Renewable Documents */}
                    {doc.requiresRenewal ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-gray-500 font-outfit">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={doc.startDate}
                            onChange={(e) =>
                              handleDateChange(
                                doc.id,
                                "startDate",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-500 font-outfit">
                            End Date (Expiry)
                          </label>
                          <input
                            type="date"
                            value={doc.endDate}
                            onChange={(e) =>
                              handleDateChange(
                                doc.id,
                                "endDate",
                                e.target.value
                              )
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-200 mt-10 py-6 flex justify-between gap-6">
          <div>
            <Button
              radius="sm"
              color="primary"
              variant="bordered"
              onPress={handlePrev}
            >
              <IoChevronBackOutline /> Previous
            </Button>
          </div>
          <Button
            radius="sm"
            color="primary"
            onPress={handleSubmit}
            isLoading={isSubmitting}
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorSupportDocument;
