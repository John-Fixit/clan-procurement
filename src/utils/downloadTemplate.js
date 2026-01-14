export const downloadTemplate = ({ componentRef, jobOrderRef, order_type }) => {
  if (!componentRef?.current && !jobOrderRef?.current) return;

  const element =
    order_type?.value == "2" ? componentRef.current : jobOrderRef.current;

  // Fallback approach: open a print-friendly window and let the user "Save as PDF"
  const printWindow = window.open("", "_blank", "width=900,height=1100");
  if (!printWindow) return;

  // Clone document head to preserve styles (tailwind/build css links)
  const headContent = document.head.innerHTML;

  printWindow.document.write(`<!doctype html>
      <html>
        <head>${headContent}
        <style>
        /*Ensure print styles here if needed*/
        @media print {
        body {
          margin: 0;
        }
          /* Force each section to start on a new page */
      .print\\:break-before-page {
        page-break-before: always;
        break-before: page;
      }
      
      /* Prevent page breaks inside each section */
      .print\\:break-after-page {
        page-break-after: always;
        break-after: page;
      }
      
      /* Optional: avoid breaking the first page */
      .print\\:break-before-page:first-child {
        page-break-before: auto;
        break-before: auto;
      }
    }
        </style>
        </head>
        <body>${element.outerHTML}</body>
      </html>`);

  printWindow.document.close();

  printWindow.addEventListener("load", () => {
    printWindow.focus();

    // Wait a tick so resources load, then trigger print dialog
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  });

  // Fallback timeout in case load event doesn't fire
  setTimeout(() => {
    if (!printWindow.closed) {
      printWindow.print();
      printWindow.close();
    }
  }, 3000);
};
