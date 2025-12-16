import React, { useState } from "react";
import useDrawerStore from "../../../../hooks/useDrawerStore";
import ReusableTabDrawerLayout from "../../../shared/reusable-tab-drawer-layout";
import LocalPurchaseItemsView from "./LocalPurchaseItemsView";
import ChangeStatus from "./ChangeStatus";
import { useForm } from "react-hook-form";
import ProjectSupportDocument from "../ProjectSupportDocument";
import { errorToast, successToast } from "../../../../utils/toastPopUps";
import { uploadFileData } from "../../../../utils/uploadFile";
import { catchErrFunc } from "../../../../utils/catchErrFunc";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import { useUpdateProjectStatus } from "../../../../service/api/project";

const UpdateProcurementStatus = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const {
    data: { projectDetail },
    closeDrawer,
  } = useDrawerStore();

  const { mutateAsync: mutateUpdateProjectStatus, isPending: isLoading } =
    useUpdateProjectStatus(
      projectDetail?.ID || projectDetail?.PROCUREMENT_ID,
      projectDetail?.STATUS || 0
    );
  const [isUploading, setIsUploading] = useState(false);

  const form_methods = useForm();

  const { userData } = useCurrentUser();

  const uploadPendingFiles = async (documents, setValue) => {
    const result = [];
    for (const doc of documents) {
      if (doc?.uploaded_url || !doc?.originFileObj) {
        result.push(doc);
        continue;
      } else {
        try {
          const uploadResult = await uploadFileData(
            doc?.originFileObj,
            userData?.token
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
    setValue("documents", result);
    return result;
  };

  const handleSubmit = async () => {
    const { status, documents } = form_methods.getValues();
    if (!status) {
      errorToast("Please select a status to proceed.");
      return;
    }
    try {
      setIsUploading(true);
      const uploadedDocuments = await uploadPendingFiles(
        documents || [],
        form_methods.setValue
      );
      const json = {
        support_documents: uploadedDocuments?.map((doc) => ({
          attachment_url: doc?.uploaded_url,
          status: status?.STATUS_ID,
        })),
        status: status?.STATUS_ID,
      };
      const res = await mutateUpdateProjectStatus(json);
      successToast(res?.data?.message);
      closeDrawer();
    } catch (err) {
      catchErrFunc(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleNext = () => {
    setSelectedTab(selectedTab + 1);
  };

  const handlePrev = () => {
    setSelectedTab(0);
  };

  const sideTabs = [
    {
      title: "Detail",
      content: <ChangeStatus {...form_methods} handleNext={handleNext} />,
    },
    {
      title: "Support Documents",
      content: (
        <ProjectSupportDocument
          {...form_methods}
          handleNext={handleSubmit}
          handlePrev={handlePrev}
          isSubmitting={isUploading || isLoading}
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

export default UpdateProcurementStatus;
