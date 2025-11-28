import useDrawerStore from "../../../hooks/useDrawerStore";
import JobOrderTemplate from "../templates/job-order/JobOrderTemplate";
import LocalPurchaseOrder from "../templates/local-purchase-order/LocalPurchaseOrder";
import CreateProject from "../projects/CreateProject";
import CreateVendor from "../create-vendor/CreateVendor";
import { Drawer } from "antd";
import AddStaff from "../role_permission/AddStaff";

const GeneralDrawer = () => {
  const { isOpen, closeDrawer, data } = useDrawerStore();
  const viewName = useDrawerStore((state) => state.data.viewName);

  const { title, drawerSize } = data;

  return (
    <>
      <Drawer
        open={isOpen}
        onClose={closeDrawer}
        size={parseFloat(drawerSize) || "large"}
        title={title}
      >
        {viewName === "job-order-template" && <JobOrderTemplate />}
        {viewName === "local-purchase-template" && <LocalPurchaseOrder />}
        {viewName === "create-project" && <CreateProject />}
        {viewName === "create-vendor" && <CreateVendor />}
        {viewName === "add-staff-role-permission" && <AddStaff />}
      </Drawer>
    </>
  );
};

export default GeneralDrawer;
