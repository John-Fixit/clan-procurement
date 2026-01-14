import { FaX } from "react-icons/fa6";
import { useGetStatus } from "../../../../service/api/setting";
import { BiCheck, BiUpload } from "react-icons/bi";
import { CgChevronRight } from "react-icons/cg";
import StarLoader from "../../loaders/StarLoader";
import Button from "../../../shared/ui/Button";
import { useMemo } from "react";

const ChangeStatus = (props) => {
  const { projectDetail, setValue, watch, handleNext } = props;
  const selectedStatus = watch("status");
  const { data: get_status, isPending: isLoading } = useGetStatus();
  const statuses = useMemo(() => {
    return (
      get_status?.filter(
        (status) => status.STATUS_ID !== projectDetail?.STATUS
      ) || []
    );
  }, [get_status, projectDetail?.STATUS]);

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 w-full overflow-y-auto">
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Change Order Status
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Select a new status and upload supporting documents
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Current Status */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-2">Current Status</p>
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg font-medium">
              <BiCheck size={18} />
              {projectDetail?.STATUS_NAME || "Draft"}
            </div>
          </div>

          {/* Status Selection */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Select New Status <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {isLoading ? (
                <div className="col-span-3 flex items-center justify-center">
                  <StarLoader />
                </div>
              ) : (
                statuses.map((status) => (
                  <button
                    key={status.STATUS_ID}
                    onClick={() => setValue("status", status)}
                    className={`cursor-pointer p-4 rounded-lg border text-left transition-all ${
                      selectedStatus?.STATUS_ID === status.STATUS_ID
                        ? "border-indigo-500 bg-indigo-50 shadow-md"
                        : "border-gray-200 hover:border-indigo-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div
                          className={` rounded-md textsm font-medium
                            capitalize`}
                        >
                          {status.NAME}
                        </div>
                      </div>
                      {selectedStatus?.STATUS_ID === status.STATUS_ID && (
                        <BiCheck
                          size={20}
                          className="text-indigo-600 shrink-0"
                        />
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-6 flex items-center justify-end gap-3">
          <Button
            onClick={handleNext}
            // disabled={!selectedStatus}
            radius="sm"
            className="font-primary font-medium"
            color="primary"
          >
            Continue <CgChevronRight />
          </Button>
        </div>
      </div>
    </>
  );
};

export default ChangeStatus;
