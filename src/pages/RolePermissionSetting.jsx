import { useState } from "react";
import {
  FaUserPlus,
  FaSearch,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { MdAdminPanelSettings } from "react-icons/md";
import clsx from "clsx";
import { LuChevronDown } from "react-icons/lu";
import ActionIcons from "../components/shared/ActionIcons";
import Button from "../components/shared/ui/Button";
import { Input, Select, Switch } from "antd";
import useDrawerStore from "../hooks/useDrawerStore";
import { Avatar } from "@heroui/react";
import { preProfileLink } from "../utils/pre-profile-link";
import { roles } from "../utils/static-data";
import { useDeleteStaff, useToggleStaffStatus } from "../service/api/setting";
import { catchErrFunc } from "../utils/catchErrFunc";
import { successToast } from "../utils/toastPopUps";
import { Modal as AntModal } from "antd";

const RolePermissionSetting = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const { openDrawer } = useDrawerStore();

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

  const [selectedRow, setSelectedRow] = useState(null);
  const { mutateAsync: toggleStaffStatus, isPending: isLoadingToggle } =
    useToggleStaffStatus();
  const handleToggle = async (status, row) => {
    setSelectedRow(row);
    try {
      const json = {
        status,
        staffId: row.id,
      };
      const res = await toggleStaffStatus(json);
      console.log(res);
    } catch (err) {
      catchErrFunc(err);
    }
  };

  //=============Delete staff ===========
  const [modal, contextHolder] = AntModal.useModal();

  const config = {
    title: "Confirm!",
    okText: "Yes, Delete",
    content: (
      <>
        <p className="fot-primary">Are you sure to delete this Tax?</p>
      </>
    ),
  };

  const { mutateAsync: mutateDeleteStaff } = useDeleteStaff();

  const confirmDelete = async (staffId) => {
    const json = {
      staffId,
    };
    try {
      const res = await mutateDeleteStaff(json);
      successToast(res?.data?.message);
    } catch (err) {
      catchErrFunc(err);
    }
  };

  const handleDelete = (staff) => {
    modal.confirm({ ...config, onOk: () => confirmDelete(staff.id) });
  };

  ///====================

  return (
    <>
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
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MdAdminPanelSettings className="text-2xl text-purple-600" />
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
                <p className="text-2xl font-bold text-gray-900">
                  {roles.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <MdAdminPanelSettings className="text-2xl text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg  border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1 w-full">
              {/* Search */}
              <div className="relative w-1/4">
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
                  root: "min-w-44",
                }}
                placeholder="Filter by role"
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
                            <div>
                              <Avatar
                                size="sm"
                                src={preProfileLink(staff.name)}
                              />
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
                          <div className="flex items-center gap-1">
                            <Switch
                              loading={
                                selectedRow?.id === staff?.id && isLoadingToggle
                              }
                              onChange={(e) => handleToggle(e, staff)}
                            />
                            <ActionIcons variant={"EDIT"} />
                            <ActionIcons
                              variant={"DELETE"}
                              action={() => handleDelete(staff)}
                            />
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
      </div>
      {contextHolder}
    </>
  );
};

export default RolePermissionSetting;
