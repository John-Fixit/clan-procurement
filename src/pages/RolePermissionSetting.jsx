import { useState } from "react";
import {
  FaUserPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import clsx from "clsx";
import { LuChevronDown } from "react-icons/lu";
import ActionIcons from "../components/shared/ActionIcons";
import Button from "../components/shared/ui/Button";
import { Input, Select } from "antd";
import useDrawerStore from "../hooks/useDrawerStore";

const RolePermissionSetting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    permissions: [],
  });

  const { openDrawer } = useDrawerStore();

  // Define roles for procurement app
  const roles = [
    {
      value: "admin",
      label: "Admin",
      description: "Full system access and control",
      color: "bg-purple-100 text-purple-700",
    },
    {
      value: "approving_officer",
      label: "Approving Officer",
      description: "Can approve and reject procurement requests",
      color: "bg-blue-100 text-blue-700",
    },
    {
      value: "enrollment_officer",
      label: "Enrollment Officer",
      description: "Can enroll vendors and manage registrations",
      color: "bg-green-100 text-green-700",
    },
    {
      value: "procurement_officer",
      label: "Procurement Officer",
      description: "Can create and manage procurement requests",
      color: "bg-orange-100 text-orange-700",
    },
    {
      value: "finance_officer",
      label: "Finance Officer",
      description: "Can manage budgets and financial records",
      color: "bg-teal-100 text-teal-700",
    },
    {
      value: "vendor_manager",
      label: "Vendor Manager",
      description: "Can manage vendor relationships and contracts",
      color: "bg-indigo-100 text-indigo-700",
    },
    {
      value: "viewer",
      label: "Viewer",
      description: "Read-only access to system data",
      color: "bg-gray-100 text-gray-700",
    },
  ];

  // Define permissions
  const permissions = [
    { id: "create_procurement", label: "Create Procurement Requests" },
    { id: "approve_procurement", label: "Approve/Reject Requests" },
    { id: "manage_vendors", label: "Manage Vendors" },
    { id: "manage_users", label: "Manage Users & Roles" },
    { id: "view_reports", label: "View Reports" },
    { id: "manage_budget", label: "Manage Budget" },
    { id: "generate_po", label: "Generate Purchase Orders" },
    { id: "manage_contracts", label: "Manage Contracts" },
  ];

  // Sample staff data
  const [staffList] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      role: "admin",
      status: "active",
      avatar: "JD",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.j@company.com",
      role: "approving_officer",
      status: "active",
      avatar: "SJ",
    },
    {
      id: 3,
      name: "Michael Chen",
      email: "m.chen@company.com",
      role: "enrollment_officer",
      status: "active",
      avatar: "MC",
    },
    {
      id: 4,
      name: "Emily Williams",
      email: "emily.w@company.com",
      role: "procurement_officer",
      status: "inactive",
      avatar: "EW",
    },
  ]);

  const handleAddStaff = () => {
    openDrawer({
      viewName: "add-staff-role-permission",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to save staff
    setIsModalOpen(false);
  };

  const handlePermissionToggle = (permissionId) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };

  const getRoleInfo = (roleValue) => {
    return roles.find((r) => r.value === roleValue);
  };

  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      selectedRole === "" ||
      staff.role === selectedRole
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10 font-primary">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Role & Permission Management
        </h1>
        <p className="text-gray-600">
          Manage staff roles and permissions for your procurement system
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg  p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Staff</p>
              <p className="text-2xl font-bold text-gray-900">
                {staffList.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <MdAdminPanelSettings className="text-2xl text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg  p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">
                {staffList.filter((s) => s.status === "active").length}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <FaCheckCircle className="text-2xl text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg  p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Roles</p>
              <p className="text-2xl font-bold text-gray-900">{roles.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MdAdminPanelSettings className="text-2xl text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg  p-6 border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Permissions</p>
              <p className="text-2xl font-bold text-gray-900">
                {permissions.length}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <FaCheckCircle className="text-2xl text-orange-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="bg-white rounded-lg  border border-gray-200 p-6 mb-6">
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
            {/* Search */}
            <div className="relative flex-1">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                size="large"
              />
            </div>

            {/* Role Filter */}
            <Select
              value={selectedRole}
              onChange={(value) => setSelectedRole(value)}
              options={roles}
              classNames={{
                root: "min-w-56",
              }}
            />
          </div>

          {/* Add Staff Button */}
          <Button color="primary" radius="sm" onPress={handleAddStaff}>
            {" "}
            <FaUserPlus />
            Add Staff
          </Button>
        </div>
      </div>

      {/* Staff Table */}
      <div className="w-full">
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">Staff member</div>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
                          />
                        </svg>
                      </button>
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                          />
                        </svg>
                      </button>
                    </div>
                  </th>

                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center">
                      Email <LuChevronDown className="ml-1 w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center">
                      Role <LuChevronDown className="ml-1 w-3 h-3" />
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center">
                      Status <LuChevronDown className="ml-1 w-3 h-3" />
                    </div>
                  </th>

                  <th className="px-6 py-3 text-left">
                    <div className="flex items-center">Action</div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((staff) => {
                  const roleInfo = getRoleInfo(staff.role);
                  return (
                    <tr
                      key={staff.id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-linear-to-br from-purple-500 to-primary rounded-full flex items-center justify-center text-white font-semibold">
                            {staff.avatar}
                          </div>
                          <div>
                            <p className="text-sm font-outfit text-gray-500 whitespace-nowrap">
                              {staff.name}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-3">
                        <p className="text-sm font-outfit font-light text-gray-500 whitespace-nowrap">
                          {staff.email}
                        </p>
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={clsx(
                            "px-3 py-1 rounded-full text-sm font-outfit text-gray-500 whitespace-nowrap",
                            roleInfo?.color
                          )}
                        >
                          {roleInfo?.label}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        {staff.status === "active" ? (
                          <span className="flex items-center gap-2 text-green-600">
                            <FaCheckCircle />
                            <span className="text-sm font-outfit whitespace-nowrap">
                              Active
                            </span>
                          </span>
                        ) : (
                          <span className="flex items-center gap-2 text-gray-500">
                            <FaTimesCircle />
                            <span className="text-sm font-outfit whitespace-nowrap">
                              Inactive
                            </span>
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center">
                          <ActionIcons variant={"EDIT"} />
                          <ActionIcons variant={"DELETE"} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                Add New Staff Member
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <IoClose className="text-2xl text-gray-600" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Basic Information */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Basic Information
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Enter full name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="Enter email address"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Role Selection */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Select Role *
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {roles.map((role) => (
                    <label
                      key={role.value}
                      className={clsx(
                        "relative flex items-start p-4 border rounded-lg cursor-pointer transition-all",
                        formData.role === role.value
                          ? "border-indigo-600 bg-indigo-50"
                          : "border-gray-200 hover:border-gray-300"
                      )}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={role.value}
                        checked={formData.role === role.value}
                        onChange={(e) =>
                          setFormData({ ...formData, role: e.target.value })
                        }
                        className="mt-1 mr-3 text-indigo-600 focus:ring-indigo-500"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">
                          {role.label}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {role.description}
                        </p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Additional Permissions
                </h3>
                <div className="space-y-2 bg-gray-50 rounded-lg p-4">
                  {permissions.map((permission) => (
                    <label
                      key={permission.id}
                      className="flex items-center gap-3 p-3 hover:bg-white rounded-lg cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission.id)}
                        onChange={() => handlePermissionToggle(permission.id)}
                        className="w-4 h-4 text-indigo-600 rounded focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        {permission.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-2.5 bg-primary hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
                >
                  Add Staff Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default RolePermissionSetting;
