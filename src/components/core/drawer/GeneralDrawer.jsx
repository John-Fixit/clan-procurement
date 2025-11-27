import {
  Button,
  //   Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  Tooltip,
} from "@heroui/react";
import useDrawerStore from "../../../hooks/useDrawerStore";
import JobOrderTemplate from "../templates/job-order/jobOrderTemplate";
import { IoMdClose } from "react-icons/io";
import LocalPurchaseOrder from "../templates/local-purchase-order/LocalPurchaseOrder";
import CreateProject from "../projects/CreateProject";
import ObjectiveForm from "../../objectives/ObjectiveForm";
import CreateVendor from "../create-vendor/CreateVendor";
import { Drawer } from "antd";

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
      </Drawer>
      {
        //   <Drawer
        //     isOpen={isOpen}
        //     onClose={closeDrawer}
        //     placement="right"
        //     size={drawerSize || "5xl"}
        //     classNames={{
        //       base: "sm:data-[placement=right]:m-2 sm:data-[placement=left]:m-2 rounded-medium",
        //     }}
        //   >
        //     <DrawerContent>
        //       {(onClose) => (
        //         <>
        //           <DrawerHeader className="inset-x-0 z-50 flex flex-row gap-2 px-2 py-2 border-b border-default-200/50 justify-between bg-content1/50 backdrop-saturate-150 backdrop-blur-lg">
        //             <Tooltip content="Close">
        //               <Button
        //                 isIconOnly
        //                 className="text-default-400"
        //                 size="lg"
        //                 variant="light"
        //                 onPress={onClose}
        //               >
        //                 <IoMdClose size={25} />
        //               </Button>
        //             </Tooltip>
        //             <div className="flex-1">{title}</div>
        //           </DrawerHeader>
        //           <DrawerBody className="mt-6">
        //             {viewName === "job-order-template" && <JobOrderTemplate />}
        //             {viewName === "local-purchase-template" && (
        //               <LocalPurchaseOrder />
        //             )}
        //             {/* {viewName === "create-project" && <CreateProject />} */}
        //             {viewName === "create-project" && <ObjectiveForm />}
        //             {viewName === "create-vendor" && <CreateVendor />}
        //           </DrawerBody>
        //         </>
        //       )}
        //     </DrawerContent>
        //   </Drawer>
      }
    </>
  );
};

export default GeneralDrawer;
