import { IoMdAdd } from "react-icons/io";
import Button from "../components/shared/ui/Button";
import ActionIcons from "../components/shared/ActionIcons";
import { Modal, ModalContent } from "@heroui/react";
import { useMemo, useState } from "react";
import { BiX } from "react-icons/bi";
import { Input, Result } from "antd";
import { catchErrFunc } from "../utils/catchErrFunc";
import { successToast } from "../utils/toastPopUps";
import {
  useAddStatus,
  useDeleteStatus,
  useGetStatus,
} from "../service/api/setting";
import { Modal as AntModal } from "antd";
import clsx from "clsx";
import StarLoader from "../components/core/loaders/StarLoader";
import useCurrentUser from "../hooks/useCurrentUser";

const Statuses = () => {
  const [showForm, setShowForm] = useState({ state: false, type: "" });

  const { data: get_status, isPending: isLoading, isError } = useGetStatus();

  const statuses = useMemo(
    () =>
      get_status?.map((status) => ({
        id: status.STATUS_ID,
        ...status,
      })) || [],
    [get_status]
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

  const { mutateAsync: mutateDeleteStatus } = useDeleteStatus();

  const confirmDelete = async (statusId) => {
    const json = {
      statusId,
    };
    try {
      const res = await mutateDeleteStatus(json);
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
                Procurement Status
              </p>
            </div>
          </div>
          <div className="">
            <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-white">
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-gray-900 dark:text-white text-lg font-semibold leading-tight tracking-[-0.015em]">
                  All Status
                </h2>
                <div>
                  <Button
                    color="primary"
                    radius="sm"
                    size="sm"
                    onPress={() => handleAddRecord("status")}
                  >
                    <IoMdAdd size={20} />
                    Add Status
                  </Button>
                </div>
              </div>
              <div className="flex overflow-hiddex">
                <table className="flex-1">
                  <thead className="border-b bg-gray-100 border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-500w-2/5 text-sm font-medium leading-normal">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left text-gray-500 w-1/5 text-sm font-medium leading-normal">
                        Created by
                      </th>
                      <th className="px-4 py-3 text-left text-gray-500 w-1/5 text-sm font-medium leading-normal">
                        Date Created
                      </th>

                      <th className="px-4 py-3 text-left text-gray-500 w-1/5 text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {statuses?.length === 0 ? (
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
                                    No Status found
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      statuses?.map((status, index) => (
                        <tr
                          key={index + "status__" + status?.ID}
                          className={clsx(
                            "border-b border-gray-200 dark:border-gray-800",
                            index % 2 && "bg-gray-50 dark:bg-gray-800"
                          )}
                        >
                          <td className="h-16 px-4 py-2 w-2/5 text-gray-900 dark:text-white text-sm font-normal leading-normal font-primary capitalize">
                            {status?.NAME}
                          </td>
                          <td className="h-16 px-4 py-2 w-1/5 text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal font-primary">
                            {status?.CREATED_BY}
                          </td>
                          <td className="h-16 px-4 py-2 w-1/5 text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal font-primary">
                            {/* {status?.DATE_CREATED
                              ? format(status?.DATE_CREATED, "dd MMMM, yyyy")
                              : null} */}
                            {status?.DATE_CREATED}
                          </td>
                          <td className="h-16 px-4 py-2 w-1/5 text-sm font-bold leading-normal tracking-[0.015em]">
                            <div className="flex items-center gap-4">
                              <ActionIcons
                                variant={"EDIT"}
                                action={() => handleAddRecord("status", status)}
                              />

                              <ActionIcons
                                variant={"DELETE"}
                                action={() => handleDelete(status)}
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
              {showForm.type === "status" && (
                <CreateStatus onClose={onClose} data={showForm?.data} />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Statuses;

const CreateStatus = ({ onClose, data }) => {
  const [formData, setFormData] = useState({
    name: data?.NAME || "",
  });
  const { userData } = useCurrentUser();
  const disableBtn = formData?.name === "";

  const { mutateAsync: mutateAddStatus, isPending } = useAddStatus();

  const handleSubmit = async () => {
    const { name } = formData;
    const json = {
      name: name,
      created_by: userData?.data?.FIRST_NAME + " " + userData?.data?.LAST_NAME,
      statusId: data?.id,
    };
    try {
      const res = await mutateAddStatus(json);
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
          {data ? "Update" : " Add New"} Status
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
            Status Name *
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
        <div className="flex gap-3">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status Color *
          </label>
          <input
            type="color"
            size="large"
            name="background"
            colorspace="display-p3"
            alpha
            value={formData.background || "oklab(50% 0.1 0.1 / 0.5)"}
            onChange={(e) =>
              setFormData({ ...formData, background: e.target.value })
            }
            className="rounded-full"
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
            {data ? "Update" : "Add"} Status
          </Button>
        </div>
      </div>
    </div>
  );
};
