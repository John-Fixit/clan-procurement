import { IoMdAdd } from "react-icons/io";
import Button from "../components/shared/ui/Button";
import ActionIcons from "../components/shared/ActionIcons";
import { Modal, ModalContent, Switch } from "@heroui/react";
import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import { BiX } from "react-icons/bi";
import { Input } from "antd";

const Setting = () => {
  const [showForm, setShowForm] = useState({ state: false, type: "" });

  const handleAddRecord = (type) => {
    setShowForm({ state: true, type: type });
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
            <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-white">
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-gray-900 dark:text-white text-lg font-semibold leading-tight tracking-[-0.015em]">
                  Manage Tax
                </h2>
                <Button
                  color="primary"
                  radius="sm"
                  size="sm"
                  onPress={() => handleAddRecord("tax")}
                >
                  <IoMdAdd size={20} />
                  Add New Tax Type
                </Button>
              </div>
              <div className="flex overflow-hiddex">
                <table className="flex-1">
                  <thead className="border-b bg-gray-50 border-gray-200 dark:border-gray-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-gray-900 dark:text-white w-2/5 text-sm font-medium leading-normal">
                        Tax Name
                      </th>
                      <th className="px-4 py-3 text-left text-gray-900 dark:text-white w-1/5 text-sm font-medium leading-normal">
                        Rate (%)
                      </th>

                      <th className="px-4 py-3 text-left text-gray-500 dark:text-gray-400 w-1/5 text-sm font-medium leading-normal">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200 dark:border-gray-800">
                      <td className="h-16 px-4 py-2 w-2/5 text-gray-900 dark:text-white text-sm font-normal leading-normal font-primary">
                        Withholding Tax (WHT)
                      </td>
                      <td className="h-16 px-4 py-2 w-1/5 text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal font-primary">
                        5.0
                      </td>
                      <td className="h-16 px-4 py-2 w-1/5 text-sm font-bold leading-normal tracking-[0.015em]">
                        <div className="flex items-center gap-4">
                          <ActionIcons variant={"EDIT"} />

                          <ActionIcons variant={"DELETE"} />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <DocumentManager handleAddRecord={handleAddRecord} />
          </div>
        </div>
      </main>

      <Modal
        hideCloseButton
        isOpen={showForm.state}
        onClose={handleCloseRecordModal}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {showForm.type === "document" && (
                <CreateDocument onClose={onClose} />
              )}
              {showForm.type === "tax" && <CreateTax onClose={onClose} />}
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default Setting;

const CreateTax = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    rate: 0,
  });

  const handleSubmit = () => {
    console.log(formData);
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl  max-w-lg w-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Add New Tax
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
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, rate: e.target.value })}
            placeholder=""
            className="w-full px-4 py-2.5 bg-white"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary text-white rounded-lg font-medium transition-colors"
          >
            Add Tax
          </button>
        </div>
      </div>
    </div>
  );
};
const CreateDocument = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    required: false,
    renewable: false,
  });

  const handleSubmit = () => {
    console.log(formData);
  };
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl  max-w-lg w-full">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          Add New Document
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

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <Input.TextArea
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
            autoSize={{ minRows: 2, maxRows: 6 }}
            placeholder="Brief description of the document"
            rows={3}
            className="w-full px-4 py-2.5 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors border border-gray-300">
            <input
              type="checkbox"
              checked={formData.required}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  required: e.target.checked,
                })
              }
              className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 rounded-xl"
            />
            <div>
              <span className="text-sm font-medium text-gray-900 dark:text-white ">
                Required Document
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This document must be submitted
              </p>
            </div>
          </label>

          <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors border border-gray-300">
            <input
              type="checkbox"
              checked={formData.renewable}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  renewable: e.target.checked,
                })
              }
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Renewable Document
              </span>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                This document needs periodic renewal
              </p>
            </div>
          </label>
        </div>

        <div className="flex gap-3 pt-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg font-medium transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 px-4 py-2.5 bg-primary hover:bg-primary text-white rounded-lg font-medium transition-colors"
          >
            Add Document
          </button>
        </div>
      </div>
    </div>
  );
};

const DocumentManager = ({ handleAddRecord }) => {
  const [documents, setDocuments] = useState([
    {
      id: 1,
      name: "Certificate of Incorporation",
      description: "Company registration document",
      required: true,
      renewable: false,
    },
    {
      id: 2,
      name: "Tax Clearance Certificate",
      description: "Proof of tax compliance",
      required: true,
      renewable: true,
    },
    {
      id: 3,
      name: "Business Premises Permit",
      description: "Permit for operating location",
      required: false,
      renewable: true,
    },
  ]);

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  Document Management
                </h1>
              </div>

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

          {/* Documents Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-3.5 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Document
                  </th>
                  <th className="px-6 py-3.5 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Required
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
                {documents.map((doc) => (
                  <tr
                    key={doc.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {doc.name}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <Switch />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-center">
                        <Switch />
                      </div>
                    </td>
                    <td className="h-[64px] px-4 py-2 w-1/5 text-sm font-bold leading-normal tracking-[0.015em]">
                      <div className="flex items-center gap-2">
                        <ActionIcons variant={"EDIT"} />

                        <ActionIcons variant={"DELETE"} />
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
