import { IoMdAdd } from "react-icons/io";
import Button from "../components/shared/ui/Button";
import ActionIcons from "../components/shared/ActionIcons";
import { Checkbox, Modal, ModalContent } from "@heroui/react";
import { useMemo, useState } from "react";
import { BiX } from "react-icons/bi";
import { catchErrFunc } from "../utils/catchErrFunc";
import {
  useAddDocument,
  useDeleteDocument,
  useGetDocument,
} from "../service/api/setting";
import { successToast } from "../utils/toastPopUps";
import { format } from "date-fns";
import { Modal as AntModal } from "antd";

const DocumentSetting = () => {
  const [showForm, setShowForm] = useState({ state: false, type: "" });

  const handleAddRecord = (type, data) => {
    setShowForm({ state: true, type: type, data: data });
  };
  const handleCloseRecordModal = (type) => {
    setShowForm({ state: false, type: type });
  };
  return (
    <>
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
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-4">
            <DocumentManager handleAddRecord={handleAddRecord} />
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
              {showForm.type === "document" && (
                <CreateDocument onClose={onClose} data={showForm?.data} />
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default DocumentSetting;

const CreateDocument = ({ onClose, data }) => {
  const [formData, setFormData] = useState({
    name: data?.name || "",
    description: "",
    required: false,
    renewable: data?.renewable || false,
  });

  const disableBtn = formData?.name === "";

  const { mutateAsync: mutateAddDoc, isPending } = useAddDocument();

  const handleSubmit = async () => {
    const { name, renewable } = formData;

    const json = {
      document_name: name,
      is_yearly_renewable: renewable,
      date_created: format(new Date(), "yyyy-MM-dd"),
      created_by: "admin",
      docId: data?.ID,
    };
    try {
      console.log(json);
      const res = await mutateAddDoc(json);
      successToast(res?.data?.message);
      onClose();
    } catch (err) {
      catchErrFunc(err);
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl  max-w-lg w-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white font-primary">
          {data ? "Update" : " Add New"} Document
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 font-primary">
            Document Name *
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="e.g., Operating License"
            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="space-y-2">
          {/* <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors border border-gray-300">
            <Checkbox
              size="lg"
              radius="full"
              isSelected={formData.required}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  required: e.target.checked,
                })
              }
            />
            <div>
              <span className="text-sm font-medium text-gray-900 dark:text-white ">
                Required Document
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This document must be submitted
              </p>
            </div>
          </label> */}

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors border border-gray-300">
            <Checkbox
              radius="full"
              size="lg"
              isSelected={formData.renewable}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  renewable: e.target.checked,
                })
              }
            />
            <div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Renewable Document?
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This document needs periodic renewal
              </p>
            </div>
          </label>
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
            {data ? "Update" : "Add"} Document
          </Button>
        </div>
      </div>
    </div>
  );
};

const DocumentManager = ({ handleAddRecord }) => {
  const { data: get_documents } = useGetDocument();

  const documents = useMemo(
    () =>
      get_documents?.map((doc) => ({
        id: doc.ID,
        name: doc.DOCUMNET_NAME,
        description: "",
        required: false,
        renewable: doc.IS_YEARLY_RENEWABLE,
        ...doc,
      })) || [],
    [get_documents]
  );

  const [modal, contextHolder] = AntModal.useModal();

  const config = {
    title: "Confirm!",
    content: (
      <>
        <p className="fot-primary">Are you sure to delete this Tax?</p>
      </>
    ),
  };

  const { mutateAsync: mutateDeleteTax } = useDeleteDocument();

  const confirmDelete = async (docId) => {
    const json = {
      docId,
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
    <div className="bg-gray-50 dark:bg-gray-900">
      {contextHolder}
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center flex-wra gap-4 justify-between">
              <div>
                <h2 className="text-gray-900 dark:text-white text-lg font-semibold leading-tight tracking-[-0.015em]">
                  Document Management
                </h2>
              </div>
              <div>
                <Button
                  color="primary"
                  radius="sm"
                  size="sm"
                  onClick={() => handleAddRecord("document")}
                >
                  <IoMdAdd size={20} />
                  Add Document
                </Button>
              </div>
            </div>
          </div>

          {/* Documents Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3.5 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Renewable
                  </th>
                  <th className="px-6 py-3.5 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {documents?.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="text-gray-700 dark:text-white font-primary text-[14px]">
                            {doc.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center text-gray-600 dark:text-white font-primary text-[14px]">
                        {doc?.renewable ? "Yes" : "No"}
                      </div>
                    </td>
                    <td className="">
                      <div className="flex items-center  justify-center">
                        <ActionIcons
                          variant={"EDIT"}
                          action={() => handleAddRecord("document", doc)}
                        />

                        <ActionIcons
                          variant={"DELETE"}
                          action={() => handleDelete(doc)}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
