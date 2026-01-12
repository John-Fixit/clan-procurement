//TandC mean Terms and Conditions
const LocalPurchaseTandC = () => {
  const t_c_text = [
    "The QUALITY of the whole of the goods supplied must comply in all respect with any pattern, sample or specification supplied by the Authority. In the event of no pattern, etc., being shown, the goods must be of the best in their respective kinds and of merchantable quality. If goods are ordered by description they must also correspond with the description.",
    "If GOODS are ordered under a trade name, the goods supplied must be of the kind usually known by that trade name.",
    "If GOODS are ordered as being required for a particular purpose they must be reasonably fit for that purpose, the Authority reserve the right to reject GOODS with defects which do not meet specification unless rectified at no extra cost to the authority.",
    "The seller shall warrant that he is able to pass a good title to all goods supplied.",
    "DELIVERY must be made within the stipulated time, or if no time is specified, within a reasonable time, otherwise the authority may cancel the order.",
    "ADVICE NOTES, quoting order number are to be sent to the place of destination of the goods at the time the goods are despatched.",
    "INVOICE fully priced and quoting the order number, and stating the place of delivery, MUST be sent to the address specified hereon on the same day as the goods are despatched.",
    "The order will be null and void if delivery is not completed by the date shown on the order or as extended. Any extensions to the delivery date must be with the prior approval of the N.C.A.A., purchasing Dept.",
    "The total cost of L.P.O. Must not exceed the amount shown without prior and proper written authorisation from N.C.A.A.",
    "N.C.A.A. will not be liable for any debts incurred on an L.P.O. which does not carry a valid signature.",
  ];
  return (
    <>
      <div className="p-8 bg-white min-w-220 relative w-full h-full overflow-hidden font-serif! font-normal! text-black! print:break-before-page print:break-after-page flex justify-center items-center flex-col min-h-screen">
        <div className="border-2 p-6">
          <h2 className="underline ring-offset-2 text-3xl font-bold text-center uppercase">
            Terms and Conditions
          </h2>
          <div className="mt-3">
            <div className="space-y-4">
              {t_c_text?.map((text, index) => {
                return (
                  <div key={index} className="flex items-start gap-4">
                    <h4 className="text-lg">{index + 1}. </h4>
                    <p className="text-lg text-justify">{text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LocalPurchaseTandC;
