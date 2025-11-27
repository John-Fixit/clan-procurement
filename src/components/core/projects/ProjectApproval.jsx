import { Select, Avatar, Tag, Space } from "antd";
import { useMemo } from "react";
import Button from "../../shared/ui/Button";
import { IoChevronBackOutline } from "react-icons/io5";

// Mock data for approvers
const mockApprovers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@company.com",
    role: "Engineering Manager",
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael.c@company.com",
    role: "Product Lead",
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "emily.r@company.com",
    role: "Technical Director",
  },
  {
    id: 4,
    name: "David Kim",
    email: "david.k@company.com",
    role: "VP of Engineering",
  },
  {
    id: 5,
    name: "Lisa Thompson",
    email: "lisa.t@company.com",
    role: "Team Lead",
  },
  {
    id: 6,
    name: "James Wilson",
    email: "james.w@company.com",
    role: "Senior Developer",
  },
  {
    id: 7,
    name: "James Wilson",
    email: "james.w@company.com",
    role: "Senior Developer",
  },
  {
    id: 8,
    name: "James Wilson",
    email: "james.w@company.com",
    role: "Senior Developer",
  },
  {
    id: 9,
    name: "James Wilson",
    email: "james.w@company.com",
    role: "Senior Developer",
  },
];

const ProjectApproval = (props) => {
  const { watch, setValue, handlePrev, handleSubmit } = props;

  // Watch the approvers field from react-hook-form
  const selectedApprovers = watch("approvers") || [];

  const getInitials = (name) => {
    return name
      ?.split(" ")
      ?.map((n) => n[0])
      ?.join("")
      ?.toUpperCase();
  };

  const handleChange = (value) => {
    // value is array of IDs
    const selected = mockApprovers.filter((approver) =>
      value.includes(approver.id)
    );
    setValue("approvers", selected);
  };

  // Custom option renderer
  const renderOption = useMemo(
    () =>
      mockApprovers?.map((approver) => ({
        value: approver.id,
        ...approver,
        label: (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "4px 0",
            }}
          >
            <Avatar
              size={40}
              style={{
                backgroundColor: "#1890ff",
                flexShrink: 0,
              }}
            >
              {getInitials(approver.name)}
            </Avatar>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 500, color: "#262626" }}>
                {approver.name}
              </div>
              <div style={{ fontSize: "12px", color: "#8c8c8c" }}>
                {approver.role}
              </div>
              <div style={{ fontSize: "11px", color: "#bfbfbf" }}>
                {approver.email}
              </div>
            </div>
          </div>
        ),
      })),
    []
  );

  // Custom tag renderer for selected items
  const tagRender = (props) => {
    const { value, closable, onClose } = props;
    const approver = mockApprovers.find((a) => a.id === value);

    return (
      <Tag
        closable={closable}
        onClose={onClose}
        style={{
          marginRight: 3,
          padding: "2px 8px 2px 2px",
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "#e6f7ff",
          border: "1px solid #91d5ff",
          borderRadius: "16px",
        }}
      >
        <Avatar
          size={24}
          style={{
            backgroundColor: "#5e5fc4",
            fontSize: "10px",
          }}
        >
          {getInitials(approver?.name)}
        </Avatar>
        <span style={{ fontWeight: 500 }}>{approver?.name}</span>
      </Tag>
    );
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        padding: "24px",
      }}
    >
      <label
        style={{
          display: "block",
          fontSize: "14px",
          fontWeight: 500,
          color: "#262626",
          marginBottom: "8px",
        }}
        className="font-outfit"
      >
        Project Approvers
      </label>
      <p
        style={{
          fontSize: "14px",
          color: "#8c8c8c",
          margin: "0 0 16px 0",
        }}
        className="font-outfit"
      >
        Select team members who need to approve this project
      </p>

      <Select
        mode="multiple"
        style={{ width: "100%" }}
        placeholder="Search by name, email, or role..."
        value={selectedApprovers.map((a) => a.id)}
        onChange={handleChange}
        options={renderOption}
        size="large"
        tagRender={tagRender}
        maxTagCount="responsive"
        showSearch
        filterOption={(input, option) => {
          const approver = mockApprovers.find((a) => a.id === option.value);
          if (!approver) return false;
          const searchLower = input.toLowerCase();
          return (
            approver.name.toLowerCase().includes(searchLower) ||
            approver.email.toLowerCase().includes(searchLower) ||
            approver.role.toLowerCase().includes(searchLower)
          );
        }}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "12px",
        }}
      >
        <span style={{ fontSize: "14px", color: "#8c8c8c" }}>
          {selectedApprovers.length} approver
          {selectedApprovers.length !== 1 ? "s" : ""} selected
        </span>
        {selectedApprovers.length > 0 && (
          <button
            type="button"
            onClick={() => setValue("approvers", [])}
            style={{
              fontSize: "14px",
              color: "#1890ff",
              background: "none",
              border: "none",
              cursor: "pointer",
              fontWeight: 500,
              padding: 0,
            }}
          >
            Clear all
          </button>
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
        <Button radius="sm" color="primary" onPress={handleSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

export default ProjectApproval;
