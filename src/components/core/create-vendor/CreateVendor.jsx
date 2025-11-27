import { useState } from "react";
import ReusableTabDrawerLayout from "../../shared/reusable-tab-drawer-layout";
import { useForm } from "react-hook-form";
import VendorSupportDocument from "./VendorSupportDocument";
import VenderInformation from "./VendorInformation";
// import useDrawerStore from "../../../hooks/useDrawerStore";

const support_documents = [
  {
    id: 1,
    name: "CAC Certificate",
    description: "Certificate of Incorporation",
    requiresRenewal: true,
    uploaded: false,
    file: null,
    startDate: "",
    endDate: "",
    status: "pending",
  },
  {
    id: 2,
    name: "Tax Clearance Certificate",
    description: "Valid tax clearance from relevant authority",
    requiresRenewal: true,
    uploaded: false,
    file: null,
    startDate: "",
    endDate: "",
    status: "pending",
  },
  {
    id: 3,
    name: "Business License",
    description: "Valid business operating license",
    requiresRenewal: false,
    uploaded: false,
    file: null,
    status: "pending",
  },
];

const CreateVendor = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  //   const { updateDrawerData } = useDrawerStore();

  const handleNext = () => {
    setSelectedTab(selectedTab + 1);
  };
  const handlePrev = () => {
    setSelectedTab(selectedTab - 1);
  };

  const hook_form_props = useForm({
    defaultValues: {
      support_documents,
    },
  });

  const sideTabs = [
    {
      title: "Project Information",
      content: (
        <VenderInformation {...hook_form_props} handleNext={handleNext} />
      ),
    },
    {
      title: "Support document",
      content: (
        <VendorSupportDocument
          {...hook_form_props}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      ),
    },
  ];
  return (
    <>
      <ReusableTabDrawerLayout
        sideTabs={sideTabs}
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
    </>
  );
};

export default CreateVendor;
