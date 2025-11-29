import { useEffect, useMemo, useState } from "react";
import ReusableTabDrawerLayout from "../../../shared/reusable-tab-drawer-layout";
import { useForm } from "react-hook-form";
import VendorSupportDocument from "./VendorSupportDocument";
import VenderInformation from "./VendorInformation";
import { useGetDocument } from "../../../../service/api/setting";
import { catchErrFunc } from "../../../../utils/catchErrFunc";
import { useCreateVendor } from "../../../../service/api/vendor";
import { errorToast, successToast } from "../../../../utils/toastPopUps";
import { uploadFileData } from "../../../../utils/uploadFile";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useDrawerStore from "../../../../hooks/useDrawerStore";

const CreateVendor = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { closeDrawer, data } = useDrawerStore();

  const vendorDetail = data?.vendorDetail;

  const { data: get_documents } = useGetDocument();

  const support_documents = useMemo(() => {
    return get_documents?.map((doc) => ({
      id: doc?.ID,
      name: doc?.DOCUMNET_NAME,
      description: "",
      requiresRenewal: doc?.IS_YEARLY_RENEWABLE,
      uploaded: false,
      file: null,
      status: "pending",
      ...doc,
    }));
  }, [get_documents]);

  const handleNext = () => {
    setSelectedTab(selectedTab + 1);
  };

  const handlePrev = () => {
    setSelectedTab(selectedTab - 1);
  };

  const hook_form_props = useForm({
    defaultValues: {
      name: vendorDetail?.FULLNAME,
      email: vendorDetail?.EMAIL,
      phone: vendorDetail?.PHONE,
      address: vendorDetail?.ADDRESS,
      business: vendorDetail?.BUSINESS,
      support_documents: vendorDetail?.support_documents || support_documents,
    },
  });

  const {
    getValues,
    reset,
    trigger,
    formState: { errors: hookErrors },
  } = hook_form_props;

  useEffect(() => {
    reset({
      support_documents: vendorDetail?.support_documents || support_documents,
    });
  }, [reset, support_documents, vendorDetail?.support_documents]);

  const { mutateAsync: mutateCreateVendor, isPending: isSubmitting } =
    useCreateVendor(vendorDetail?.VENDOR_ID);

  const { userData } = useCurrentUser();

  // Function to upload all files that haven't been uploaded yet
  const uploadPendingFiles = async (documents) => {
    const uploadPromises = documents.map(async (doc) => {
      // Skip if already has URL (already uploaded) or no file selected
      if (doc.url || doc.webkitRelativePath || !doc.file) {
        return doc;
      }

      try {
        // Upload the file
        const uploadResult = await uploadFileData(doc.file, userData?.token);

        // Return document with uploaded file URL
        return {
          ...doc,
          url: uploadResult?.file_url,
          uploaded: true,
          status: "uploaded",
        };
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return {
          ...doc,
          status: "failed",
        };
      }
    });

    return await Promise.all(uploadPromises);
  };

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

    try {
      setIsUploading(true);

      // Upload all pending files first
      const uploadedDocuments = await uploadPendingFiles(
        values.support_documents || []
      );

      // console.log("Documents after upload:", uploadedDocuments);

      // Map the uploaded documents to the attachments format
      const attachments = uploadedDocuments
        .filter((doc) => doc.uploaded && doc.url) // Only include successfully uploaded documents
        .map((doc) => ({
          document_id: doc?.id,
          start_date: doc?.startDate || "",
          end_date: doc?.endDate || "",
          document_url: doc?.url,
        }));

      // Prepare the JSON payload
      const json = {
        vendor_name: values?.name,
        phone: values?.phone,
        email: values?.email,
        address: values?.address,
        business: values?.business,
        vendor_document: attachments,
      };

      // Submit to backend
      const res = await mutateCreateVendor(json);
      successToast(res?.data?.message);
      closeDrawer();
    } catch (err) {
      catchErrFunc(err);
    } finally {
      setIsUploading(false);
    }
  };

  const sideTabs = [
    {
      title: "Vendor Information",
      content: (
        <VenderInformation {...hook_form_props} handleNext={handleNext} />
      ),
    },
    {
      title: "Support document",
      content: (
        <VendorSupportDocument
          {...hook_form_props}
          handlePrev={handlePrev}
          handleSubmit={handleSubmit}
          isSubmitting={isSubmitting || isUploading}
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
