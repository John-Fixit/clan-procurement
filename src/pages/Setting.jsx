import { IoMdAdd } from "react-icons/io";
import Button from "../components/shared/ui/Button";
import ActionIcons from "../components/shared/ActionIcons";

const Setting = () => {
  return (
    <>
      <main className="flex-1 p-6 lg:p-10">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-wrap justify-between gap-3 mb-8">
            <div className="flex min-w-72 flex-col">
              <p className="text-gray-900 dark:text-white text-3xl font-semibold leading-tight tracking-wide">
                Procurement Configuration
              </p>
              <p className="text-gray-500 dark:text-gray-400 text-base font-normal leading-normal">
                Manage system-wide tax and document settings.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
            <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-gray-900 dark:text-white text-lg font-semibold leading-tight tracking-[-0.015em]">
                  Manage Tax Types
                </h2>
                <Button color="primary" radius="sm" size="sm">
                  <IoMdAdd size={20} />
                  Add New Tax Type
                </Button>
              </div>
              <div className="p-2">
                <div className="flex overflow-hidden">
                  <table className="flex-1">
                    <thead className="border-b border-gray-200 dark:border-gray-800">
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
                        <td className="h-[72px] px-4 py-2 w-2/5 text-gray-900 dark:text-white text-sm font-normal leading-normal">
                          Withholding Tax (WHT)
                        </td>
                        <td className="h-[72px] px-4 py-2 w-1/5 text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                          5.0
                        </td>
                        <td className="h-[72px] px-4 py-2 w-1/5 text-sm font-bold leading-normal tracking-[0.015em]">
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
            </div>
            <div className="flex flex-col rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-background-dark">
              <div className="p-5 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-gray-900 dark:text-white text-lg font-semibold leading-tight tracking-[-0.015em]">
                  Supplier Document Requirements
                </h2>
              </div>
              <div className="flex flex-col divide-y divide-gray-200 dark:divide-gray-800 p-2">
                <div className="flex flex-wrap items-center justify-between gap-4 p-4">
                  <div className="flex flex-col">
                    <p className="text-gray-900 dark:text-white font-medium">
                      Certificate of Incorporation
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Company registration document.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <label
                      className="flex items-center cursor-pointer"
                      for="toggle-cac"
                    >
                      <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Required
                      </span>
                      <div className="relative">
                        <input
                          checked=""
                          className="sr-only peer"
                          id="toggle-cac"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </div>
                    </label>
                    <div className="relative">
                      <select className="w-48 appearance-none rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-primary">
                        <option>Does not expire</option>
                        <option>1 Year Validity</option>
                        <option>2 Years Validity</option>
                        <option>5 Years Validity</option>
                      </select>
                      <span className="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 p-4">
                  <div className="flex flex-col">
                    <p className="text-gray-900 dark:text-white font-medium">
                      Tax Clearance Certificate
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Proof of tax compliance.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <label
                      className="flex items-center cursor-pointer"
                      for="toggle-tcc"
                    >
                      <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Required
                      </span>
                      <div className="relative">
                        <input
                          checked=""
                          className="sr-only peer"
                          id="toggle-tcc"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </div>
                    </label>
                    <div className="relative">
                      <select className="w-48 appearance-none rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-primary">
                        <option>1 Year Validity</option>
                        <option>2 Years Validity</option>
                        <option>5 Years Validity</option>
                        <option>Does not expire</option>
                      </select>
                      <span className="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 p-4">
                  <div className="flex flex-col">
                    <p className="text-gray-900 dark:text-white font-medium">
                      Business Premises Permit
                    </p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                      Permit for operating location.
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <label
                      className="flex items-center cursor-pointer"
                      for="toggle-bpp"
                    >
                      <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Required
                      </span>
                      <div className="relative">
                        <input
                          className="sr-only peer"
                          id="toggle-bpp"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                      </div>
                    </label>
                    <div className="relative">
                      <select
                        className="w-48 appearance-none rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white focus:border-primary focus:ring-primary disabled:opacity-50"
                        disabled=""
                      >
                        <option>1 Year Validity</option>
                        <option>2 Years Validity</option>
                        <option>5 Years Validity</option>
                        <option>Does not expire</option>
                      </select>
                      <span className="material-symbols-outlined absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 mt-auto border-t border-gray-200 dark:border-gray-800 flex justify-end">
                <button className="flex min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-6 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Setting;
