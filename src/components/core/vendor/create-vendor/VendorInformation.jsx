import { Controller } from "react-hook-form";
import { IoChevronForward } from "react-icons/io5";
import Button from "../../../shared/ui/Button";
import { Input, Select, Textarea } from "@heroui/react";

const VenderInformation = (props) => {
  const { control, handleNext } = props;

  return (
    <>
      <main>
        <h2 className="font-outfit  text-2xl font-semibold text-primary">
          Vendor Information
        </h2>
        <p className="font-outfit text-gray-500 text-sm">
          Fill in the details below to add a new vendor to the system
        </p>
        <div>
          <div className="mt-6 grid grid-cols-2 gap-y-4 gap-x-6">
            {/* <div>
              <label htmlFor="" className="font-outfit">
                Vendor Name
              </label>
              <Controller
                name="name"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      variant="bordered"
                      placeholder="Enter vendor name"
                      className="rounded-sm"
                      classNames={{
                        inputWrapper: "border shadow-none rounded-lg",
                      }}
                      {...field}
                      errorMessage={error?.message}
                      isInvalid={!!error?.message}
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
              <label htmlFor="" className="font-outfit">
                Vendor Business
              </label>
              <Controller
                name="business"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      variant="bordered"
                      placeholder="Enter vendor business"
                      className="rounded-sm"
                      classNames={{
                        inputWrapper: "border shadow-none rounded-lg",
                      }}
                      {...field}
                      errorMessage={error?.message}
                      isInvalid={!!error?.message}
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
              <label htmlFor="" className="font-outfit">
                Vendor Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      variant="bordered"
                      placeholder="Enter vendor email"
                      className="rounded-sm"
                      classNames={{
                        inputWrapper: "border shadow-none rounded-lg",
                      }}
                      {...field}
                      errorMessage={error?.message}
                      isInvalid={!!error?.message}
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
              <label htmlFor="" className="font-outfit">
                Vendor Phone
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input
                      variant="bordered"
                      placeholder="Enter vendor phone"
                      className="rounded-sm"
                      classNames={{
                        inputWrapper: "border shadow-none rounded-lg",
                      }}
                      {...field}
                      errorMessage={error?.message}
                      isInvalid={!!error?.message}
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
              <label htmlFor="" className="font-outfit">
                Vendor Address
              </label>
              <Controller
                name="address"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <>
                    <Input.Textarea
                      variant="bordered"
                      placeholder="Enter vendor phone"
                      className="rounded-sm"
                      classNames={{
                        inputWrapper: "border shadow-none rounded-lg",
                      }}
                      {...field}
                      errorMessage={error?.message}
                      isInvalid={!!error?.message}
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
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Name is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    radius="sm"
                    label="Vendor Name"
                    {...field}
                    errorMessage={error?.message}
                    isInvalid={!!error?.message}
                    variant="bordered"
                    classNames={{
                      inputWrapper: "shadow-none border",
                    }}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="business"
              rules={{
                required: "Vendor Business name is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    radius="sm"
                    label="Vendor's Business Name"
                    {...field}
                    errorMessage={error?.message}
                    isInvalid={!!error?.message}
                    variant="bordered"
                    classNames={{
                      inputWrapper: "shadow-none border",
                    }}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="email"
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    type="email"
                    label="Vendor Email"
                    {...field}
                    errorMessage={error?.message}
                    isInvalid={!!error?.message}
                    variant="bordered"
                    classNames={{
                      inputWrapper: "shadow-none border",
                    }}
                  />
                </>
              )}
            />
            <Controller
              control={control}
              name="phone"
              rules={{
                required: "Phone is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Input
                    label="Vendor Contact"
                    {...field}
                    errorMessage={error?.message}
                    isInvalid={!!error?.message}
                    variant="bordered"
                    classNames={{
                      inputWrapper: "shadow-none border",
                    }}
                  />
                </>
              )}
            />

            <Controller
              control={control}
              name="address"
              rules={{
                required: "Address is required",
              }}
              render={({ field, fieldState: { error } }) => (
                <>
                  <Textarea
                    label="Address"
                    {...field}
                    errorMessage={error?.message}
                    isInvalid={!!error?.message}
                    variant="bordered"
                    classNames={{
                      inputWrapper: "shadow-none border",
                    }}
                    minRows={1}
                  />
                </>
              )}
            />
          </div>
          <div className="flex justify-between flex-row-reverse gap-2 items-center border-gray-200 py-4 mt-6">
            <Button
              color="primary"
              className="mt-6 font-outfit"
              radius="sm"
              onPress={handleNext}
            >
              Next <IoChevronForward />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};
export default VenderInformation;
