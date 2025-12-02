import { useMemo, useState } from "react";
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
import { Input, Result, Select } from "antd";
import useDrawerStore from "../hooks/useDrawerStore";
import { Avatar, Pagination, Switch } from "@heroui/react";
import { preProfileLink } from "../utils/pre-profile-link";
import { roles } from "../utils/static-data";
import {
  useDeleteStaff,
  useGetRole_Permission,
  useToggleStaffStatus,
} from "../service/api/setting";
import { catchErrFunc } from "../utils/catchErrFunc";
import { successToast } from "../utils/toastPopUps";
import { Modal as AntModal } from "antd";
import StarLoader from "../components/core/loaders/StarLoader";
import { format } from "date-fns";

const statusOption = [
  {
    label: "All",
    value: "",
    statusColor: "bg-gray-500",
    activeColor: "bg-blue-100",
  },
  {
    label: "Admin",
    value: "is_admin",
    statusColor: "bg-purple-500",
    activeColor: "bg-blue-100",
  },
  {
    label: "Approving Officer",
    value: "is_approver",
    statusColor: "bg-blue-500",
    activeColor: "bg-blue-100",
  },
  {
    label: "Enrollment Officer",
    value: "is_enroller",
    statusColor: "bg-green-500",
    activeColor: "bg-blue-100",
  },
];

const getRoleInfo = (passedRoles) => {
  //This is to get the role info from the passed roles
  const activeRole = passedRoles?.filter((r) => r.value);
  const dRole = [];
  for (let i = 0; i < activeRole.length; i++) {
    const findRole = roles?.find((r) => r.value === activeRole[i].label);
    dRole.push(findRole);
  }
  return dRole;
};

const RolePermissionSetting = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  const { openDrawer } = useDrawerStore();

  const {
    data: get_role_permission,
    isPending: isLoadingRolePermission,
    isError,
  } = useGetRole_Permission();

  const handleAddStaff = () => {
    openDrawer({
      viewName: "add-staff-role-permission",
    });
  };

  const role_permission = get_role_permission?.map((item) => {
    const is_admin = {
      value: item?.IS_ADMIN,
      label: "is_admin",
    };
    const is_enroller = {
      value: item?.IS_ENROLLER,
      label: "is_enroller",
    };
    const is_approver = {
      value: item?.IS_APPROVER,
      label: "is_approver",
    };

    const roles = [is_admin, is_enroller, is_approver];
    return {
      ...item,
      roles,
    };
  });

  const roleFilteredByRoleData = useMemo(() => {
    if (!selectedRole) return role_permission;
    return role_permission?.filter((rol) => {
      const mappedRoles = rol?.roles?.map((r) => r?.value && r?.label);
      return mappedRoles?.includes(selectedRole);
    });
  }, [role_permission, selectedRole]);

  const hasSearchFilter = Boolean(searchQuery?.trim());

  const [page, setPage] = useState(1);
  const [pageSize] = useState(10);

  const filteredRoles = useMemo(() => {
    let prevData = roleFilteredByRoleData?.length
      ? [...roleFilteredByRoleData]
      : [];

    if (hasSearchFilter) {
      const value = searchQuery?.trim()?.toLowerCase();

      const updatedData = roleFilteredByRoleData?.filter((item) => {
        const matches = [item?.STAFF?.toLowerCase()].some((field) =>
          field?.includes(value)
        );

        return matches;
      });

      prevData = updatedData.length ? updatedData : [];
    }

    return prevData;
  }, [hasSearchFilter, searchQuery, roleFilteredByRoleData]);

  const totalPage = Math.ceil(filteredRoles?.length / pageSize);

  const handlePageChange = (page) => {
    setPage(page);
  };

  const tableData = useMemo(() => {
    return filteredRoles?.slice((page - 1) * pageSize, page * pageSize);
  }, [filteredRoles, page, pageSize]);
  const [selectedRow, setSelectedRow] = useState(null);
  const { mutateAsync: toggleStaffStatus, isPending: isLoadingToggle } =
    useToggleStaffStatus();

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
    try {
      const res = await mutateDeleteStaff(staffId);
      successToast(res?.data?.message);
    } catch (err) {
      catchErrFunc(err);
    }
  };

  const handleDelete = (staff) => {
    modal.confirm({ ...config, onOk: () => confirmDelete(staff?.STAFF_ID) });
  };
  ///====================

  //Toggle staff status
  const handleToggle = async (status, row) => {
    setSelectedRow(row);
    try {
      const json = {
        staffId: row?.STAFF_ID,
      };
      await toggleStaffStatus(json);
    } catch (err) {
      catchErrFunc(err);
    }
  };
  //

  const handleOpenEditBox = (role) => {
    openDrawer({
      viewName: "add-staff-role-permission",
      roleDetail: role,
    });
  };

  const roleStatistics = useMemo(() => {
    const totalStaff = get_role_permission?.length;
    const activeStaff = get_role_permission?.filter((s) => s.IS_ACTIVE).length;
    const allRoles = roles?.length;

    return {
      totalStaff,
      activeStaff,
      allRoles,
    };
  }, [get_role_permission]);

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
          <div className="bg-white rounded-lg px-6 py-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Staff</p>
                <p className="text-2xl font-bold text-gray-900">
                  {roleStatistics?.totalStaff}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MdAdminPanelSettings className="text-2xl text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg px-6 py-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Active Users</p>
                <p className="text-2xl font-bold text-gray-900">
                  {roleStatistics?.activeStaff}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FaCheckCircle className="text-2xl text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg px-6 py-3 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">Roles</p>
                <p className="text-2xl font-bold text-gray-900">
                  {roleStatistics?.allRoles}
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
              <div className="flex flex-wrap items-center gap-2">
                {statusOption?.map((status) => (
                  <button
                    className={clsx(
                      "px-3 py-2 border border-gray-300 rounded-lg text-xs sm:text-sm font-medium text-gray-700  flex items-center whitespace-nowrap cursor-pointer",
                      status?.value === selectedRole ? status.activeColor : ""
                    )}
                    onClick={() => setSelectedRole(status?.value)}
                  >
                    <span
                      className={clsx(
                        "w-2 h-2 rounded-full mr-2 shrink-0",
                        status?.statusColor
                      )}
                    ></span>
                    <span className="inline">{status?.label}</span>
                  </button>
                ))}
              </div>
              {/* Search */}
              <div className="relative w-1/4">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by staff name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  size="large"
                />
              </div>
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
                        Date Added <LuChevronDown className="ml-1 w-3 h-3" />
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
                  {tableData?.length === 0 ? (
                    <tr>
                      <td colSpan={6}>
                        <div className="flex items-center justify-center h-44">
                          <div className="w-full h-full flex flex-col items-center justify-center">
                            {isLoadingRolePermission ? (
                              <div className="flex justify-center items-center">
                                <StarLoader />
                              </div>
                            ) : isError ? (
                              <Result
                                status={"error"}
                                title="An unexpected error occurred"
                                classNames={{
                                  title: "text-gray-500! text-base!",
                                }}
                              />
                            ) : (
                              // Empty State
                              <div className="flex flex-col items-center justify-center w-full h-full">
                                <div className="text-gray-500 text-sm font-medium">
                                  No Staff found
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    tableData?.map((staff, index) => {
                      const roleInfo = getRoleInfo(staff?.roles);
                      return (
                        <tr
                          key={staff?.ROLE_ID + "___" + index}
                          className="border-b border-gray-200 hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-3">
                            <div className="flex items-center gap-3">
                              <div>
                                <Avatar
                                  size="sm"
                                  src={preProfileLink(staff?.STAFF)}
                                />
                              </div>
                              <div>
                                <p className="text-sm font-outfit text-gray-500 whitespace-nowrap">
                                  {staff?.STAFF}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-3">
                            <p className="text-sm font-outfit font-light text-gray-500 whitespace-nowrap">
                              {staff?.DATE_CREATED
                                ? format(staff?.DATE_CREATED, "MMM dd, yyyy")
                                : "-"}
                            </p>
                          </td>
                          <td className="px-6 py-3 max-w-120">
                            <div className="flex flex-wrap gap-2 items-center">
                              {roleInfo?.map((role, index) => (
                                <span
                                  key={index + role?.value + "___role"}
                                  className={clsx(
                                    "px-3 py-1 rounded-full text-sm font-outfit text-gray-500 whitespace-nowrap",
                                    role?.color
                                  )}
                                >
                                  {role?.label}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-6 py-3">
                            {staff?.IS_ACTIVE ? (
                              <span className="flex items-center gap-2 text-green-600">
                                <FaCheckCircle />
                                <span className="text-sm font-outfit whitespace-nowrap">
                                  Active
                                </span>
                              </span>
                            ) : (
                              <span className="flex items-center gap-2 text-red-700">
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
                                thumbIcon={
                                  selectedRow?.ROLE_ID === staff?.ROLE_ID &&
                                  isLoadingToggle ? (
                                    <StarLoader size={14} />
                                  ) : null
                                }
                                isSelected={staff?.IS_ACTIVE}
                                onChange={(e) =>
                                  handleToggle(e.target.checked, staff)
                                }
                                size="sm"
                              />
                              <ActionIcons
                                variant={"EDIT"}
                                action={() => handleOpenEditBox(staff)}
                              />
                              <ActionIcons
                                variant={"DELETE"}
                                action={() => handleDelete(staff)}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
            <div className="my-4 flex justify-end mx-6">
              <Pagination
                showControls
                page={page}
                total={totalPage}
                onChange={handlePageChange}
              />
            </div>
          </div>
        </div>
      </div>
      {contextHolder}
    </>
  );
};

export default RolePermissionSetting;
