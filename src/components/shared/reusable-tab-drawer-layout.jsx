import React from "react";

const ReusableTabDrawerLayout = ({ sideTabs, selectedTab, setSelectedTab }) => {
  return (
    <div className="flex md:flex-nowrap flex-col md:flex-row hfull gap-4">
      <div className="flex-1 min-w-0 py-3 md:p-5 overflow-y-auto order-2 md:order-1">
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
    </div>
  );
};

export default ReusableTabDrawerLayout;
