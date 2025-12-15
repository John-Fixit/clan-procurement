import { Upload, Space, Card, Typography, message, Tag } from "antd";
import {
  InboxOutlined,
  FileOutlined,
  FilePdfOutlined,
  FileWordOutlined,
  FileExcelOutlined,
  FileImageOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button } from "@heroui/react";
import { IoChevronBackOutline, IoChevronForwardSharp } from "react-icons/io5";

const { Dragger } = Upload;
const { Text } = Typography;

const ProjectSupportDocument = (props) => {
  const { watch, setValue, handleNext, handlePrev, isSubmitting } = props;

  // Watch the documents field from react-hook-form
  const uploadedDocuments = watch("documents") || [];

  // Get icon based on file type
  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop().toLowerCase();
    const iconStyle = { fontSize: "24px" };

    if (["pdf"].includes(ext))
      return <FilePdfOutlined style={{ ...iconStyle, color: "#ff4d4f" }} />;
    if (["doc", "docx"].includes(ext))
      return <FileWordOutlined style={{ ...iconStyle, color: "#1890ff" }} />;
    if (["xls", "xlsx"].includes(ext))
      return <FileExcelOutlined style={{ ...iconStyle, color: "#52c41a" }} />;
    if (["jpg", "jpeg", "png", "gif", "svg"].includes(ext))
      return <FileImageOutlined style={{ ...iconStyle, color: "#722ed1" }} />;
    return <FileOutlined style={{ ...iconStyle, color: "#8c8c8c" }} />;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
  };

  // Custom upload props
  const uploadProps = {
    name: "file",
    multiple: true,
    beforeUpload: (file) => {
      // Validate file size (10MB max)
      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error("File must be smaller than 10MB!");
        return false;
      }

      // Add file to list
      const newFile = {
        uid: file.uid,
        name: file.name,
        size: file.size,
        type: file.type,
        status: "done",
        originFileObj: file,
        uploadDate: new Date().toISOString(),
        url: URL.createObjectURL(file),
      };

      setValue("documents", [...uploadedDocuments, newFile]);

      // Prevent automatic upload
      return false;
    },
    onRemove: (file) => {
      const newFileList = uploadedDocuments.filter(
        (item) => item.uid !== file.uid
      );
      setValue("documents", newFileList);
    },
    onChange: (info) => {
      const { status } = info.file;
      if (status === "done") {
        message.success(`${info.file.name} file added successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  // Remove uploaded document
  const removeDocument = (uid) => {
    const newDocuments = uploadedDocuments.filter((doc) => doc.uid !== uid);
    setValue("documents", newDocuments);
    message.success("Document removed");
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "900px",
        margin: "0 auto",
        padding: "24px",
      }}
      className="space-y-3"
    >
      <div>
        <h2 className="font-outfit  text-2xl font-semibold text-primary">
          Support Document
        </h2>
        <p className="font-outfit text-gray-500 text-sm">
          Upload relevant documents, contracts, or files related to this project
        </p>
      </div>
      <div>
        {/* Upload Area */}
        <Card className="space-y-4">
          <Dragger
            {...uploadProps}
            defaultFileList={false}
            style={{ padding: "20px" }}
            showUploadList={false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
            </p>
            <p
              className="ant-upload-text font-outfit"
              style={{ fontSize: "16px", fontWeight: 500 }}
            >
              Click or drag files to this area to upload
            </p>
            <p
              className="ant-upload-hint font-outfit"
              style={{ color: "#8c8c8c" }}
            >
              Accepted formats: PDF, DOC, DOCX, XLS, XLSX, PNG, JPG, etc.
            </p>
          </Dragger>
        </Card>
      </div>
      <div>
        {/* Uploaded Documents List */}
        {uploadedDocuments.length > 0 && (
          <Card
            title={
              <Space>
                <p className="font-outfit text-gray-700">Uploaded Documents</p>
                <Tag color="blue">{uploadedDocuments.length}</Tag>
              </Space>
            }
          >
            <Space direction="vertical" size="middle" style={{ width: "100%" }}>
              {uploadedDocuments.map((doc) => (
                <Card
                  key={doc.uid}
                  size="small"
                  style={{
                    borderRadius: "8px",
                    border: "1px solid #f0f0f0",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                    }}
                  >
                    {/* File Icon */}
                    <div style={{ flexShrink: 0 }}>{getFileIcon(doc.name)}</div>

                    {/* File Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        style={{
                          fontWeight: 500,
                          fontSize: "14px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {doc.name}
                      </div>
                      <Space size="small" style={{ marginTop: "4px" }}>
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          {formatFileSize(doc.size)}
                        </Text>
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          •
                        </Text>
                        <Text type="secondary" style={{ fontSize: "12px" }}>
                          {new Date(doc.uploadDate).toLocaleDateString()}
                        </Text>
                      </Space>
                    </div>

                    {/* Actions */}
                    <Space>
                      <Button
                        variant="light"
                        size="sm"
                        danger
                        icon={<DeleteOutlined />}
                        onPress={() => removeDocument(doc.uid)}
                        title="Remove"
                      />
                    </Space>
                  </div>
                </Card>
              ))}
            </Space>
          </Card>
        )}
      </div>
      <div className="border-t border-gray-200 mt-10 py-6 flex justify-between">
        <Button
          radius="sm"
          color="primary"
          variant="bordered"
          onPress={handlePrev}
        >
          <IoChevronBackOutline /> Previous
        </Button>
        <Button
          radius="sm"
          color="primary"
          onPress={handleNext}
          isLoading={isSubmitting}
        >
          Continue <IoChevronForwardSharp />
        </Button>
      </div>
    </div>
  );
};

export default ProjectSupportDocument;
