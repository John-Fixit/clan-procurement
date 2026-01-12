//TandC mean Terms and Conditions
const JobOrderTandC = () => {
  const t_c_text = [
    "The job shall be carried out as per your tender and / or as modified by <b>NCAA</b> team of engineers, headed by the supervising officer.",
    "All materials to be used in carrying out this job/repair shall be strictly as already specified or agreed upon and/or brand names or standards which are in common use in this trade or profession.",
    "The <b>NCAA</b> reserves the right to inspect the job while in progress.",
    "Where materials are issued to the contractor in respect of this job by <b>NCAA</b>, <b>NCAA</b> reserves the right to audit the usage.",
    "Payment in respect of this order shall be made to the contractor ONLY after the total completion or part of the job is certified by the <b>NCAA</b> supervising Officer.",
    "Any entry/identity card/or temporary permit issued to contractor's employees shall only entitle holders for the period covered for this job and must be surrendered on demand.",
    "Contractor shall ensure that the authority to carry out his work is not an approval to enter into the restricted areas of the offices/Airport other than the definite areas where the work is to be carried out.",
    "The <b>NCAA</b> will not be liable for any commitment on a job order which does not carry a valid signature.",
    "It is the contractor's responsibilities to execute this order and to inform <b>NCAA</b> promptly of any developments which may affect the required completion date.",
    "This order will be null and void if total completion is not achieved by the date stipulated on this order or as extended. Any extension of the completion date must be with the prior approval of the <b>NCAA</b> supervising Officer for this order.",
  ];
  return (
    <>
      <div className="p-8 bg-white min-w-220 relative w-full h-full overflow-hidden font-serif! font-normal! text-black! print:break-before-page print:break-after-page flex justify-center items-center flex-col min-h-[80vh]">
        <div className="p6">
          <h2 className="underline ring-offset-2 text-3xl font-bold text-center uppercase">
            Terms and Conditions of this order
          </h2>
          <div className="mt-3">
            <div className="space-y-4">
              {t_c_text?.map((text, index) => {
                return (
                  <div key={index} className="flex items-start gap-4">
                    <h4 className="text-lg">{index + 1}. </h4>
                    <p className="text-lg text-justify">
                      {text.split(/(<b>.*?<\/b>)/g).map((part, index) => {
                        if (part.startsWith("<b>") && part.endsWith("</b>")) {
                          return <b key={index}>{part.slice(3, -4)}</b>;
                        }
                        return part;
                      })}
                    </p>
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

export default JobOrderTandC;
