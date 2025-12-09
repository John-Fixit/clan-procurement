import { useRef } from "react";

import ncaaLogo from "../../../../assets/images/ncaa_logo.png";
import { formatNumberWithComma } from "../../../../utils/formatCurrencyNumber";

const JoborderTemplate = ({
  componentRef,
  details,
  //   preview = true,
}) => {
  const defaultRef = useRef(null);
  const ref = componentRef || defaultRef;

  const jobOrderData = details?.data || {};

  return (
    <main ref={ref}>
      <div className="p-8 bg-white min-w-220 relative">
        {/* Header Section */}
        <div className="flex justify-center gap-x-6 w-full">
          <div>
            <img src={ncaaLogo} alt="NCAA Logo" width={110} height={110} />
          </div>
          <div className="flex flex-col items-center justify-center gap-y-0.5 mb-1 mt-4">
            <h2 className="text-2xl tracking-wide font-semibold ">
              NIGERIAN CIVIL AVIATION AUTHORITY
            </h2>
            <h3 className="font-medium text-xl tracking-wider">
              (AVIATION HOUSE)
            </h3>
            <h4 className="text-lg font-medium">HEADQUARTERS</h4>
            <h5 className="font-medium text-xs text-center border-black">
              P.M.B 21029, 21038, IKEJA, LAGOS.
            </h5>
            <div className="border-2 py-1 px-5 min-w-56 mt-1 bg-gray-200 text-lg uppercase">
              JOB ORDER {`: ${jobOrderData?.ORDER_NO}`}
            </div>
          </div>
        </div>

        {/* Form Fields */}
        <div className="space-y-1 text-sm mb-6 mt-6">
          <div className="grid grid-cols-2 gap-x-12">
            <div className="space-y-2">
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1">
                <h3 className="italic font-extralight text-[0.9rem]">Name</h3>
                <div className="border-b-1.5 border-black w-full px-1">
                  {jobOrderData?.VENDOR_NAME}
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1">
                <h3 className="italic font-extralight text-[0.9rem]">
                  Address
                </h3>
                <div className="border-b-1.5 border-black w-full px-1 line-clamp-1">
                  {jobOrderData?.VENDOR_ADDRESS}
                </div>
              </div>
              <div className="mt-6 items-baseline gap-x-1">
                <div className="border-b-1.5 border-black w-full px-1"></div>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1">
                <h3 className="italic font-extralight text-[0.9rem]">
                  Office Stamp:
                </h3>
                <div className=" px-1"></div>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1">
                <h3 className="italic font-extralight text-[0.9rem]">
                  Signature of Approving Officer:
                </h3>
                <div className="border-b-2 border-dotted min-w-4 px-1"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1">
                <h3 className="italic font-extralight text-[0.9rem]">
                  Date Issued
                </h3>
                <div className="border-b-1.5 border-black w-full px-1">
                  {jobOrderData?.DATE_AWARDED}
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1">
                <h3 className="italic font-extralight text-[0.9rem]">
                  Location of work
                </h3>
                <div className="border-b-1.5 border-black w-full px-1">
                  {jobOrderData?.LOCATION_OF_WORK}
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1">
                <h3 className="italic font-extralight text-[0.9rem]">
                  Department
                </h3>
                <div className="border-b-1.5 border-black w-full px-1">
                  {jobOrderData?.DEPARTMENT_SUPPLIED}
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1">
                <h3 className="italic font-extralight text-[0.9rem]">
                  Completion Date
                </h3>
                <div className="border-b-1.5 border-black w-full px-1">
                  {jobOrderData?.RECEIVED_DATE}
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1">
                <h3 className="italic font-extralight text-[0.9rem]">
                  File Reference
                </h3>
                <div className="border-b-1.5 border-black w-full px-1">
                  {jobOrderData?.FILE_REFERENCE}
                </div>
              </div>
              <div className="grid grid-cols-[auto_1fr] items-baseline gap-x-1">
                <h3 className="italic font-extralight text-[0.9rem]">
                  Tender Reference
                </h3>
                <div className="border-b-1.5 border-black w-full px-1">
                  {jobOrderData?.TENDER_REFERENCE}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-3 text-sm mb-6">
          <div className="flex">
            <span className="mr-2">I</span>
            <div className="flex-1 border-b-2 border-dotted border-black">
              {jobOrderData?.VENDOR_NAME}
            </div>
            <span className="ml-2">(Name)</span>
          </div>

          <div className="flex">
            <span className="mr-2">of</span>
            <div className="flex-1 border-b-2 border-dotted border-black">
              {jobOrderData?.VENDOR_ADDRESS}
            </div>
            <span className="ml-2">(Address)</span>
          </div>

          <div>
            <span>
              hereby agreed to execute/perform the works specified below as per
              conditions overleaf.
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
            while (lines.length < 7) {
              lines.push("");
            }

            return lines.slice(0, 7).map((line, index) => (
              <div
                key={index}
                className="border-b-2 border-dotted border-black min-h-6 py-1 text-gray-600"
              >
                {line || "\u00A0"}
              </div>
            ));
          })()}
        </div>

        {/* Payment Section */}
        <div className="mb-6">
          <div className="flex items-end">
            <span className="text-sm mr-2">For which the NCAA</span>
            <div className="flex-1 border-b-2 border-dotted border-black h-6">
              {jobOrderData?.DEPARTMENT_SUPPLIED}
            </div>
            <span className="text-sm ml-2">Agreed to pay the sum of</span>
          </div>
          <div className="flex items-center mt-1">
            <div className="flex-1"></div>
            <span className="text-sm mr-2">(Department/Unit)</span>
          </div>
          <div className="flex items-center justify-end mt-2 space-x-4">
            <span className="text-sm">N</span>
            <div className="border-b-2 border-dotted border-black w-32 h-6">
              {formatNumberWithComma(jobOrderData?.JOB_AMOUNT)}
            </div>
            <span className="text-sm">K</span>
            <div className="border-b-2 border-dotted border-black w-24 h-6"></div>
          </div>
        </div>

        {/* Signature Section */}
        <div className="border-t-2 border-black pt-4 mb-6">
          <div className="flex justify-between">
            <div className="text-center">
              <div className="border-b-2 border-dotted border-black w-64 h-12 mb-1"></div>
              <span className="text-xs">(Witness Signature)</span>
            </div>
            <div className="text-center">
              <div className="border-b-2 border-dotted border-black w-64 h-12 mb-1"></div>
              <span className="text-xs">(Signature of Contractor)</span>
            </div>
          </div>
        </div>

        {/* Certification Section */}
        <div className="border-t-2 border-black pt-4 mb-6">
          <p className="text-sm mb-4">
            I certify the contract has been satisfactory completed, inspected,
            tested and found to be in accordance with specifications above.
            Based on this report, the validity of this order/bill is hereby
            attested to and approved for payment.
          </p>
          <div className="flex justify-between items-end">
            <div className="text-center">
              <div className="border-b-2 border-dotted border-black w-48 h-12 mb-1"></div>
              <span className="text-xs">(Name in Block Letters)</span>
              <div className="text-xs">(Certifying Officer)</div>
            </div>
            <div className="text-center">
              <div className="border-b-2 border-dotted border-black w-48 h-12 mb-1"></div>
              <span className="text-xs">(Signature)</span>
            </div>
            <div className="text-center">
              <div className="border-b-2 border-dotted border-black w-48 h-12 mb-1"></div>
              <span className="text-xs">(Designation & Date)</span>
            </div>
          </div>
        </div>

        {/* Budget/Vote Section */}
        <div className="border-t-2 border-black pt-4">
          <h3 className="font-bold text-base mb-3">BUDGET/VOTE SECTION:</h3>
          <p className="text-sm mb-4">
            I certify that funds are available under
          </p>
          <div className="flex justify-between mb-6">
            <div>
              <span className="text-sm">Head</span>
              <div className="border-b-2 border-dotted border-black w-64 h-6 mt-2"></div>
            </div>
            <div>
              <span className="text-sm">Subhead</span>
              <div className="border-b-2 border-dotted border-black w-64 h-6 mt-2"></div>
            </div>
          </div>
          <div className="flex justify-between items-end">
            <div className="text-center">
              <div className="border-b-2 border-dotted border-black w-48 h-12 mb-1"></div>
              <span className="text-xs">(Signature)</span>
              <div className="text-xs">(Certifying Officer)</div>
            </div>
            <div className="text-center">
              <div className="border-b-2 border-dotted border-black w-48 h-12 mb-1"></div>
              <span className="text-xs">(Name in Block Letters)</span>
            </div>
            <div className="text-center">
              <div className="border-b-2 border-dotted border-black w-48 h-12 mb-1"></div>
              <span className="text-xs">(Designation & Date)</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t-2 border-black mt-6 pt-3">
          <p className="text-xs text-center">
            Distribution: 1 & 2 Copy (Client) 3rd Copy Finance, 4th Copy
            Purchasing
            <span className="float-right">
              Original Copy must accompany Invoice for Settlement.
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default JoborderTemplate;
