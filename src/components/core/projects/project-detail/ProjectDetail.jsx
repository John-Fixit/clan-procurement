import React, { useState } from "react";
import ApprovalHistory from "../../../shared/approval-history/ApprovalHistory";
import useDrawerStore from "../../../../hooks/useDrawerStore";
import ReusableTabDrawerLayout from "../../../shared/reusable-tab-drawer-layout";
import JobOrderDetail from "./JobOrderDetail";
import SupportDocumentView from "../../../shared/support-document-views/SupportDocumentViews";
import { Modal as AntModal } from "antd";
import { catchErrFunc } from "../../../../utils/catchErrFunc";
import { useApproveProject } from "../../../../service/api/project";
import { successToast } from "../../../../utils/toastPopUps";
import LocalPurchaseItemsView from "./LocalPurchaseItemsView";

const ProjectDetail = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const {
    data: { projectDetail, is_approval },
    closeDrawer,
  } = useDrawerStore();

  const sideTabs = [
    {
      title: "Detail",
      content: (
        <JobOrderDetail details={projectDetail} is_approval={is_approval} />
      ),
    },
    projectDetail?.procurement_items && {
      title: "Items",
      content: <LocalPurchaseItemsView details={projectDetail} />,
    },

    {
      title: "Support Documents",
      content: <SupportDocumentView details={projectDetail} />,
    },
    // {
    //   title: "View Notes",
    //   content: (
    //     <ProjectNote
    //     />
    //   ),
    // },
    // {
    //   title: "Approval History",
    //   content: <ApprovalHistory details={projectDetail} />,
    // },
  ].filter(Boolean);

  const [modal, contextHolder] = AntModal.useModal();
  const { mutateAsync: mutateApproveProject } = useApproveProject();

  const handleApprove = (request) => {
    const config = {
      title: "Confirm!",
      okText: "Yes, Approve",
      content: (
        <>
          <p className="fot-primary">
            Are you sure to approve this Procurement request?
          </p>
        </>
      ),
    };

    const json = {
      approval_id: request?.APPROVAL_ID,
      is_approved: 1,
      procurement_id: projectDetail?.PROCUREMENT_ID || projectDetail?.ID,
      sn: projectDetail?.SN,
      max_sn: projectDetail?.MAX_SN,
    };
    modal.confirm({ ...config, onOk: () => handleConfirmApprove(json) });
  };

  const handleReject = (request) => {
    const config = {
      title: "Confirm!",
      okText: "Yes, Reject",
      content: (
        <>
          <p className="fot-primary">
            Are you sure to reject this Procurement request?
          </p>
        </>
      ),
    };

    const json = {
      approval_id: request?.APPROVAL_ID,
      is_approved: -1,
      status: "reject",
    };
    modal.confirm({ ...config, onOk: () => handleConfirmApprove(json) });
  };

  const handleConfirmApprove = async (payload) => {
    try {
      const res = await mutateApproveProject(payload);
      successToast(res?.data?.message);
      closeDrawer();
    } catch (err) {
      catchErrFunc(err);
    }
  };

  return (
    <>
      {contextHolder}
      <ReusableTabDrawerLayout
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        sideTabs={sideTabs}
        is_approval={is_approval && projectDetail?.data?.IS_APPROVED === 0}
        handleApprove={() => handleApprove(projectDetail)}
        handleReject={() => handleReject(projectDetail)}
      />
    </>
  );
};

export default ProjectDetail;
