import clsx from "clsx";
import { useState } from "react";

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
const AddStaff = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    permissions: [],
  });

  const handlePermissionToggle = (permissionId) => {
    setFormData((prev) => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter((p) => p !== permissionId)
        : [...prev.permissions, permissionId],
    }));
  };
  return (
    <>
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-primary font-bold text-gray-900">
            Add New Staff Member
          </h2>
        </div>

        {/* Modal Body */}
        <form className="p-6 space-y-6">
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
                    <p className="font-medium text-gray-900">{role.label}</p>
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
              //   onClick={() => setIsModalOpen(false)}
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
    </>
  );
};

export default AddStaff;
