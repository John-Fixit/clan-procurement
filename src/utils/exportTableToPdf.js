import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// format helpers
const formatMoney = (value) =>
  Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
  }).format(Number(value || 0));

export const exportTableToPDF = ({
  title = "Report",
  headers = [],
  data = [],
  fileName = "report.pdf",
}) => {
  const doc = new jsPDF("l", "pt", "a4");

  // Title
  doc.setFontSize(16);
  doc.text(title, 40, 40);

  // Convert headers to columns for jsPDF-AutoTable
  const tableColumn = headers.map((h) => h.title);

  // Convert your data using header rules
  const tableRows = data.map((row) =>
    headers.map((h) => {
      const value = row[h.key];

      if (h.isMoney) return formatMoney(value);
      if (h.percentage) return `${value}%`;
      return value ?? "";
    })
  );

  // Generate the table
  autoTable(doc, {
    startY: 60,
    head: [tableColumn],
    body: tableRows,
    styles: {
      fontSize: 10,
      cellPadding: 5,
    },
    headStyles: {
      fillColor: [40, 40, 40],
      textColor: "#ffffff",
    },
  });

  // Download
  doc.save(fileName);
};
