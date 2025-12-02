import { Select } from "antd";
import { useState } from "react";
import { filePrefix } from "../../../utils/file-prefix";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { useGetAllStaff } from "../../../service/api/general";
import { Checkbox, CheckboxGroup, cn, User } from "@heroui/react";
import { FaUser } from "react-icons/fa";
import Button from "../../shared/ui/Button";
import { roles } from "../../../utils/static-data";
import { catchErrFunc } from "../../../utils/catchErrFunc";
import { useAddStaff } from "../../../service/api/setting";
import { successToast } from "../../../utils/toastPopUps";
import useDrawerStore from "../../../hooks/useDrawerStore";

const AddStaff = () => {
  const { userData } = useCurrentUser();

  const { data, closeDrawer } = useDrawerStore();

  const roleDetail = data?.roleDetail;

  const isUpdateRole = roleDetail ? true : false;

  const { data: get_staff, isPending: isLoadingStaff } = useGetAllStaff(
    userData?.data?.COMPANY_ID
  );
  const { mutateAsync: mutateAddStaff, isPending: isSubmitting } =
    useAddStaff();

  const staffList = get_staff?.map((item) => {
    return {
      ...item,
      value: item?.STAFF_ID,
      label: (
        <User
          avatarProps={{
            icon: <FaUser size={20} className="" />,
            radius: "full",
            src: item?.FILE_NAME ? filePrefix + item?.FILE_NAME : "",
            className:
              "w-8 h-8 my-2 object-cover rounded-full border-default-200 border",
          }}
          name={`${item?.LAST_NAME || ""} ${item?.FIRST_NAME || ""}`}
          classNames={{
            description: "w-48 truncat",
            name: "w-48 font-helvetica text-xs uppercase",
          }}
          css={{
            ".nextui-user-icon svg": {
              color: "red", // Set the color of the default icon
            },
          }}
          description={
            <div className="flex flex-co gap-y-1 justify-cente gap-x-3 m">
              {item?.DESIGNATION ? (
                <p className="font-helvetica my-auto text-black opacity-50 capitalize flex gap-x-2">
                  {item?.DESIGNATION?.toLowerCase()}
                  <span>-</span>
                </p>
              ) : null}
              <p className="font-helvetica text-black opacity-30 my-auto capitalize">
                {item?.STAFF_NUMBER}
              </p>
            </div>
          }
        />
      ),
      searchValue: `${item?.LAST_NAME || ""} ${item?.FIRST_NAME || ""} ${
        item?.STAFF_ID
      }`,
    };
  });

  const userRole = roleDetail?.roles?.map((rol) => rol?.label) || [];
  const [formData, setFormData] = useState({
    staff: roleDetail?.STAFF_ID || [],
    role: userRole,
  });

  const isDisabled =
    formData?.staff?.length === 0 || formData?.role?.length === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);
    const json = {
      is_admin: formData?.role?.includes("admin") ? true : false,
      is_enroller: formData?.role?.includes("is_enroller") ? true : false,
      is_approver: formData?.role?.includes("is_approver") ? true : false,
      date_created: new Date().toISOString(),
      is_active: true,
      creator_id: userData?.data?.STAFF_ID,
      creator_name:
        userData?.data?.FIRST_NAME + " " + userData?.data?.LAST_NAME,
      staff_details: isUpdateRole
        ? [
            {
              staff_name:
                formData?.staff?.FIRST_NAME + " " + formData?.staff?.LAST_NAME,
              staff_id: formData?.staff?.STAFF_ID,
            },
          ]
        : formData?.staff?.map((staff) => ({
            staff_name: staff?.FIRST_NAME + " " + staff?.LAST_NAME,
            staff_id: staff?.STAFF_ID,
          })),
    };
    try {
      const res = await mutateAddStaff(json);
      successToast(res?.data?.message);
      closeDrawer();
    } catch (err) {
      catchErrFunc(err);
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-primary font-bold text-gray-900">
            {isUpdateRole ? "Update" : "Add New"} Staff Member
          </h2>
        </div>

        {/* Modal Body */}
        <form className="p-6 space-y-6" onSubmit={handleSubmit}>
          {/* Basic Information */}
          <div>
            <h3 className="text-base font-mediu text-gray-900 mb-2 font-primary tracking-wide">
              Select Staff
            </h3>
            <div>
              <Select
                mode={isUpdateRole ? false : "multiple"}
                style={{ width: "100%" }}
                placeholder="Search by name, email, or role..."
                value={
                  isUpdateRole
                    ? formData?.staff
                    : formData?.staff?.map((a) => a.value)
                }
                onChange={(value, option) => {
                  setFormData({ ...formData, staff: option });
                }}
                loading={isLoadingStaff}
                options={staffList}
                size="large"
                labelInValue
                maxTagCount="responsive"
                showSearch={{
                  filterOption: (input, option) => {
                    const approver = staffList.find(
                      (a) => a.STAFF_ID === option.value
                    );
                    if (!approver) return false;
                    const searchLower = input.toLowerCase();
                    return (
                      `${approver?.FIRST_NAME} ${approver?.LAST_NAME}`
                        .toLowerCase()
                        .includes(searchLower) ||
                      approver?.DESIGNATION?.toLowerCase().includes(
                        searchLower
                      ) ||
                      approver?.STAFF_NUMBER?.toLowerCase().includes(
                        searchLower
                      )
                    );
                  },
                }}
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <h3 className="text-basetext-gray-900 mb-2 font-primary tracking-wide">
              Select Role
            </h3>
            <div>
              <CheckboxGroup
                classNames={{
                  base: "w-full",
                  wrapper: "gap-6 grid grid-cols-2",
                }}
                value={formData.role}
                onValueChange={(val) => {
                  setFormData({ ...formData, role: val });
                }}
                orientation="horizontal"
              >
                {roles.map((role) => (
                  <Checkbox
                    classNames={{
                      base: cn(
                        "inline-flex max-w-md w-full bg-content1 m-0",
                        "hover:bg-content2 items-center justify-start",
                        "cursor-pointer rounded-lg gap-2 p-4 border-1 border-gray-300 flex items-start p-4 border rounded-lg cursor-pointer transition-all",
                        "data-[selected=true]:border-primary",
                        "data-[selected=true]:bg-indigo-50"
                      ),
                      label: "w-full",
                    }}
                    value={role?.value}
                  >
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{role.label}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {role.description}
                      </p>
                    </div>
                  </Checkbox>
                ))}
              </CheckboxGroup>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-between gap-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={closeDrawer}
              className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <Button
              type="submit"
              className="px-6 py-2.5 bg-primary hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              isLoading={isSubmitting}
              isDisabled={isDisabled}
            >
              {isUpdateRole ? "Update" : "Add"} Staff Member
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddStaff;
