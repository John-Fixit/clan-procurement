import * as XLSX from "xlsx-js-style";
import * as FileSaver from "file-saver";

export const exportReportAsExcel = ({
  excelData,
  headers,
  headerKeys,
  title,
  subtitle1,
  subtitle2,
  fileName = "export_report",
  totalColumns = [], // Array of column indices to calculate totals for (e.g., [3, 4] for debit and credit)
  currencySymbol = "₦", // Default currency symbol
  columnWidths = [], // Custom column widths
  conditionalTotal = null, // NEW: Object for conditional totaling
  // Example: { filterKey: 'itemDescription', filterValues: ['STOCK CONSUMABLES', 'FIXED ASSETS NOT YET ALLOCATED'], columns: [2, 3, 4] }
}) => {
  console.log({ headers, headerKeys });
  if (!excelData || excelData.length === 0) {
    console.error("No data to export.");
    return;
  }

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  // Create the worksheet
  const ws = XLSX.utils.aoa_to_sheet([]);

  // Calculate totals for specified columns
  const totals = {};

  if (conditionalTotal) {
    // Use conditional totaling
    const { filterKey, filterValues, columns } = conditionalTotal;

    // Filter data based on condition
    const filteredData = excelData.filter((item) =>
      filterValues.includes(item[filterKey])
    );

    // Calculate totals only for filtered rows
    columns.forEach((colIndex) => {
      const colKey = headerKeys[colIndex];
      totals[colKey] = filteredData.reduce((sum, item) => {
        const value = item[colKey];
        const amount = value
          ? typeof value === "string"
            ? parseFloat(value.replace(/[^\d.-]/g, ""))
            : parseFloat(value)
          : 0;
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
    });
  } else if (totalColumns.length > 0) {
    // Use regular totaling (backward compatible)
    totalColumns.forEach((colIndex) => {
      const colKey = headerKeys[colIndex];
      totals[colKey] = excelData.reduce((sum, item) => {
        const value = item[colKey];
        const amount = value
          ? typeof value === "string"
            ? parseFloat(value.replace(/[^\d.-]/g, ""))
            : parseFloat(value)
          : 0;
        return sum + (isNaN(amount) ? 0 : amount);
      }, 0);
    });
  }

  // Determine which columns to show totals for
  const columnsWithTotals = conditionalTotal
    ? conditionalTotal.columns
    : totalColumns;

  // Headers array
  const headerText = [
    [title],
    [subtitle1],
    [subtitle2],
    [],
    headers, // Table Headers
  ];

  // Apply headers to worksheet
  for (let i = 0; i < headerText.length; i++) {
    const row = headerText[i];
    if (!row || row.length === 0) continue;

    for (let j = 0; j < row.length; j++) {
      const cellRef = XLSX.utils.encode_cell({ r: i, c: j });

      ws[cellRef] = { v: row[j] || "", t: "s" };

      // Style based on row type
      if (i <= 2 && row[j]) {
        // Title/subtitle styles
        ws[cellRef].s = {
          font: { name: "Arial", sz: 14, bold: true },
          alignment: {
            horizontal: "center",
            vertical: "center",
            wrapText: true,
          },
        };
      } else if (i === 4) {
        // Column header styles
        ws[cellRef].s = {
          font: { name: "Arial", sz: 12, bold: true },
          alignment: {
            horizontal: "center",
            vertical: "center",
            wrapText: true,
          },
          border: {
            top: { style: "thin" },
            bottom: { style: "thin" },
            left: { style: "thin" },
            right: { style: "thin" },
          },
        };
      }
    }
  }

  // Set merge regions for titles
  const fullColRange = headers.length - 1;
  ws["!merges"] = [
    { s: { r: 0, c: 0 }, e: { r: 0, c: fullColRange } },
    { s: { r: 1, c: 0 }, e: { r: 1, c: fullColRange } },
    { s: { r: 2, c: 0 }, e: { r: 2, c: fullColRange } },
  ];

  // Data rows
  const rows = excelData.map((item) => [
    // index + 1, // S/N column
    ...headerKeys.map((key) => item[key] || ""),
  ]);

  // Add data rows with styling
  for (let r = 0; r < rows.length; r++) {
    const rowData = rows[r];
    for (let c = 0; c < rowData.length; c++) {
      const cellRef = XLSX.utils.encode_cell({ r: r + 5, c: c });

      // Check if this is a numeric column
      const isMoneyColumn =
        columnsWithTotals?.length && columnsWithTotals?.includes(c) && c > 0;

      // Determine cell type
      let cellValue = rowData[c];
      let cellType = "s";

      if (isMoneyColumn && cellValue !== "") {
        const numValue =
          typeof cellValue === "string"
            ? parseFloat(cellValue.replace(/[^\d.-]/g, ""))
            : parseFloat(cellValue);

        if (!isNaN(numValue)) {
          cellValue = numValue;
          cellType = "n";
        }
      }

      ws[cellRef] = {
        v: cellValue,
        t: cellType,
      };

      // Apply cell styles
      ws[cellRef].s = {
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        },
        alignment: {
          horizontal: c === 0 ? "center" : cellType === "n" ? "right" : "left",
          wrapText: true,
        },
      };

      // Format currency cells
      if (cellType === "n" && isMoneyColumn) {
        ws[cellRef].z = `#,##0.00`;
      }
    }
  }

  // Add gap before total (2 empty rows)
  const gapSize = 2;
  const dataEndRow = rows.length + 5;

  for (let r = 0; r < gapSize; r++) {
    for (let c = 0; c < headers.length; c++) {
      const cellRef = XLSX.utils.encode_cell({ r: dataEndRow + r, c: c });

      ws[cellRef] = { v: "", t: "s" };

      ws[cellRef].s = {
        border: {
          top: { style: "thin" },
          bottom: { style: "thin" },
          left: { style: "thin" },
          right: { style: "thin" },
        },
      };
    }
  }

  // Add total row
  const totalRowIndex = dataEndRow + gapSize;
  const totalRow = Array(headers.length - 1).fill("");

  totalRow[0] = "TOTAL";

  // Add total values for each specified column
  columnsWithTotals.forEach((colIndex) => {
    const colKey = headerKeys[colIndex];
    totalRow[colIndex] = totals[colKey];
  });

  // Apply total row to worksheet
  for (let c = 0; c < totalRow.length; c++) {
    const cellRef = XLSX.utils.encode_cell({ r: totalRowIndex, c: c });

    const isTotalValue = columnsWithTotals.includes(c) && c > 0;
    const cellValue = totalRow[c];

    ws[cellRef] = {
      v: cellValue,
      t: isTotalValue && cellValue !== "" ? "n" : "s",
    };

    ws[cellRef].s = {
      border: {
        top: { style: "thin" },
        bottom: { style: "thin" },
        left: { style: "thin" },
        right: { style: "thin" },
      },
      font: { bold: c === 1 || isTotalValue },
    };

    if (c === 1) {
      ws[cellRef].s.alignment = { horizontal: "center" };
      ws[cellRef].s.font = { bold: true, sz: 12 };
    }

    if (isTotalValue && cellValue !== "") {
      ws[cellRef].s.alignment = { horizontal: "right" };
      ws[cellRef].s.font = { bold: true, sz: 12 };
      ws[cellRef].z = `${currencySymbol}#,##0.00`;
    }
  }

  // Set column widths
  ws["!cols"] = [{ wch: 20 }];

  const defaultWidths = {
    description: 40,
    standard: 30,
    money: 20,
    title: 50,
    balance: 40,
  };

  for (let i = 0; i < headerKeys.length; i++) {
    const header = headers[i + 1]?.toLowerCase() || "";
    let columnWidth;

    if (columnWidths && columnWidths[i] !== undefined) {
      columnWidth = columnWidths[i];
    } else if (header.includes("description")) {
      columnWidth = defaultWidths.description;
    } else if (header.includes("order type")) {
      columnWidth = defaultWidths.description;
    } else if (header.includes("balance")) {
      columnWidth = defaultWidths.balance;
    } else if (columnsWithTotals.includes(i)) {
      columnWidth = defaultWidths.money;
    } else {
      columnWidth = defaultWidths.standard;
    }

    ws["!cols"].push({ wch: columnWidth });
  }

  // Set row heights
  ws["!rows"] = [];
  for (let i = 0; i <= totalRowIndex; i++) {
    if (i <= 2) {
      ws["!rows"][i] = { hpt: 25 };
    } else {
      ws["!rows"][i] = { hpt: 20 };
    }
  }

  // Set range
  ws["!ref"] = XLSX.utils.encode_range(
    { r: 0, c: 0 },
    { r: totalRowIndex, c: headers.length - 1 }
  );

  // Create workbook and save file
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};
