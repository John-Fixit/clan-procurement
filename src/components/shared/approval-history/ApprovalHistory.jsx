import { IoCheckmarkCircleSharp } from "react-icons/io5";
import { MdPending } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { BsEnvelopePaper } from "react-icons/bs";
import { durationDiff } from "../../../utils/durationDiff";
import { Avatar, cn } from "@heroui/react";
import { format, formatDistanceToNow } from "date-fns";
import { preProfileLink } from "../../../utils/pre-profile-link";

const ApprovalHistory = ({ details }) => {
  // Get current approval SN from the main data
  const currentApprovalSN = details?.data?.CURRENT_APPROVAL_SN;

  return (
    <>
      <div className="shadow rounded p-4 bg-white">
        <h4 className="text-lg">Approval History</h4>
        <div className="my-4 w-full">
          {details?.approvers?.length > 0 ? (
            <ol className="ms-12 my-4 text-gray-500 border-s-2 border-gray-200 dark:text-gray-400">
              {details?.approvers?.map((appHis, i) => {
                // Determine status based on SN and current approval SN
                let REQUEST_STATUS;
                if (appHis.sn < currentApprovalSN) {
                  REQUEST_STATUS = "Approved"; // Previous approvers are considered approved
                } else if (appHis.sn === currentApprovalSN) {
                  REQUEST_STATUS = "Pending"; // Current approver is pending
                } else {
                  REQUEST_STATUS = "Awaiting"; // Future approvers are awaiting
                }

                return (
                  <li key={i} className="mb-10 ms-4 relative group">
                    <p className="font-medium text-xs uppercase">
                      {appHis?.designation}
                    </p>
                    <div className="border border-gray-300 p-2 rounded mt-1">
                      <Avatar
                        src={preProfileLink(appHis.staff)}
                        size="sm"
                        className="absolute -start-[62px] text-medium"
                      />
                      <span
                        className={cn(
                          "absolute w-3 h-3 border-2 border-white rounded-full -start-[23px] top-5",
                          REQUEST_STATUS !== "Awaiting"
                            ? "bg-btnColor"
                            : "bg-gray-200"
                        )}
                      ></span>
                      <div className="">
                        <div className="flex justify-between items-between">
                          <p className="uppercase text-gray-500 text-sm font-bold">
                            {appHis?.staff || "Unknown User"}
                          </p>
                          <div
                            className={cn(
                              "h-8 w-8 flex justify-center items-center rounded-full",
                              {
                                "bg-red-300": REQUEST_STATUS === "Declined",
                                "bg-green-300": REQUEST_STATUS === "Approved",
                                "bg-yellow-300": REQUEST_STATUS === "Pending",
                                "bg-gray-300": REQUEST_STATUS === "Awaiting",
                              }
                            )}
                          >
                            {REQUEST_STATUS === "Approved" ? (
                              <IoCheckmarkCircleSharp
                                size={20}
                                className="text-green-600"
                              />
                            ) : REQUEST_STATUS === "Declined" ? (
                              <ImCancelCircle
                                size={20}
                                className="text-red-600"
                              />
                            ) : REQUEST_STATUS === "Pending" ? (
                              <MdPending
                                size={20}
                                className="text-yellow-600"
                              />
                            ) : (
                              <MdPending size={20} className="text-gray-600" />
                            )}
                          </div>
                        </div>
                        <div className="text-xs flex flex-col gap-2">
                          {/* <span>{appHis?.designation}</span> */}
                          {REQUEST_STATUS !== "Awaiting" && (
                            <div className="flex justify-between gap-4 flex-wrap">
                              <div className="flex gap-1 flex-wrap">
                                <span>
                                  {format(
                                    new Date(appHis?.date_received),
                                    "MMMM do yyyy, H:mm:SS a"
                                  )}
                                </span>
                                {/* {appHis?.date_treated && (
                                  <>
                                    <span className="px-2">-</span>
                                    <span>
                                      {format(
                                        new Date(appHis?.date_treated),
                                        "MMMM do yyyy, H:mm:SS a"
                                      )}
                                    </span>
                                  </>
                                )} */}
                              </div>
                              <span>
                                {REQUEST_STATUS === "Approved" ||
                                REQUEST_STATUS === "Declined"
                                  ? durationDiff(
                                      appHis?.date_received,
                                      appHis?.date_treated
                                    )
                                  : formatDistanceToNow(
                                      new Date(appHis?.date_received),
                                      {
                                        addSuffix: true,
                                      }
                                    ).replace(/about |almost /g, "")}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>
          ) : (
            <div className="flex flex-col gap-2 items-center justify-center h-full pt-5">
              <BsEnvelopePaper className="text-gray-300" size={40} />
              <span className="text-default-400 font-bold text-lg">
                Empty Records
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ApprovalHistory;
