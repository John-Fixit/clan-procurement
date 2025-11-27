import { useState } from "react";
import { useForm } from "react-hook-form";
import ProjectInformation from "./projectInformation";
import ProjectSupportDocument from "./ProjectSupportDocument";
import ReusableTabDrawerLayout from "../../shared/reusable-tab-drawer-layout";
import ProjectApproval from "./ProjectApproval";
import PurchaseOrderItems from "./purchaseOrderItems";

const newItemRow = {
  date: "",
  quantity: 0,
  description: "",
  vote_or_charge: "",
  unit_price: 0,
  total_cost: 0,
};

const CreateProject = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const handleNext = () => {
    setSelectedTab(selectedTab + 1);
  };
  const handlePrev = () => {
    setSelectedTab(selectedTab - 1);
  };

  const hook_form_props = useForm({
    defaultValues: {
      project_type: "job-order",
      approvers: [],
      purchase_order_items: [newItemRow],
    },
  });

  const { watch, getValues } = hook_form_props;

  const project_type = watch("project_type");

  const handleSubmit = () => {
    const values = getValues();
    console.log(values);
  };

  const sideTabs = [
    {
      title: "Project Information",
      content: (
        <ProjectInformation {...hook_form_props} handleNext={handleNext} />
      ),
    },
    project_type === "local-purchase-order" && {
      title: "Items",
      content: (
        <PurchaseOrderItems
          {...hook_form_props}
          handleNext={handleNext}
          newItemRow={newItemRow}
        />
      ),
    },
    {
      title: "Support Documents",
      content: (
        <ProjectSupportDocument
          {...hook_form_props}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      ),
    },
    {
      title: "Approval",
      content: (
        <ProjectApproval
          {...hook_form_props}
          handleNext={handleNext}
          handlePrev={handlePrev}
          handleSubmit={handleSubmit}
        />
      ),
    },
  ].filter(Boolean);

  return (
    <>
      <ReusableTabDrawerLayout
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        sideTabs={sideTabs}
      />
    </>
  );
};

export default CreateProject;
