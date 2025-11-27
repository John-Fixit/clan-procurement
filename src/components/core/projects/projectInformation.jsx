import { Input, Select, SelectItem, Textarea } from "@heroui/react";
import { Controller } from "react-hook-form";
import { Select as AntSelect, DatePicker } from "antd";
import dayjs from "dayjs";

const ProjectInformation = (props) => {
  const { control, watch } = props;
  const project_type = watch("project_type");

  return (
    <>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6">
          <div>
            <label htmlFor="" className="font-outfit">
              Project Type
            </label>
            <Controller
              name="project_type"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <>
                  <AntSelect
                    options={[
                      {
                        label: "Local Purchase Order",
                        value: "local-purchase-order",
                      },
                      { label: "Job Order", value: "job-order" },
                    ]}
                    {...field}
                    onChange={(value) => field.onChange(value)}
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
          {project_type === "job-order" ? (
            <JobOrderForm control={control} />
          ) : (
            project_type === "local-purchase-order" && (
              <PurchaseOrderForm control={control} />
            )
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectInformation;

const JobOrderForm = ({ control }) => {
  return (
    <>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Date Issued
        </label>
        <Controller
          name="project_title"
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
          Location of work
        </label>
        <Controller
          name="work_location"
          control={control}
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
          name="department"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <>
              <AntSelect
                options={[
                  { label: "Technical", value: "techinal" },
                  { label: "Soft skill", value: "soft skill" },
                  { label: "Other", value: "other" },
                ]}
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
          render={({ field, fieldState: { error } }) => (
            <>
              <AntSelect
                options={[
                  { label: "Technical", value: "techinal" },
                  { label: "Soft skill", value: "soft skill" },
                  { label: "Other", value: "other" },
                ]}
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
          Total Sum Amount
        </label>
        <Controller
          name="sum_amount"
          control={control}
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
    </>
  );
};
const PurchaseOrderForm = ({ control }) => {
  return (
    <>
      <div>
        <label htmlFor="" className="font-outfit mb-2">
          Project Title
        </label>
        <Controller
          name="project_title"
          control={control}
          render={({ field, fieldState: { error } }) => (
            <Input
              variant="bordered"
              placeholder="Enter your title"
              className="rounded-sm w-full"
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
    </>
  );
};
