import { useState } from "react";
import { useForm } from "react-hook-form";
import ProjectInformation from "./projectInformation";
import ProjectSupportDocument from "./ProjectSupportDocument";
import ReusableTabDrawerLayout from "../../shared/reusable-tab-drawer-layout";
import PurchaseOrderItems from "./purchaseOrderItems";
import { catchErrFunc } from "../../../utils/catchErrFunc";
import { useCreateProject } from "../../../service/api/project";
import { errorToast, successToast } from "../../../utils/toastPopUps";
import useDrawerStore from "../../../hooks/useDrawerStore";
import { uploadFileData } from "../../../utils/uploadFile";
import useCurrentUser from "../../../hooks/useCurrentUser";
import ProjectNote from "./ProjectNote";
import { findProjectType } from "../../../utils/findProjectType";

const newItemRow = {
  date: "",
  quantity: 1,
  description: "",
  vote_or_charge: "",
  unit_price: null,
  total_cost: 0,
  product_id: null,
};

const requiredFields = {
  project_type: "project type is required",
  // approvers: "Approvals can not be empty",
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

const productItemRequiredField = {
  product_id: "Product must be picked for each item",
  // tax: "All item must have tax",
  quantity: "All item must have quantity",
  unit_price: "All item must have unit price",
};

const validateProducts = (products) => {
  const newErrors = {};

  Object.keys(productItemRequiredField).forEach((field) => {
    if (!products?.[field]) {
      newErrors[field] = productItemRequiredField[field];
    }
  });

  return newErrors;
};

const CreateProject = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const {
    closeDrawer,
    data: { projectDetail, defaultProjectType },
  } = useDrawerStore();

  const projectDetailData = projectDetail?.data || {};

  const [isUploading, setIsUploading] = useState(false);

  const handleNext = () => {
    setSelectedTab(selectedTab + 1);
  };
  const handlePrev = () => {
    setSelectedTab(selectedTab - 1);
  };

  const hook_form_props = useForm({
    defaultValues: {
      project_type:
        projectDetailData?.ORDER_TYPE || defaultProjectType || "Job Order",
      projectNote: projectDetailData?.NOTE,
      completion_date: projectDetailData?.RECEIVED_DATE || "",
      date_issued: projectDetailData?.DATE_AWARDED,
      file_reference: projectDetailData?.FILE_REFERENCE,
      order_number: projectDetailData?.ORDER_NO,
      tender_reference: projectDetailData?.TENDER_REFERENCE,
      recipient_type: projectDetailData?.DEPARTMENT_TYPE || "department",
      recipient_department: projectDetailData?.DEPARTMENT_SUPPLIED,
      work_location: projectDetailData?.LOCATION_OF_WORK,
      vendor_statement: projectDetailData?.VENDOR_STATEMENT,
      date_supplied: projectDetailData?.DATE_SUPPLIED,
      sum_amount: Number(projectDetailData?.JOB_AMOUNT) || "",

      received_by: {
        value: projectDetailData?.RECEIVED_BY,
      },
      received_note_date: projectDetailData?.RECEIVED_NOTE_DATE,
      received_note_no: projectDetailData?.RECEIVED_NOTE_NO,

      vendor: {
        label: projectDetailData?.VENDOR_NAME,
        value: projectDetailData?.VENDOR_ID,
      },
      tax: {
        label:
          projectDetailData?.TAX_VALUE && Number(projectDetailData?.TAX_VALUE),
        value: projectDetailData?.TAX_ID,
      },
      approvers:
        projectDetailData?.approval_request?.map((appr) => ({
          ...appr,
          DESIGNATION: appr?.designation,
          STAFF_ID: appr?.staff_id,
          FIRST_NAME: appr?.staff?.split(" ")[0],
          LAST_NAME: appr?.staff?.split(" ")[1],
          value: appr?.staff_id,
        })) || [],
      purchase_order_items: projectDetail?.procurement_items?.map((item) => ({
        ...item,
        quantity: item?.quantity,
        unit_price: Number(item?.unit_price),
        tax: {
          value: item?.tax_id,
        },
        product_id: item?.product_id,
        description: item?.description,
        tax_id: item?.tax_id,
        vote_or_charge: item?.vote_or_charge,
      })) || [newItemRow],
      documents: [],
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
    useCreateProject(projectDetailData?.ID);

  const { userData } = useCurrentUser();

  const uploadPendingFiles = async (documents) => {
    const result = [];
    for (const doc of documents) {
      if (doc?.uploaded_url || !doc?.originFileObj) {
        result.push(doc);
        continue;
      } else {
        try {
          const uploadResult = await uploadFileData(
            doc?.originFileObj,
            userData?.token,
          );
          result.push({
            ...doc,
            uploaded_url: uploadResult?.file_url,
          });
        } catch (err) {
          catchErrFunc(err);
        }
      }
    }
    return result;
  };

  const handleSubmit = async () => {
    const isValid = await trigger();
    if (!isValid) {
      const fieldErrors = Object.keys(hookErrors)?.map(
        (fld) => `${fld?.replaceAll("_", " ")} is required`,
      );
      const combinedMessage = fieldErrors?.join("\n");
      errorToast(combinedMessage);
      return;
    }
    const values = getValues();

    const errors = validateRequiredField(values);

    if (Object.keys(errors).length) {
      const combinedMessage = Object.values(errors).join("\n");
      errorToast(combinedMessage);
      return;
    }
    try {
      setIsUploading(true);
      const uploadedDocuments = await uploadPendingFiles(
        values.documents || [],
      );

      const items = values?.purchase_order_items?.map((item) => {
        const errors = validateProducts(item);
        if (
          findProjectType(values?.project_type)?.value === "2" &&
          Object.keys(errors).length > 0
        ) {
          const combinedMessage = Object.values(errors).join("\n");
          errorToast(combinedMessage);

          return;
        }

        const tax_amount = 0;
        // (Number(item?.tax?.PERCENTAGE) / 100) *
        // Number(item?.unit_price) *
        // Number(item?.quantity);
        return {
          product_id: item?.product_id,
          tax_amount: tax_amount,
          tax_id: item?.tax?.value,
          unit_of_measurement: item?.unit_of_measurement,
          unit_price: item?.unit_price,
          tax: Number(item?.tax?.PERCENTAGE || 0),
          quantity: item?.quantity,
          description: item?.description, //"24-inch monitor, high resolution, black"
        };
      });

      if (findProjectType(values?.project_type)?.value === "2") {
        if (!items?.[0]) return;
        confirmCreateProject({ values, items, uploadedDocuments });
      } else {
        confirmCreateProject({ values, items, uploadedDocuments });
      }
    } catch (err) {
      catchErrFunc(err);
    } finally {
      setIsUploading(false);
    }
  };

  const confirmCreateProject = async ({ values, items, uploadedDocuments }) => {
    try {
      const totalItemAmount = items?.reduce((acc, item) => {
        return acc + Number(item?.unit_price) * Number(item?.quantity);
      }, 0);

      const jobOrderTaxAmount = 0;
      // (Number(values?.tax?.PERCENTAGE) / 100) * Number(values?.sum_amount);
      const localPurchaseTaxAmoun = items?.reduce((acc, item) => {
        return acc + Number(item?.tax_amount);
      }, 0);

      const localPurchaseTaxAmount =
        (Number(values?.tax?.PERCENTAGE) / 100) * totalItemAmount;

      const json = {
        order_type: findProjectType(values?.project_type)?.label,
        order_no: values?.order_number,
        vendor_id: values?.vendor?.value,
        date_supplied: values?.date_supplied,
        department_supplied: values?.recipient_department,
        department_type: values?.recipient_type,
        date_awarded: values?.date_issued,
        received_by: values?.received_by?.value,
        received_date: values?.completion_date,
        received_note_no: values?.received_note_no,
        received_note_date: values?.received_note_date,
        location_of_work: values?.work_location,
        file_reference: values?.file_reference,
        tender_reference: values?.tender_reference,
        vendor_statement: values?.vendor_statement,
        tax_id: values?.tax?.ID,
        tax_value: values?.tax?.PERCENTAGE,
        note: values?.projectNote,
        job_amount:
          findProjectType(values?.project_type)?.value === "2"
            ? totalItemAmount
            : values?.sum_amount,
        tax_amount:
          findProjectType(values?.project_type)?.value === "2"
            ? localPurchaseTaxAmount
            : jobOrderTaxAmount,
        creator_id: userData?.data?.STAFF_ID,
        creator_name:
          userData?.data?.FIRST_NAME + " " + userData?.data?.LAST_NAME,
        support_documents: uploadedDocuments
          ?.map((supdoc) => ({
            attachment_url: supdoc.uploaded_url,
          }))
          ?.filter(Boolean),
        approval_request: values?.approvers?.map((appr, index) => ({
          designation: appr?.DESIGNATION,
          staff_id: appr?.STAFF_ID,
          staff: appr?.FIRST_NAME + " " + appr?.LAST_NAME,
          sn: index + 1,
          is_approved: 0,
        })),
        procurement_items:
          findProjectType(values?.project_type)?.value === "2" ? items : null,
      };
      // validate required fields before proceeding

      const res = await mutateAddProject(json);
      successToast(res?.data?.message);
      closeDrawer();
    } catch (err) {
      catchErrFunc(err);
    }
  };

  const sideTabs = [
    {
      title: "Project Information",
      content: (
        <ProjectInformation {...hook_form_props} handleNext={handleNext} />
      ),
    },
    findProjectType(project_type).value === "2" && {
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
      title: "Add Note",
      content: (
        <ProjectNote
          {...hook_form_props}
          handleNext={handleNext}
          handlePrev={handlePrev}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting || isUploading}
        />
      ),
    },
    // {
    //   title: "Approval",
    //   content: (
    //     <ProjectApproval
    //       {...hook_form_props}
    //       handleNext={handleNext}
    //       handlePrev={handlePrev}
    //       handleSubmit={handleSubmit}
    //       isSubmitting={isSubmitting || isUploading}
    //     />
    //   ),
    // },
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
