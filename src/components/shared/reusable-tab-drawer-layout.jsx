import React from "react";
import Button from "./ui/Button";

const ReusableTabDrawerLayout = ({
  sideTabs,
  selectedTab,
  setSelectedTab,
  is_approval,
  handleApprove,
  handleReject,
}) => {
  return (
    <div className="flex md:flex-nowrap flex-col md:flex-row hfull gap-4">
      <div className="flex-1 min-w-0 py-3 md:p-5 overflow-y-auto order-2 md:order-1 relative">
        <div className="mb-6">
          {sideTabs?.map((tab, index) => (
            <div
              key={index}
              style={{
                display: selectedTab === index ? "block" : "none",
              }}
            >
              {tab?.content}
            </div>
          ))}
        </div>
      </div>
      <div className="shrink-0 w-40 flex flex-col gap-3 pt-10 pb-5 pl-4 border-l border-gray-300 order-1 md:order-2">
        {sideTabs?.map((tab, index) => (
          <div
            key={index}
            onClick={() => setSelectedTab(index)}
            className={`relative cursor-pointer text-base leading-[19.5px] transition-all font-outfit ${
              selectedTab === index
                ? "font-medium text-[rgba(39, 44, 51, 1)]"
                : "font-normal text-[rgba(39, 44, 51, 0.7)]"
            }`}
          >
            {tab?.title}
            <span
              className={`absolute -left-[22px] top-1 w-[0.7rem] h-[0.7rem] rounded-full border border-white transition-all duration-200 ${
                selectedTab === index ? "bg-blue-900" : "bg-gray-300"
              }`}
            />
          </div>
        ))}
      </div>
      {is_approval && (
        <div className="fixed w-full bg-white bottom-0 border-t border-gray-200 py-6 px-10">
          <div className="flex w-[50%] justify-between">
            <Button
              radius="sm"
              color="danger"
              //   variant="bordered"
              onPress={() => handleReject && handleReject()}
            >
              Reject
            </Button>
            <Button
              radius="sm"
              color="primary"
              onPress={() => handleApprove && handleApprove()}
            >
              Approve
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReusableTabDrawerLayout;
