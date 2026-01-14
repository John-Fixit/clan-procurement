import React, { useEffect, useMemo, useRef, useState } from "react";
import { findProjectType } from "../utils/findProjectType";
import LocalPurchaseOrder from "../components/core/templates/local-purchase-order/LocalPurchaseOrder.jsx";
import JoborderTemplate from "../components/core/templates/job-order/jobOrderTemplate.jsx";
import { useParams } from "react-router-dom";
import { useGetProjectByMutation } from "../service/api/project";
import { Button, Result } from "antd";
import StarLoader from "../components/core/loaders/StarLoader";

const ViewTemplateDocument = () => {
  const docId = useParams()?.id;

  const componentRef = useRef();
  const jobOrderRef = useRef();

  const [templateDownloadColor, setTemplateDownloadColor] = useState("");

  const {
    mutate: mutateGetProjectDetail,
    data: projectDetail,
    isPending: isPendingDetail,
    isError,
  } = useGetProjectByMutation();

  useEffect(() => {
    mutateGetProjectDetail(docId);
  }, [docId, mutateGetProjectDetail]);

  const handleRefresh = () => {
    mutateGetProjectDetail(docId);
  };

  const order_type = findProjectType(projectDetail?.ORDER_TYPE);

  const details = useMemo(() => {
    return {
      ...projectDetail,
      data: {
        ...projectDetail,
      },
      procurement_items: projectDetail?.procurement_items,
      approvers: projectDetail?.approval_request,
      notes: [],
      support_documents: projectDetail?.support_documents,
    };
  }, [projectDetail]);

  return (
    <>
      <main className="bg-gray-100">
        <div className="w-full max-w-5xl mx-auto p-10 relative bg-white">
          {isPendingDetail ? (
            <div className="flex justify-center items-center h-screen">
              <StarLoader size={55} />
            </div>
          ) : isError ? (
            <div className="flex justify-center items-center h-screen flex-col gap-4">
              <Result status={"error"} title={<p>An error occurred</p>} />
              <Button onClick={handleRefresh}>Retry</Button>
            </div>
          ) : order_type?.value === "2" ? (
            <>
              <LocalPurchaseOrder
                details={details}
                componentRef={componentRef}
                bgColor={templateDownloadColor}
              />
            </>
          ) : (
            <JoborderTemplate
              details={details}
              componentRef={jobOrderRef}
              bgColor={templateDownloadColor}
            />
          )}
        </div>
      </main>
    </>
  );
};

export default ViewTemplateDocument;
