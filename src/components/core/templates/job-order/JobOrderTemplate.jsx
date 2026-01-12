import { useRef } from "react";

import ncaaLogo from "../../../../assets/images/ncaa_logo.png";
import { formatNumberWithComma } from "../../../../utils/formatCurrencyNumber";
import JobOrderTandC from "./JobOrderTandC";
import clsx from "clsx";

const JoborderTemplate = ({ details, componentRef }) => {
  return (
    <>
      <TemplateComponent
        details={details}
        componentRef={componentRef}
        printable={false}
      />
      <TemplateComponent
        details={details}
        componentRef={componentRef}
        printable={true}
      />
    </>
  );
};

const TemplateComponent = ({ componentRef, details, printable }) => {
  const defaultRef = useRef(null);
  const ref = componentRef || defaultRef;

  const jobOrderData = details?.data || {};

  return (
    <main className={clsx(printable ? "hidden" : "")}>
      <main ref={ref}>
        <div className="bg-white min-w-220 relative w-full h-full overflow-hidden flex flex-col gap-4 font-serif! font-normal! text-black!">
          <div>
            <img
              src={ncaaLogo}
              alt="NCAA Logo"
              className="absolute inset-0 m-auto w-[600px] h-[600px] object-contain opacity-15 z-0 pointer-events-none"
            />
            {/* Header Section */}
            <div className="relative mb-6">
              <div className="flex justify-center gap-x-6 w-full ml-6">
                <div className="absolute top-0 left-4">
                  <img
                    src={ncaaLogo}
                    alt="NCAA Logo"
                    width={110}
                    height={110}
                  />
                </div>
                <div className="flex flex-col items-center justify-center gap-y-0.5 mb-1 mt-4">
                  <h2
                    className="text-[32px] tracking-wide font-semibold font-serif text-[#281867] leading-8"
                    style={{
                      transform: "scaleY(1.3)",
                      transformOrigin: "center",
                    }}
                  >
                    NIGERIAN CIVIL AVIATION AUTHORITY
                  </h2>
                  <div className="ml-auto text-end">
                    <p>
                      Corporate Headquarters: Nnamdi Azikiwe International
                      Airport, Domestic Wing, Abuja.
                    </p>
                    <p>Tel: +234 811 115 0990, +234 811 115 111</p>
                  </div>
                </div>
              </div>
              {/* <div className="flex flex-col justify-center items-center">
              <h3 className="font-medium text-3xl tracking-wider font-serif text-black">
                (AVIATION HOUSE)
              </h3>
              <h4 className="text-xl font-medium font-serif text-black">
                HEADQUARTERS
              </h4>
              <h5 className="font-medium text-sm text-center border-black font-serif text-black">
                P.M.B 21029, 21038, IKEJA, LAGOS.
              </h5>
              <div className="border-2 py-1 px-2 mt-1 bg-gray-200 text-[16px] uppercase font-serif text-black">
                JOB ORDER {`: No ${jobOrderData?.ORDER_NO}`}
              </div>
            </div> */}
            </div>

            {/* Form Fields */}
            <div className="space-y-1 text-[13px] my-2">
              <div className="grid grid-cols-2 gap-x-12">
                <div className="space-y-2">
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1">
                    <h3
                      className="text-[0.85rem] font-medium me-3"
                      style={{
                        transform: "scaleX(1.2)",
                        transformOrigin: "left",
                      }}
                    >
                      Name
                    </h3>
                    <div className="border-b-1.5 border-black w-full px-1 font-extralight text-black text-sm">
                      {jobOrderData?.VENDOR_NAME}
                    </div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1">
                    <h3
                      className="text-[0.85rem] font-medium me-3"
                      style={{
                        transform: "scaleX(1.2)",
                        transformOrigin: "left",
                      }}
                    >
                      Address
                    </h3>
                    <div className="border-b-1.5 border-black w-full px-1 font-extralight text-black text-sm line-clamp-1">
                      {jobOrderData?.VENDOR_ADDRESS}
                    </div>
                  </div>
                  <div className="mt-6 items-baseline gap-x-1">
                    <div className="border-b-1.5 border-black w-full px-1 font-light"></div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1 mt-5">
                    <h3
                      className=" font-medium text-[0.85rem] me-3"
                      style={{
                        transform: "scaleX(1.2)",
                        transformOrigin: "left",
                      }}
                    >
                      Office Stamp:
                    </h3>
                    <div className=" px-1"></div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-2">
                    <h3
                      className=" font-medium text-[0.85rem] me-8"
                      style={{
                        transform: "scaleX(1.2)",
                        transformOrigin: "left",
                      }}
                    >
                      Signature of Approving Officer:
                    </h3>
                    <div className="border-b-2 border-dotted min-w-4 px-1"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-2">
                    <h3
                      className="text-[0.85rem] text-start me-3"
                      style={{
                        transform: "scaleX(1.2)",
                        transformOrigin: "left",
                      }}
                    >
                      Date Issued
                    </h3>

                    <div className="border-b-1.5 border-black w-full px-1 font-extralight text-black text-sm">
                      {jobOrderData?.DATE_AWARDED}
                    </div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-2">
                    <div className="">
                      <h3
                        className="font-medium text-[0.85rem] capitalize me-3"
                        style={{
                          transform: "scaleX(1.2)",
                          transformOrigin: "left",
                        }}
                      >
                        Location of work
                      </h3>
                    </div>
                    <div className="border-b-1.5 border-black w-full px-1 font-light text-sm">
                      {jobOrderData?.LOCATION_OF_WORK}
                    </div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-2">
                    <h3
                      className=" font-medium text-[0.82rem] me-3"
                      style={{
                        transform: "scaleX(1.2)",
                        transformOrigin: "left",
                      }}
                    >
                      Department
                    </h3>
                    <div className="border-b-1.5 border-black w-full px-1 font-extralight text-black text-sm">
                      {jobOrderData?.DEPARTMENT_SUPPLIED}
                    </div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-2">
                    <h3
                      className=" font-medium text-[0.85rem] me-4"
                      style={{
                        transform: "scaleX(1.2)",
                        transformOrigin: "left",
                      }}
                    >
                      Completion Date
                    </h3>
                    <div className="border-b-1.5 border-black w-full px-1 font-extralight text-black text-sm ">
                      {jobOrderData?.RECEIVED_DATE}
                    </div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-2">
                    <h3
                      className=" font-medium text-[0.85rem] me-3"
                      style={{
                        transform: "scaleX(1.2)",
                        transformOrigin: "left",
                      }}
                    >
                      File Reference
                    </h3>
                    <div className="border-b-1.5 border-black w-full px-1 font-extralight text-black text-sm">
                      {jobOrderData?.FILE_REFERENCE}
                    </div>
                  </div>
                  <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-2">
                    <h3 className="font-medium text-[0.85rem] letter-space">
                      Tender Reference
                    </h3>
                    <div className="border-b-1.5 border-black w-full px-1 font-extralight text-black text-sm">
                      {jobOrderData?.TENDER_REFERENCE}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="space-y-2 text-[13px] mb-3">
              <div className="flex">
                <span className="mr-2">I</span>
                <div className="flex-1 border-b-2 border-dotted border-black text-black font-light">
                  {jobOrderData?.VENDOR_NAME}
                </div>
                <span className="ml-2 font-light text-black letter-space">
                  (Name)
                </span>
              </div>

              <div className="flex">
                <span className="mr-2 font-light">of</span>
                <div className="flex-1 border-b-2 border-dotted border-black font-light">
                  {jobOrderData?.VENDOR_ADDRESS}
                </div>
                <span className="ml-2 font-light text-black letter-space">
                  (Address)
                </span>
              </div>

              <div>
                <span className="font-light text-black letter-space">
                  hereby agreed to execute/perform the works specified below as
                  per conditions overleaf.
                </span>
              </div>
              {/* Auto-wrap vendor statement */}
              {(() => {
                const statement = jobOrderData?.VENDOR_STATEMENT || "";
                const words = statement.split(" ");
                const lines = [];
                let currentLine = "";

                // Simple word wrapping algorithm
                words.forEach((word) => {
                  if ((currentLine + word).length <= 130) {
                    // Adjust character limit as needed
                    currentLine += (currentLine ? " " : "") + word;
                  } else {
                    lines.push(currentLine);
                    currentLine = word;
                  }
                });

                if (currentLine) lines.push(currentLine);

                // Fill remaining lines
                while (lines.length < 6) {
                  lines.push("");
                }

                return lines?.map((line, index) => (
                  <div
                    key={index}
                    className="border-b-2 border-dotted border-black min-h3 py1 text-black font-light"
                  >
                    {line || "\u00A0"}
                  </div>
                ));
              })()}
            </div>

            {/* Payment Section */}
            <div className="mb-">
              <div className="flex items-en">
                <span className="text-[13px] mr-2 font-light text-black letter-space me-7!">
                  For which the NCAA
                </span>
                <div className="flex-1 text-center">
                  <div className="flex-1 border-b-2 border-dotted border-black min-h-6 font-light text-black text-start letter-space">
                    {jobOrderData?.DEPARTMENT_SUPPLIED}
                  </div>
                  <span className="text-xs font-light text-black letter-space">
                    (Department/Unit)
                  </span>
                </div>
                <span className="text-[13px] ml-2 font-light text-black letter-space">
                  Agreed to pay the sum of
                </span>
              </div>

              <div className="flex items-baseline gap-x-1 w-full">
                <div className="flex-1 border-b-2 border-dotted border-black px-1 w-full"></div>
                <div>
                  <div className="flex items-center justify-end mt-2 space-x-2">
                    <span className="text-[13px]">N</span>
                    <div className=" border-dotted border-black min-w-20 font-light text-black letter-space">
                      {formatNumberWithComma(jobOrderData?.JOB_AMOUNT)}
                    </div>
                    <span className="text-[13px]">K</span>
                    <div className=" border-dotted border-black"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className=" border-b-2 border-black/60 w-3/5 mx-auto h-2"></div>
            {/* Signature Section */}
            <div className="pt4 mb-3">
              <div className="flex justify-between">
                <div className="text-center">
                  <div className="border-b-2 border-dotted border-black w-64 h-8 mb-1"></div>
                  <span className="text-xs">(Witness Signature)</span>
                </div>
                <div className="text-center">
                  <div className="border-b-2 border-dotted border-black w-64 h-8 mb-1"></div>
                  <span className="text-xs">(Signature of Contractor)</span>
                </div>
              </div>
            </div>

            {/* Certification Section */}
            <div className="border-t-2 border-black pt-4 mb-">
              <p className="text-[13px] mb font-light text-black letter-space">
                I certify the contract has been satisfactory completed,
                inspected, tested and found to be in accordance with
                specifications above. Based on this report, the validity of this
                order/bill is hereby attested to and approved for payment.
              </p>
              <div className="flex justify-between items-start">
                <div className="text-center">
                  <div className="border-b-2 border-dotted border-black w-48 h-10 mb-1"></div>
                  <span className="text-xs text-black">
                    (Name in Block Letters)
                  </span>
                  <div className="text-xs text-black">(Certifying Officer)</div>
                </div>
                <div className="text-center">
                  <div className="border-b-2 border-dotted border-black w-48 h-10 mb-1"></div>
                  <span className="text-xs text-black">(Signature)</span>
                </div>
                <div className="text-center">
                  <div className="border-b-2 border-dotted border-black w-48 h-10 mb-1"></div>
                  <span className="text-xs text-black letter-space">
                    (Designation & Date)
                  </span>
                </div>
              </div>
            </div>

            {/* Budget/Vote Section */}
            <div className="border-t-2 border-black pt-4">
              <h3 className="font-bold text-base mb-3 underline letter-space">
                BUDGET/VOTE SECTION:
              </h3>
              <p className="text-[13px] mb4 text-black font-light letter-space">
                I certify that funds are available under
              </p>
              <div className="space-y-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-5">
                    <div>
                      <span className="text-[13px] letter-space">Head</span>
                    </div>
                    <div className="text-center">
                      <div className="border-b-2 border-dotted border-black w-48 h8"></div>
                      <span className="text-xs letter-space">(Signature)</span>
                      <div className="text-xs letter-space">
                        (Certifying Officer)
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <span className="text-[13px] letter-space">Subhead</span>
                    </div>
                    <div className="text-center">
                      <div className="border-b-2 border-dotted border-black w-48 h8 mb-1"></div>
                      <span className="text-xs letter-space">
                        (Name in Block Letters)
                      </span>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div>
                      <span className="text-[13px] opacity-0">
                        not vissible
                      </span>
                      {/* just for spacing */}
                    </div>
                    <div className="text-center">
                      <div className="border-b-2 border-dotted border-black w-48 h8 mb-1"></div>
                      <span className="text-xs letter-space">
                        (Designation & Date)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer */}
          <div className="border-t-2 border-black mt6 mt-3">
            <p className="text-xs text-center ">
              Distribution: 1 & 2 Copy (Client) 3rd Copy Finance, 4th Copy
              Purchasing
              <span className="float-right">
                Original Copy must accompany Invoice for Settlement.
              </span>
            </p>
          </div>
        </div>
        {printable ? <JobOrderTandC /> : null}
      </main>
    </main>
  );
};

export default JoborderTemplate;
