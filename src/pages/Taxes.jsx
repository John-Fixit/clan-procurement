import { IoMdAdd } from "react-icons/io";
import Button from "../components/shared/ui/Button";
import ActionIcons from "../components/shared/ActionIcons";
import { Checkbox, Modal, ModalContent, Switch } from "@heroui/react";
import { useMemo, useState } from "react";
import { BiX } from "react-icons/bi";
import { Input, Result } from "antd";
import { catchErrFunc } from "../utils/catchErrFunc";
import { successToast } from "../utils/toastPopUps";
import { useAddTax, useDeleteTax, useGetTax } from "../service/api/setting";
import { Modal as AntModal } from "antd";
import clsx from "clsx";
import StarLoader from "../components/core/loaders/StarLoader";

const Taxe = () => {
  const [showForm, setShowForm] = useState({ state: false, type: "" });

  const { data: get_tax, isPending: isLoading, isError } = useGetTax();

  const taxes = useMemo(
    () =>
      get_tax?.map((tax) => ({
        id: tax.ID,
        name: tax.TAX_NAME,
        rate: Number(tax.PERCENTAGE),
        ...tax,
      })) || [],
    [get_tax]
  );
  const handleAddRecord = (type, data) => {
    setShowForm({ state: true, type: type, data: data });
  };
  const handleCloseRecordModal = (type) => {
    setShowForm({ state: false, type: type });
  };

  const [modal, contextHolder] = AntModal.useModal();

  const config = {
    title: "Confirm!",
    content: (
      <>
        <p className="fot-primary">Are you sure to delete this Tax?</p>
      </>
    ),
  };

  const { mutateAsync: mutateDeleteTax } = useDeleteTax();

  const confirmDelete = async (taxId) => {
    const json = {
      taxId,
    };
    try {
      const res = await mutateDeleteTax(json);
      successToast(res?.data?.message);
    } catch (err) {
      catchErrFunc(err);
    }
  };

  const handleDelete = (tax) => {
    modal.confirm({ ...config, onOk: () => confirmDelete(tax.id) });
  };

  return (
    <>
      {contextHolder}
      <main className="flex-1 p-6 lg:p-10">
        <div className="mx-auto">
          <div className="flex flex-wrap justify-between gap-3 mb-8">
            <div className="flex min-w-72 flex-col">
              <p className="text-gray-900 dark:text-white text-3xl font-semibold leading-tight tracking-wide font-primary">
                Procurement Configuration
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                Manage system-wide tax and document settings.
              </p>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-white">
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-gray-900 dark:text-white text-lg font-semibold leading-tight tracking-[-0.015em]">
                  Manage Tax
                </h2>
                <div>
                  <Button
                    color="primary"
                    radius="sm"
                    size="sm"
                    onPress={() => handleAddRecord("tax")}
                  >
                    <IoMdAdd size={20} />
                    Add New Tax
                  </Button>
                </div>
              </div>
              <div className="flex overflow-hiddex">
                <table className="flex-1">
                  <thead className="border-b bg-gray-100 border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-500w-2/5 text-sm font-medium leading-normal">
                        Tax Name
                      </th>
                      <th className="px-4 py-3 text-left text-gray-500 w-1/5 text-sm font-medium leading-normal">
                        Rate (%)
                      </th>

                      <th className="px-4 py-3 text-left text-gray-500 w-1/5 text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {taxes?.length === 0 ? (
                      <tr>
                        <td colSpan={6}>
                          <div className="flex items-center justify-center h-44">
                            <div className="w-full h-full flex flex-col items-center justify-center">
                              {isLoading ? (
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
                                    No Tax found
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      taxes?.map((tax, index) => (
                        <tr
                          key={index + "tax__" + tax?.ID}
                          className={clsx(
                            "border-b border-gray-200 dark:border-gray-800",
                            index % 2 && "bg-gray-50 dark:bg-gray-800"
                          )}
                        >
                          <td className="h-16 px-4 py-2 w-2/5 text-gray-900 dark:text-white text-sm font-normal leading-normal font-primary capitalize">
                            {tax?.TAX_NAME}
                          </td>
                          <td className="h-16 px-4 py-2 w-1/5 text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal font-primary">
                            {Number(tax?.PERCENTAGE)}
                          </td>
                          <td className="h-16 px-4 py-2 w-1/5 text-sm font-bold leading-normal tracking-[0.015em]">
                            <div className="flex items-center gap-4">
                              <ActionIcons
                                variant={"EDIT"}
                                action={() => handleAddRecord("tax", tax)}
                              />

                              <ActionIcons
                                variant={"DELETE"}
                                action={() => handleDelete(tax)}
                              />
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Modal
        hideCloseButton
        isOpen={showForm.state}
        onClose={handleCloseRecordModal}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        placement="auto"
      >
        <ModalContent>
          {(onClose) => (
            <>
              {showForm.type === "tax" && (
                <CreateTax onClose={onClose} data={showForm?.data} />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Taxe;

const CreateTax = ({ onClose, data }) => {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    rate: data?.rate || null,
  });

  const disableBtn = formData?.name === "";

  const { mutateAsync: mutateAddTax, isPending } = useAddTax();

  const handleSubmit = async () => {
    const { name, rate } = formData;
    const json = {
      tax_name: name,
      percentage: rate,
      taxId: data?.ID,
    };
    try {
      const res = await mutateAddTax(json);
      successToast(res?.data?.message);
      onClose();
    } catch (err) {
      catchErrFunc(err);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl  max-w-lg w-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {data ? "Update" : " Add New"} Tax
        </h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors cursor-pointer"
        >
          <BiX size={22} className="text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      <div className="p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tax Name *
          </label>
          <Input
            type="text"
            size="large"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Operating License"
            className="w-full px-4 py-2.5 bg-white "
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tax Rate
          </label>
          <Input
            type={"number"}
            size="large"
            value={formData.rate}
            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
            placeholder=""
            className="w-full px-4 py-2.5 bg-white"
          />
        </div>

        <div className="flex gap-6 pt-4 justify-between">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors cursor-pointer font-primary"
          >
            Cancel
          </button>

          <Button
            radius="sm"
            color="primary"
            className="w-full font-outfit"
            size="md"
            onPress={handleSubmit}
            isDisabled={disableBtn}
            isLoading={isPending}
          >
            {data ? "Update" : "Add"} Tax
          </Button>
        </div>
      </div>
    </div>
  );
};
