import { BsEnvelopePaper, BsFiletypeDoc, BsFiletypeDocx } from "react-icons/bs";
import { MdOutlineFileDownload } from "react-icons/md";
import { useMemo, useState } from "react";
import { GrDocumentCsv, GrDocumentZip } from "react-icons/gr";
import { TbFileTypePdf } from "react-icons/tb";
import SupportDocModal from "../ui/SupportDocModal";

const SupportDocumentView = ({ details }) => {
  const [imageModalOpen, setImageModalOpen] = useState({
    status: false,
    file: null,
  });

  const fileName = useMemo(() => {
    const isAdvance = Object.entries(details?.data).some(
      ([key]) => key === "PRINCIPAL" || key === "MONTHLY_REPAYMENT"
    );
    return isAdvance ? "Payroll" : "Attachment";
  }, [details?.data]);

  const downloadFile = async (url, fileName, fileType) => {
    try {
      // Fetch the file
      const response = await fetch(url);

      if (!response.ok) {
        onDocClick(url, fileName);
      }

      // Get the blob from the response
      const blob = await response.blob();

      // Create a new blob with the correct MIME type if provided
      const file = fileType ? new Blob([blob], { type: fileType }) : blob;

      // Create a URL for the blob
      const blobUrl = window.URL.createObjectURL(file);

      // Create a temporary anchor element
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;

      // Append to the document, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up the blob URL
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  const onDocClick = (url, name) => {
    try {
      const pdfUrl = url;
      const link = document.createElement("a");
      link.href = pdfUrl;
      link.setAttribute("target", "_blank");
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  // Helper function to get file extension from URL
  const getFileExtension = (url) => {
    if (!url) return "";
    return url.split(".").pop().toLowerCase();
  };

  // Helper function to check if file is an image
  const isImageFile = (url) => {
    const extension = getFileExtension(url);
    return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension);
  };

  return (
    <div className="w-full border border-gray-200 rounded-xl p-4 sm:p-6 mb-6">
      <h4 className="text-lg">Attachment</h4>
      <div className="mt-6">
        <div className="flex gap-4 flex-wrap">
          {details?.support_documents?.length > 0 ? (
            details?.support_documents?.map((data, i) => (
              <div
                key={data?.id || i}
                className="flex justify-between w-[40%] items-center bg-white"
              >
                {data?.attachment_url ? (
                  <div className="group w-full">
                    {isImageFile(data?.attachment_url) ? (
                      <div className="relative flex gap-x-4 flex-wrap space-y-1 border-1 border-gray-300 hover:border-gray-400 rounded-lg items-center w-full p-2 py-3 h-full">
                        <img
                          alt="Image"
                          height="100"
                          width="100"
                          onClick={() =>
                            setImageModalOpen({
                              status: true,
                              file: data?.attachment_url,
                            })
                          }
                          src={data.attachment_url}
                          className="
                            object-cover 
                            cursor-zoom-in 
                            hover:scale-110 
                            transition 
                            translate
                            flex items-center gap-2
                            rounded
                          "
                        />
                        <div
                          onClick={() =>
                            downloadFile(
                              data?.attachment_url,
                              `${fileName} ${i + 1}`
                            )
                          }
                          className="absolute bottom-1 right-1 group-hover:block rounded-full bg-gray-100 p-1 cursor-pointer items-center gap-2"
                        >
                          <MdOutlineFileDownload size={20} />
                        </div>
                      </div>
                    ) : (
                      <div className="flex gap-x-4 flex-wrap space-y-1 border-2 border-gray-300 hover:border-gray-400 rounded-lg items-center w-full p-2 py-3">
                        <div className="relative w-full flex">
                          <div
                            className="flex gap-1 px-2 pr-4 cursor-pointer items-center flex-1 truncate"
                            onClick={() =>
                              downloadFile(
                                data?.attachment_url,
                                `${fileName} ${i + 1}`
                              )
                            }
                          >
                            {data?.attachment_url.includes(".pdf") ? (
                              <TbFileTypePdf
                                size={35}
                                className="text-red-500"
                              />
                            ) : data?.attachment_url.includes(".doc") ? (
                              <BsFiletypeDoc
                                size={35}
                                className="text-blue-500"
                              />
                            ) : data?.attachment_url.includes(".docx") ? (
                              <BsFiletypeDocx
                                size={35}
                                className="text-blue-500"
                              />
                            ) : data?.attachment_url.includes(".csv") ? (
                              <GrDocumentCsv
                                size={35}
                                className="text-blue-500"
                              />
                            ) : data?.attachment_url.includes(".zip") ? (
                              <GrDocumentZip
                                size={35}
                                className="text-blue-500"
                              />
                            ) : (
                              <BsFiletypeDoc
                                size={35}
                                className="text-gray-500"
                              />
                            )}

                            <span className="line-clamp-1 truncate w-full">
                              {fileName} {i + 1}
                            </span>
                          </div>
                          <div
                            onClick={() =>
                              downloadFile(
                                data?.attachment_url,
                                `${fileName} ${i + 1}`
                              )
                            }
                            className="ml-auto w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 p-1 cursor-pointer gap-2"
                          >
                            <MdOutlineFileDownload size={20} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : null}
              </div>
            ))
          ) : (
            <div className="flex flex-col gap-2 w-full items-center justify-center h-full pt-5">
              <BsEnvelopePaper className="text-gray-300" size={40} />
              <span className="text-default-400 font-bold text-lg">
                Empty Records
              </span>
            </div>
          )}
        </div>
      </div>

      <SupportDocModal
        src={imageModalOpen.file}
        isOpen={imageModalOpen.status}
        onClose={() => setImageModalOpen({ status: false, file: null })}
      />
    </div>
  );
};

export default SupportDocumentView;
