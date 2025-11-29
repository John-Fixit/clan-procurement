import useDrawerStore from "../../../hooks/useDrawerStore";
import JobOrderTemplate from "../templates/job-order/JobOrderTemplate";
import LocalPurchaseOrder from "../templates/local-purchase-order/LocalPurchaseOrder";
import CreateProject from "../projects/CreateProject";
import { Drawer } from "antd";
import AddStaff from "../role_permission/AddStaff";
import VendorDetail from "../vendor/VendorDetail";
import CreateVendor from "../vendor/create-vendor/CreateVendor";

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
        {viewName === "vendor-detail" && <VendorDetail />}
      </Drawer>
    </>
  );
};

export default GeneralDrawer;
