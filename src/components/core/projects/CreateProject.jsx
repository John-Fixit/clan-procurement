import { useState } from "react";
import { useForm } from "react-hook-form";
import ProjectInformation from "./projectInformation";
import ProjectSupportDocument from "./ProjectSupportDocument";
import ReusableTabDrawerLayout from "../../shared/reusable-tab-drawer-layout";
import ProjectApproval from "./ProjectApproval";
import PurchaseOrderItems from "./purchaseOrderItems";
import { catchErrFunc } from "../../../utils/catchErrFunc";
import { useCreateProject } from "../../../service/api/project";
import { errorToast, successToast } from "../../../utils/toastPopUps";
import useDrawerStore from "../../../hooks/useDrawerStore";

const newItemRow = {
  date: "",
  quantity: 0,
  description: "",
  vote_or_charge: "",
  unit_price: 0,
  total_cost: 0,
};

const requiredFields = {
  project_type: "project type is required",
  approvers: "Approvals can not be empty",
};

const validateRequiredField = (values) => {
  const newErrors = {};
  Object.keys(requiredFields).forEach((field) => {
    if (Array.isArray(values?.[field])) {
      // For array fields like job_description and section_two
      if (values?.[field].length === 0) {
        newErrors[field] = requiredFields[field];
      }
    } else {
      // For string fields like report_officer and counter_officer
      if (!values?.[field]) {
        newErrors[field] = requiredFields[field];
      }
    }
  });
  return newErrors;
};

const CreateProject = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const { closeDrawer } = useDrawerStore();

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

  const {
    watch,
    getValues,
    formState: { errors: hookErrors },
    trigger,
  } = hook_form_props;

  const project_type = watch("project_type");

  const { mutateAsync: mutateAddProject, isPending: isSubmitting } =
    useCreateProject();

  const handleSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      const fieldErrors = Object.keys(hookErrors)?.map(
        (fld) => `${fld?.replaceAll("_", " ")} is required`
      );

      const combinedMessage = fieldErrors?.join("\n");
      errorToast(combinedMessage);
      return;
    }
    const values = getValues();
    const json = {
      order_type: values?.project_type,
      order_no: values?.order_number,
      vendor_id: values?.value,
      date_supplied: values?.date_supplied,
      department_supplied: values?.recipient_department,
      date_awarded: values?.date_issued,
      received_by: values?.received_by?.value,
      received_date: values?.completion_date,
      received_note_no: values?.received_note_no,
      received_note_date: values?.received_note_date,
      location_of_work: values?.work_location,
      file_reference: values?.file_reference,
      tender_reference: values?.tender_reference,
      vendor_statement: values?.voucher_statement,
    };

    const errors = validateRequiredField(values);

    if (Object.keys(errors).length) {
      const combinedMessage = Object.values(errors).join("\n");
      errorToast(combinedMessage);
      return;
    }
    try {
      // validate required fields before proceeding

      const res = await mutateAddProject(json);
      successToast(res?.data?.message);
      closeDrawer();
    } catch (err) {
      catchErrFunc(err);
    }
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
          isSubmitting={isSubmitting}
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
