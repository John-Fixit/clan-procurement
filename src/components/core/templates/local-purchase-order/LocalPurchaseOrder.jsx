import clsx from "clsx";
import ncaaLogo from "../../../../assets/images/ncaa_logo.png";
import { format } from "date-fns";
import { formatNumberWithComma } from "../../../../utils/formatCurrencyNumber";
import { useRef } from "react";
import LocalPurchaseTandC from "./LocalPurchaseTandC";
import { numberToWord } from "../../../../utils/number-to-word";

const LocalPurchaseOrder = ({ details, componentRef, bgColor }) => {
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
        bgColor={bgColor}
        printable={true}
      />
    </>
  );
};
const TemplateComponent = ({ details, componentRef, printable, bgColor }) => {
  const defaultRef = useRef(null);
  const ref = componentRef || defaultRef;

  const purchaseOrder = details?.data || {};
  const items = details.procurement_items?.length
    ? [...details.procurement_items]
    : [];

  const grand_total = items?.reduce((acc, curr) => {
    return acc + Number(curr?.unit_price) * Number(curr?.quantity);
  }, 0);

  const chunkSize = printable ? 20 : items?.length;

  const dividedItems = [];
  for (let i = 0; i < items.length; i += chunkSize) {
    dividedItems.push(items.slice(i, i + chunkSize));
  }

  return (
    <main className={clsx(printable ? "hidden" : "")}>
      <main ref={ref}>
        {dividedItems?.map((dvdItems, dvdIdx, arr) => {
          return (
            <>
              <div
                key={dvdIdx}
                className="relative bg-white min-w-220 w-full h-full overflow-hidden font-serif! font-normal! text-black! print:break-before-page print:break-after-page"
              >
                <div>
                  <img
                    src={ncaaLogo}
                    alt="NCAA Logo"
                    className="absolute inset-0 m-auto w-[600px] h-[600px] object-contain opacity-15 z-0 pointer-events-none"
                  />

                  <div className="relative mb-4">
                    <div className="flex justify-center gap-x-6 w-full ml-6">
                      <div className="absolute top-0 left-4">
                        <img
                          src={ncaaLogo}
                          alt="NCAA Logo"
                          width={110}
                          height={110}
                        />
                      </div>
                      <div className="flex flex-col items-center justify-center mb-1 mt-4">
                        <h2
                          className="text-[31px] tracking-wide font-semibold font-serif text-[#281867] leading-8"
                          style={{
                            transform: "scaleY(1.3)",
                            transformOrigin: "center",
                          }}
                        >
                          NIGERIA CIVIL AVIATION AUTHORITY
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
                      <h5 className="font-medium text-sm text-center border-black/40 font-serif text-black">
                        P.M.B 21029, 21038, IKEJA, LAGOS.
                      </h5>
                    </div> */}
                  </div>
                  <div className={clsx("absolute top-0 -right-2")}>
                    {details?.qrCode && (
                      <img
                        src={details?.qrCode}
                        alt=""
                        className="object-contain w-28 h-28"
                      />
                    )}
                  </div>

                  <div className="mt3 border-b-2 pb1 border-black pt-2">
                    <div className="flex justify-between items-start">
                      <h2 className="text-xl font-semibold">
                        LOCAL PURCHASE ORDER
                      </h2>
                      <div className="flex items-baseline gap-x-2">
                        <h3 className="text-xl font-semibold">N</h3>
                        <div className="border-b1.5 border-black min-w-32 px-2 text-lg">
                          {purchaseOrder?.ORDER_NO}
                        </div>
                      </div>
                      <div className="flex items-baseline gap-x-2">
                        <p className="text-xs italic">
                          Quote this number on all invoices,
                          <br />
                          correspondence and packages.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt2 border-black pt-2">
                    <div className="flex items-baseline gap-x-2 mb-1">
                      <h3 className="text-[13px]">To</h3>
                      <div className="border-b-1.5 border-black flex-1">
                        {purchaseOrder?.DEPARTMENT_SUPPLIED}
                      </div>
                    </div>

                    <div className="grid grid-cols-[1fr_auto_1fr] gap-x-4 mb-4">
                      <div className="border-b-1.5 border-black"></div>
                      <div className="flex items-baseline gap-x-2">
                        <h3 className="text-[13px]">Date:</h3>
                        <div className="border-b-1.5 border-black w-48">
                          {format(
                            purchaseOrder?.DATE_AWARDED,
                            "do 'of' MMM. yyyy"
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-x-2 mb-2 border-t-2 pt-1">
                      <h3 className="text-xs">
                        Please supply/repair the following items
                      </h3>
                      <div className="flex-1 text-right text-xs">
                        The purchase is subject to the conditions on the
                        reverse.
                      </div>
                    </div>

                    <div className="flex items-baseline gap-x-2 mb-6">
                      <h3 className="text-[13px]">DELIVERY DATE:</h3>
                      <div className="border-b-1.5 border-black flex-1">
                        {format(
                          purchaseOrder?.DATE_SUPPLIED,
                          "do 'of' MMM. yyyy"
                        )}
                      </div>
                    </div>
                  </div>

                  {/* table */}
                  <div className="overflow-x-auto border-2 border-b-0 border-black">
                    <table className="min-w-full divide-y-2 divide-black bgwhite text-[13px] border-collapse text-left">
                      <thead className="ltr:text-left rtl:text-right">
                        <tr>
                          <th className="py-1 px-2 font-semibold text-gray-900 border-r-1.5 border-black text-center w-10">
                            ITEM NO.
                          </th>
                          <th className="py-1 px-2 font-semibold text-gray-900 border-r-1.5 border-black text-center">
                            DATE
                          </th>
                          <th className="py-1 px-2 font-semibold text-gray-900 border-r-1.5 border-black text-center">
                            QUANTITY
                          </th>
                          <th className="py-1 px-2 font-semibold text-gray-900 border-r-1.5 border-black text-center w-64">
                            DESCRIPTION
                          </th>
                          <th className="py-1 px-2 font-semibold text-gray-900 border-r-1.5 border-black text-center">
                            MODE
                            <br />
                            OF
                            <br />
                            CHARGE
                          </th>
                          <th
                            colSpan={2}
                            className="py-1 px-2 font-semibold text-gray-900 border-r-1.5 border-black text-center"
                          >
                            UNIT PRICE
                          </th>
                          <th
                            colSpan={2}
                            className="py-1 px-2 font-semibold text-gray-900 text-center"
                          >
                            Total Cost
                          </th>
                        </tr>
                        {/* Sub-header row for Naira and Kobo */}
                        <tr>
                          <th className="py-1 px-2 font-medium text-gray-900 border-r-1.5 border-black text-center"></th>
                          <th className="py-1 px-2 font-medium text-gray-900 border-r-1.5 border-black text-center"></th>
                          <th className="py-1 px-2 font-medium text-gray-900 border-r-1.5 border-black text-center"></th>
                          <th className="py-1 px-2 font-medium text-gray-900 border-r-1.5 border-black text-center"></th>
                          <th className="py-1 px-2 font-medium text-gray-900 border-r-1.5 border-black text-center"></th>
                          <th className="py-1 px-2 font-medium text-gray-900 border-1.5 border-black text-center">
                            ₦
                          </th>
                          <th className="py-1 px-2 font-medium text-gray-900 border-1.5 border-black text-center">
                            K
                          </th>
                          <th className="py-1 px-2 font-medium text-gray-900 border-1.5 border-black text-center">
                            ₦
                          </th>
                          <th className="py-1 px-2 font-medium text-gray-900 text-center border-t-1.5">
                            K
                          </th>
                        </tr>
                      </thead>

                      <tbody className="divide-y-2 divide-black">
                        {/* Empty rows for manual entry */}
                        {dvdItems?.map((item, index) => (
                          <tr key={index + crypto.randomUUID()}>
                            <td className="py-1 px-2 font-light text-gray-900 border-r-1.5 border-black text-center">
                              {/* {item?.product_name} */}
                              {index + 1}
                            </td>
                            <td className="py-1 px-2 font-light text-gray-900 border-r-1.5 border-black">
                              {item?.date}
                            </td>
                            <td className="py-1 px-2 font-light text-gray-900 border-r-1.5 border-black">
                              {item?.quantity}
                            </td>
                            <td className="py-1 px-2 font-light text-gray-900 border-r-1.5 border-black">
                              {item?.description}
                            </td>
                            <td className="py-1 px-2 font-light text-gray-900 border-r-1.5 border-black">
                              {item?.mode_of_charge}
                            </td>
                            <td className="py-1 px-2 font-light text-gray-900 border-r-1.5 border-black">
                              {formatNumberWithComma(Number(item?.unit_price))}
                            </td>
                            <td className="py-1 px-2 font-light text-gray-900 border-r-1.5 border-black">
                              00
                            </td>
                            <td className="py-1 px-2 font-light text-gray-900 border-r-1.5 border-black">
                              {formatNumberWithComma(
                                Number(item?.unit_price) *
                                  Number(item?.quantity)
                              )}
                            </td>
                            <td className="py-1 px-2 font-light text-gray-900 border-black">
                              00
                            </td>
                          </tr>
                        ))}
                        {[
                          ...Array(
                            20 - dvdItems?.length > 0
                              ? 20 - dvdItems?.length
                              : 0
                          ),
                        ].map((_, index) => (
                          <tr key={index}>
                            <td className="py-3 px-2 font-light text-gray-900 border-r-1.5 border-black text-center h-"></td>
                            <td className="py-3 px-2 font-light text-gray-900 border-r-1.5 border-black"></td>
                            <td className="py-3 px-2 font-light text-gray-900 border-r-1.5 border-black"></td>
                            <td className="py-3 px-2 font-light text-gray-900 border-r-1.5 border-black"></td>
                            <td className="py-3 px-2 font-light text-gray-900 border-r-1.5 border-black"></td>
                            <td className="py-3 px-2 font-light text-gray-900 border-r-1.5 border-black"></td>
                            <td className="py-3 px-2 font-light text-gray-900 border-r-1.5 border-black"></td>
                            <td className="py-3 px-2 font-light text-gray-900 border-r-1.5 border-black"></td>
                            <td className="py-3 px-2 font-light text-gray-900"></td>
                          </tr>
                        ))}
                        {/* Grand Total row */}
                        {arr?.length - 1 === dvdIdx ? (
                          <tr>
                            <td
                              colSpan={7}
                              className={clsx(
                                "pe-4 text-gray-700 border-r-2 border-b-4 border-double border-black text-end py-"
                              )}
                            >
                              <div className="flex gap-2 justify-between items-center ms-4">
                                <p className="text-base">
                                  {numberToWord(grand_total).naira} Naira only
                                </p>
                                <h2 className="text-lg font-medium">
                                  Grand Total ₦
                                </h2>
                              </div>
                            </td>
                            <td
                              className={clsx(
                                "py-1 px-2 text-gray-700 border-r-1.5 border-b-4 border-double border-black text-center"
                              )}
                            >
                              {formatNumberWithComma(grand_total)}
                            </td>
                            <td
                              className={clsx(
                                "py-1 px-2 text-gray-700 border-b-4 border-double border-black text-center"
                              )}
                            ></td>
                          </tr>
                        ) : null}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt- borde-1.5 border-black pt-4">
                  <div className="text-xs italic mb-4">
                    <p>
                      I certify delivery within 24 - 48 Hrs as per moment child
                      you provided or let new AA 3.1
                    </p>
                  </div>

                  <div className="flex justify-end mb-4">
                    <div className="text-center">
                      <div className="border-b-1.5 border-black w-64 mb-1"></div>
                      <p className="text-xs italic">Authorised Signature</p>
                    </div>
                  </div>

                  <div className="border--1.5 border-black pt4">
                    <div className="flex items-baseline gap-x-2 mb8 mt-2">
                      <h3 className="text-[13px]">Deliver to</h3>
                      <div className="border-b-1.5 border-black flex-1">
                        {purchaseOrder?.DEPARTMENT_SUPPLIED}
                      </div>
                    </div>

                    <div className="text-xs italic mb-4">
                      <p>
                        I certify that the above mentioned goods have been
                        received in good order and condition and taken on charge
                        under Stores
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-8 mb-6">
                      <div className="flex items-baseline gap-x-2">
                        <h3 className="text-[13px] whitespace-nowrap">
                          Received Note No
                        </h3>
                        <div className="border-b-1.5 border-black flex-1">
                          {purchaseOrder?.RECEIVED_NOTE_NO}
                        </div>
                      </div>
                      <div className="flex items-baseline gap-x-2">
                        <h3 className="text-[13px]">Date</h3>
                        <div className="border-b-1.5 border-black flex-1">
                          {format(
                            purchaseOrder?.RECEIVED_NOTE_DATE,
                            "do 'of' MMM. yyyy"
                          )}
                        </div>
                      </div>
                    </div>

                    {/* <div className="flex justify-end mb-">
                      <div className="text-center">
                        <div className="border-b-1.5 border-black w-64 mb-1"></div>
                        <p className="text-xs italic">Storekeeper / Receiver</p>
                      </div>
                    </div> */}

                    <div className="flex justify-between items-start mt-8">
                      <div className="flex items-baseline gap-x-2">
                        <h3 className="text-[13px]">Date</h3>
                        <div className="border-b-1.5 border-black flex1 min-w-56"></div>
                      </div>
                      <div className="text-center">
                        <div className="border-b-1.5 border-black w-64"></div>
                        <p className="text-xs italic">Storekeeper / Receiver</p>
                      </div>
                    </div>

                    <div
                      className={clsx(
                        printable ? "fixed w-full bottom-12" : "",
                        "text-xs mt-4 text-center"
                      )}
                    >
                      <p>
                        <span className="font-medium">Distribution:</span> 1
                        Customer &nbsp;&nbsp; Original to be attached to the
                        Invoice for Payment &nbsp;&nbsp; 2 Accounts &nbsp;&nbsp;
                        3 Stores &nbsp;&nbsp; 4 Purchasing Copy
                      </p>
                    </div>
                  </div>
                </div>

                {printable ? (
                  <div className={`fixed w-full bottom-0 h-4 ${bgColor}`}></div>
                ) : null}
              </div>
              {printable ? <LocalPurchaseTandC /> : null}
            </>
          );
        })}
      </main>
    </main>
  );
};

export default LocalPurchaseOrder;
