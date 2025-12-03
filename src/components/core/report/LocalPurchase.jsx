import { useState, useMemo } from "react";
import dayjs from "dayjs";
import LocalPurchaseReportTable from "./LocalPurchaseReportTable";

// Dummy data
const DUMMY_DATA = [
  {
    ID: 59,
    ORDER_TYPE: "Local Purchase Order",
    ORDER_NO: "92039232",
    IS_APPROVED: 1,
    VENDOR_ID: 19,
    DATE_SUPPLIED: "2025-12-24",
    DEPARTMENT_SUPPLIED: "AIR TRANSPORT REGULATION",
    DATE_AWARDED: "2025-12-22",
    RECEIVED_BY: "Abdullahi Nasir",
    RECEIVED_DATE: "1900-01-01",
    RECEIVED_NOTE_NO: "90434934",
    RECEIVED_NOTE_DATE: "2025-12-30",
    LOCATION_OF_WORK: null,
    FILE_REFERENCE: null,
    TENDER_REFERENCE: null,
    VENDOR_STATEMENT: null,
    MAX_SN: 2,
    CREATOR_NAME: "SYSTEM SUPPORTS",
    CREATOR_ID: 1,
    JOB_AMOUNT: "150000",
    TAX_ID: null,
    TAX_VALUE: null,
    VENDOR_NAME: "Mineral vendor",
    VENDOR_EMAIL: "john.doe@example.com",
    VENDOR_PHONE: "0913131688369",
    ADDRESS: "123 Test Street, Lagos",
    NOTE: null,
    items: [
      {
        id: 22,
        product_id: 1,
        product_name: "Office Supplies",
        tax_id: null,
        unit_price: "50000",
        tax: null,
        quantity: 2,
        description: "Premium office supplies bundle",
      },
      {
        id: 23,
        product_id: 2,
        product_name: "Computer Equipment",
        tax_id: null,
        unit_price: "25000",
        tax: null,
        quantity: 2,
        description: "Ergonomic keyboard and mouse",
      },
    ],
  },
  {
    ID: 60,
    ORDER_TYPE: "Job Order",
    ORDER_NO: "JO-2025-001",
    IS_APPROVED: 1,
    VENDOR_ID: 20,
    DATE_SUPPLIED: "2025-11-15",
    DEPARTMENT_SUPPLIED: "ENGINEERING SERVICES",
    DATE_AWARDED: "2025-11-10",
    RECEIVED_BY: "Mohammed Hassan",
    RECEIVED_DATE: "2025-11-16",
    RECEIVED_NOTE_NO: "RN-112025",
    RECEIVED_NOTE_DATE: "2025-11-16",
    LOCATION_OF_WORK: "Head Office Building",
    FILE_REFERENCE: "ENG/2025/045",
    TENDER_REFERENCE: null,
    VENDOR_STATEMENT: null,
    MAX_SN: 3,
    CREATOR_NAME: "ADMIN USER",
    CREATOR_ID: 2,
    JOB_AMOUNT: "350000",
    TAX_ID: null,
    TAX_VALUE: null,
    VENDOR_NAME: "BuildTech Solutions",
    VENDOR_EMAIL: "info@buildtech.com",
    VENDOR_PHONE: "08012345678",
    ADDRESS: "45 Construction Ave, Abuja",
    NOTE: null,
    items: [
      {
        id: 24,
        product_id: 3,
        product_name: "Construction Materials",
        tax_id: null,
        unit_price: "100000",
        tax: null,
        quantity: 2,
        description: "Cement and steel bars",
      },
      {
        id: 25,
        product_id: 4,
        product_name: "Labor Services",
        tax_id: null,
        unit_price: "150000",
        tax: null,
        quantity: 1,
        description: "Professional installation services",
      },
    ],
  },
  {
    ID: 61,
    ORDER_TYPE: "Local Purchase Order",
    ORDER_NO: "LPO-2025-045",
    IS_APPROVED: 1,
    VENDOR_ID: 21,
    DATE_SUPPLIED: "2025-10-20",
    DEPARTMENT_SUPPLIED: "IT DEPARTMENT",
    DATE_AWARDED: "2025-10-15",
    RECEIVED_BY: "Sarah Johnson",
    RECEIVED_DATE: "2025-10-21",
    RECEIVED_NOTE_NO: "RN-102025",
    RECEIVED_NOTE_DATE: "2025-10-21",
    LOCATION_OF_WORK: null,
    FILE_REFERENCE: null,
    TENDER_REFERENCE: null,
    VENDOR_STATEMENT: null,
    MAX_SN: 2,
    CREATOR_NAME: "IT ADMIN",
    CREATOR_ID: 3,
    JOB_AMOUNT: "480000",
    TAX_ID: null,
    TAX_VALUE: null,
    VENDOR_NAME: "TechGear Supplies",
    VENDOR_EMAIL: "sales@techgear.com",
    VENDOR_PHONE: "08098765432",
    ADDRESS: "78 Tech Plaza, Lagos",
    NOTE: null,
    items: [
      {
        id: 26,
        product_id: 5,
        product_name: "Laptops",
        tax_id: null,
        unit_price: "200000",
        tax: null,
        quantity: 2,
        description: "Dell Latitude 5420",
      },
      {
        id: 27,
        product_id: 6,
        product_name: "Monitors",
        tax_id: null,
        unit_price: "80000",
        tax: null,
        quantity: 1,
        description: "24-inch LED display",
      },
    ],
  },
];

export default function LocalPurchase({ dateRange, orderType, searchQuery }) {
  const [isLoading] = useState(false);
  const [isError] = useState(false);

  const filteredProjects = useMemo(() => {
    let filtered = [...DUMMY_DATA];

    // Filter by order type
    if (orderType !== "all") {
      filtered = filtered.filter((project) => project.ORDER_TYPE === orderType);
    }

    // Filter by date range
    if (dateRange && dateRange[0] && dateRange[1]) {
      const startDate = dayjs(dateRange[0]).startOf("day");
      const endDate = dayjs(dateRange[1]).endOf("day");

      filtered = filtered.filter((project) => {
        const awardedDate = dayjs(project.DATE_AWARDED);
        return awardedDate.isAfter(startDate) && awardedDate.isBefore(endDate);
      });
    }

    return filtered;
  }, [dateRange, orderType]);

  return (
    <>
      {/* Main Content */}
      <div className="">
        {/* Report Table */}
        <LocalPurchaseReportTable
          projects={filteredProjects}
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </>
  );
}
