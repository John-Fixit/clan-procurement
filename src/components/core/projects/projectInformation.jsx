import { Button, Input, Textarea, User } from "@heroui/react";
import { Controller } from "react-hook-form";
import { Select, DatePicker } from "antd";
import dayjs from "dayjs";
import { IoChevronForward } from "react-icons/io5";
import { useGetAllStaff, useGetDepartment } from "../../../service/api/general";
import useCurrentUser from "../../../hooks/useCurrentUser";
import { filePrefix } from "../../../utils/file-prefix";
import { FaUser } from "react-icons/fa";
import { useGetTax } from "../../../service/api/setting";
import { useGetVendor } from "../../../service/api/vendor";
import { useMemo } from "react";
import { findProjectType } from "../../../utils/findProjectType";

const ProjectInformation = (props) => {
  const { control, watch, handleNext } = props;
  const project_type = watch("project_type");

  const { userData } = useCurrentUser();
  const { data: get_departments } = useGetDepartment({
    company_id: userData?.data?.COMPANY_ID,
  });
  const { data: get_staff, isPending: isLoadingStaff } = useGetAllStaff(
    userData?.data?.COMPANY_ID
  );

  const { data: get_tax, isPending: isLoadingTx } = useGetTax();

  const { data: get_vendors, isPending: isLoadingVendors } = useGetVendor();

  const vendorsList = useMemo(
    () =>
      get_vendors?.map((vvd) => ({
        ...vvd,
        value: vvd?.VENDOR_ID,
        label: vvd?.FULLNAME,
      })) || [],
    [get_vendors]
  );

  const taxOptions = get_tax?.map((tax) => ({
    ...tax,
    value: tax?.ID,
    label: tax?.TAX_NAME + " (" + parseFloat(tax?.PERCENTAGE) + "%)",
  }));
  const departments = get_departments?.map((department) => ({
    value: department?.NAME,
    label: department?.NAME,
    ...department,
  }));
  const staffList = get_staff?.map((item) => {
    return {
      ...item,
      value: item?.FIRST_NAME + " " + item?.LAST_NAME,
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

  return (
    <>
      <main className="">
        <div className="mb-5">
          <h2 className="font-outfit  text-2xl font-semibold text-primary">
            {findProjectType(project_type)?.label} Information
          </h2>
          <p className="font-outfit text-gray-500 text-sm">
            Fill in the details below to add a new project
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-6">
          {/* <div>
            <label htmlFor="" className="font-outfit">
              Project Type
            </label>
            <Controller
              name="project_type"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Select
                    options={projectTypeList}
                    {...field}
                    onChange={(value) => field.onChange(value)}
                    size="large"
                    className="w-full"
                    placeholder="Select project type"
                  />

                  {!!error?.message && (
                    <span className="text-red-400 font-outfit text-sm px-1">
                      {error?.message}
                    </span>
                  )}
                </>
              )}
            />
          </div> */}
          <div>
            <label htmlFor="" className="font-outfit mb-2">
              Order Number
            </label>
            <Controller
              name="order_number"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <Input
                  variant="bordered"
                  placeholder="Enter order number"
                  className="rounded-sm"
                  classNames={{
                    inputWrapper: "border shadow-none rounded-lg",
                  }}
                  {...field}
                  errorMessage={error?.message}
                  isInvalid={!!error?.message}
                />
              )}
            />
          </div>
          {findProjectType(project_type)?.value === "1" ? (
            <JobOrderForm
              control={control}
              departments={departments}
              taxOptions={taxOptions}
              isLoadingTx={isLoadingTx}
              isLoadingVendors={isLoadingVendors}
              vendorsList={vendorsList}
            />
          ) : (
            findProjectType(project_type).value === "2" && (
              <PurchaseOrderForm
                control={control}
                departments={departments}
                isLoadingStaff={isLoadingStaff}
                staffList={staffList}
                taxOptions={taxOptions}
                isLoadingVendors={isLoadingVendors}
                vendorsList={vendorsList}
              />
            )
          )}
        </div>

        <div className="border-t border-gray-200 mt-10 py-6 flex justify-end">
          <Button radius="sm" color="primary" onPress={handleNext}>
            Continue <IoChevronForward />
          </Button>
        </div>
      </main>
    </>
  );
};

export default ProjectInformation;

const JobOrderForm = ({
  control,
  departments,
  taxOptions,
  isLoadingTax,
  vendorsList,
  isLoadingVendors,
}) => {
  return (
    <>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Date Issued
        </label>
        <Controller
          name="date_issued"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <DatePicker
                className="w-full"
                size="large"
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date, dateString) => field.onChange(dateString)}
              />

              {!!error?.message && (
                <span className="text-red-400 font-outfit text-sm px-1">
                  {error?.message}
                </span>
              )}
            </>
          )}
        />
      </div>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Location of work
        </label>
        <Controller
          name="work_location"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label="work-location"
              variant="bordered"
              placeholder="work location"
              className="rounded-sm"
              classNames={{
                inputWrapper: "border shadow-none rounded-lg",
              }}
              {...field}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
            />
          )}
        />
      </div>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Department
        </label>
        <Controller
          name="recipient_department"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                options={departments}
                {...field}
                size="large"
                className="w-full"
                placeholder="Select a department"
              />

              {!!error?.message && (
                <span className="text-red-400 font-outfit text-sm px-1">
                  {error?.message}
                </span>
              )}
            </>
          )}
        />
      </div>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Completion Date
        </label>
        <Controller
          name="completion_date"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <DatePicker
                className="w-full"
                size="large"
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date, dateString) => field.onChange(dateString)}
              />

              {!!error?.message && (
                <span className="text-red-400 font-outfit text-sm px-1">
                  {error?.message}
                </span>
              )}
            </>
          )}
        />
      </div>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          File Reference
        </label>
        <Controller
          name="file_reference"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label="file_reference"
              variant="bordered"
              placeholder="File reference"
              className="rounded-sm"
              classNames={{
                inputWrapper: "border shadow-none rounded-lg",
              }}
              {...field}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
            />
          )}
        />
      </div>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Tender Reference
        </label>
        <Controller
          name="tender_reference"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label="tender_reference"
              variant="bordered"
              placeholder="tender reference"
              className="rounded-sm"
              classNames={{
                inputWrapper: "border shadow-none rounded-lg",
              }}
              {...field}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
            />
          )}
        />
      </div>

      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Select Vendor
        </label>
        <Controller
          name="vendor"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                options={vendorsList}
                loading={isLoadingVendors}
                labelInValue
                {...field}
                size="large"
                className="w-full"
                placeholder="Select vendor"
              />

              {!!error?.message && (
                <span className="text-red-400 font-outfit text-sm px-1">
                  {error?.message}
                </span>
              )}
            </>
          )}
        />
      </div>

      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Tax
        </label>
        <Controller
          name="tax"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                options={taxOptions}
                labelInValue
                {...field}
                onChange={(value, option) => {
                  field.onChange(option);
                }}
                loading={isLoadingTax}
                size="large"
                className="w-full"
                placeholder="Select a tax"
              />

              {!!error?.message && (
                <span className="text-red-400 font-outfit text-sm px-1">
                  {error?.message}
                </span>
              )}
            </>
          )}
        />
      </div>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Total Sum Amount
        </label>
        <Controller
          name="sum_amount"
          control={control}
          rules={{
            required: "This field is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <Input
              type="number"
              aria-label="sum_amount"
              variant="bordered"
              placeholder="Amount agreed to pay "
              className="rounded-sm"
              classNames={{
                inputWrapper: "border shadow-none rounded-lg",
              }}
              {...field}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
            />
          )}
        />
      </div>
      <div className="col-span-2">
        <label htmlFor="" className="font-outfit mb-2">
          Vendor statement
        </label>
        <Controller
          name="vendor_statement"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Textarea
              aria-label="vendor_statement"
              variant="bordered"
              placeholder="vendor statment"
              className="rounded-sm"
              classNames={{
                inputWrapper: "border shadow-none rounded-lg",
              }}
              minRows={4}
              {...field}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
            />
          )}
        />
      </div>
    </>
  );
};
const PurchaseOrderForm = ({
  control,
  departments,
  isLoadingStaff,
  staffList,
  vendorsList,
  isLoadingVendors,
}) => {
  return (
    <>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Recipient Department
        </label>
        <Controller
          name="recipient_department"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                options={departments}
                {...field}
                size="large"
                className="w-full"
                placeholder="Select departmend"
              />

              {!!error?.message && (
                <span className="text-red-400 font-outfit text-sm px-1">
                  {error?.message}
                </span>
              )}
            </>
          )}
        />
      </div>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Received note number
        </label>
        <Controller
          name="received_note_no"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              aria-label="sum_amount"
              variant="bordered"
              placeholder="Received note number"
              className="rounded-sm"
              classNames={{
                inputWrapper: "border shadow-none rounded-lg",
              }}
              {...field}
              errorMessage={error?.message}
              isInvalid={!!error?.message}
            />
          )}
        />
      </div>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Received note Date
        </label>
        <Controller
          name="received_note_date"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <DatePicker
                className="w-full"
                size="large"
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date, dateString) => field.onChange(dateString)}
              />

              {!!error?.message && (
                <span className="text-red-400 font-outfit text-sm px-1">
                  {error?.message}
                </span>
              )}
            </>
          )}
        />
      </div>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Received by
        </label>
        <Controller
          name="received_by"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                options={staffList}
                loading={isLoadingStaff}
                labelInValue
                {...field}
                size="large"
                className="w-full"
                placeholder="Select staff"
              />

              {!!error?.message && (
                <span className="text-red-400 font-outfit text-sm px-1">
                  {error?.message}
                </span>
              )}
            </>
          )}
        />
      </div>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Date Issued
        </label>
        <Controller
          name="date_issued"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <DatePicker
                className="w-full"
                size="large"
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date, dateString) => field.onChange(dateString)}
              />

              {!!error?.message && (
                <span className="text-red-400 font-outfit text-sm px-1">
                  {error?.message}
                </span>
              )}
            </>
          )}
        />
      </div>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Date Supplied
        </label>
        <Controller
          name="date_supplied"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <DatePicker
                className="w-full"
                size="large"
                {...field}
                value={field.value ? dayjs(field.value) : null}
                onChange={(date, dateString) => field.onChange(dateString)}
              />

              {!!error?.message && (
                <span className="text-red-400 font-outfit text-sm px-1">
                  {error?.message}
                </span>
              )}
            </>
          )}
        />
      </div>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Select Vendor
        </label>
        <Controller
          name="vendor"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <Select
                options={vendorsList}
                loading={isLoadingVendors}
                labelInValue
                {...field}
                size="large"
                className="w-full"
                placeholder="Select vendor"
              />

              {!!error?.message && (
                <span className="text-red-400 font-outfit text-sm px-1">
                  {error?.message}
                </span>
              )}
            </>
          )}
        />
      </div>
    </>
  );
};
