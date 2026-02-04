import {
  FaBalanceScale,
  FaFileAlt,
  FaFileInvoiceDollar,
  FaShoppingCart,
  FaStream,
  FaUsersCog,
  FaWallet,
} from "react-icons/fa";
import { FaBoxesPacking } from "react-icons/fa6";
import clsx from "clsx";
import { useState } from "react";
import { createPortal } from "react-dom";
import { CgMenuGridO } from "react-icons/cg";
import { useValidateCompany } from "../../service/api/base-api";
import useCurrentUser from "../../hooks/useCurrentUser";
import { errorToast } from "../../utils/toastPopUps";
import StarLoader from "../core/loaders/StarLoader";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";

const argon_apps = [
  {
    name: "HR",
    // logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeN761icqfPL5y12CSf3Xljl_fTQJesnmqog&s",
    is_icon: true,
    icon: FaUsersCog,
    icon_bg: "bg-[#0F172A]",
    icon_color: "text-white",
    path: "https://argon-hr.netlify.app/engage/home",
    // path: "https://hr.ncaa.gov.ng/engage/home",
    code: "1612",
  },
  {
    name: "Payroll",
    logo: "",
    is_icon: true,
    icon: FaWallet,
    icon_bg: "bg-rose-700",
    icon_color: "text-white",
    path: "https://hr.ncaa.gov.ng/engage/home",
    code: "1619",
  },
  {
    name: "Legal",
    logo: "",
    is_icon: true,
    icon: FaBalanceScale,
    icon_bg: "bg-blue-900",
    icon_color: "text-white",
    // path: "https://legal.ncaa.gov.ng/dashboard/",
    path: "https://case-ms.netlify.app/",
    code: "1647",
  },
  {
    name: "Store",
    logo: "",
    is_icon: true,
    icon: FaFileInvoiceDollar,
    icon_bg: "bg-indigo-600",
    icon_color: "text-white",
    // path: "https://edap.ncaa.gov.ng/dashboard",
    path: "https://clan-memo-store.netlify.app/dashboard",
    code: "1633",
  },
  {
    name: "Procurement",
    logo: "",
    is_icon: true,
    icon: FaShoppingCart,
    icon_bg: "bg-indigo-500",
    icon_color: "text-white",
    // path: "https://clan-procurement.netlify.app/dashboard",
    path: "https://clan-procurement.netlify.app/dashboard",
    code: "1640",
  },
  {
    name: "Licensing",
    logo: "",
    is_icon: true,
    icon: FaBoxesPacking,
    icon_bg: "bg-violet-600",
    icon_color: "text-white",
    path: "https://clan-procurement.netlify.app/dashboard",
    code: "1626",
  },
  {
    name: "E-Approval",
    logo: "",
    is_icon: true,
    icon: FaFileAlt,
    icon_bg: "bg-blue-600",
    icon_color: "text-white",
    // path: "https://memo-vn.netlify.app/dashboard",
    path: "https://memo-vn.netlify.app/dashboard",
    code: "1654",
  },
  {
    name: "Workflow",
    logo: "",
    is_icon: true,
    icon: FaStream,
    icon_bg: "bg-teal-600",
    icon_color: "text-white",
    path: "https://memo-vn.netlify.app/dashboard",
    code: "1661",
  },
];

const AppSwitcher = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSwitcherClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Render overlay at body level using portal */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 bgblack/50 z-40"
            onClick={handleSwitcherClick}
          />,
          document.body,
        )}

      <main className="relative">
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-black/10 dark:bg-[#1f1c1c] hover:bg-gray-100 dark:hover:bg-[#381d2a] cursor-pointer"
          onClick={handleSwitcherClick}
        >
          <CgMenuGridO size={24} color="text-gray-500 dark:text-gray-400" />
        </button>
        <section
          className={
            (isOpen
              ? "transition-all duration-300 ease-in-out opacity-100 scale-100 "
              : "transition-all duration-300 ease-in-out opacity-0 scale-95 pointer-events-none ") +
            "absolute right-0 mt-2 w-50 md:w-96 bg-slate-100 dark:bg-card-dark rounded-2xl shadow-lg z-80 border border-gray-300"
          }
        >
          <div className="flex  px-[1.8rem] items-start py-3 border-b border-slate-200/50">
            <span className="text-gray-700  font-semibold text-lg">
              Argon Apps
            </span>
          </div>
          <div className="rounded-b-lg">
            <div className="grid grid-cols-3 gap-x-[1.5rem] gap-y-2 place-items-center  pt-2 h-full px-6 mb-8">
              {argon_apps?.map((app, index) => (
                <AppButton key={index} app_={app} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default AppSwitcher;

const AppButton = ({ app_ }) => {
  const { userData } = useCurrentUser();

  const [errorData, setErrorData] = useState({});

  const [selectedApp, setSelectedApp] = useState(null);

  const { mutateAsync: validateCompany, isPending: isValidatingCompany } =
    useValidateCompany();

  const validationFuntion = async () => {
    //first check if the compnay is elible
    const json = {
      company_id: userData?.data?.COMPANY_ID,
      id: app_?.code,
    };

    try {
      const res = await validateCompany(json);
      return res;
    } catch (err) {
      errorToast(err?.response?.data?.message || err?.message);
    }
  };

  const validateStaff = () => {
    const normalizeName = app_?.name?.toLowerCase();
    const {
      IS_LEGAL,
      IS_PROCUREMENT,
      IS_STORE,
      IS_HR,
      IS_DOCUMENT_USER,
      IS_SALARY,
    } = userData.data;
    const no_cond = ["licensing", "workflow"];
    if (normalizeName === "procurement" && IS_PROCUREMENT) {
      return true;
    } else if (normalizeName === "legal" && IS_LEGAL) {
      return true;
    } else if (normalizeName === "store" && IS_STORE) {
      return true;
    } else if (normalizeName === "hr" && IS_HR) {
      return true;
    } else if (normalizeName === "e-approval" && IS_DOCUMENT_USER) {
      return true;
    } else if (normalizeName === "payroll" && IS_SALARY) {
      return true;
    } else if (no_cond.includes(normalizeName)) {
      return true;
    }
    return false;
  };

  const handleNavigate = async (e) => {
    e.preventDefault();

    setSelectedApp(app_?.code);

    //check if staff is allowed to see this page

    const val_staff = validateStaff();

    if (!val_staff) {
      setErrorData({
        status: true,
        message: "Sorry! You are not authorized to view this app.",
        type: "unauthorized",
      });
      return;
    }
    const comp_val = await validationFuntion(); // this checks company eligibility
    if (comp_val?.IS_ACTIVE) {
      window.open(
        `${app_?.path}?from=basement&ctx=${userData?.token}&cid=${userData?.data?.COMPANY_ID}&stid=${userData?.data?.STAFF_ID}`,
        "_blank",
        "noopener,noreferrer",
      );
    } else {
      setErrorData({
        status: true,
        message: "Sorry, your company has no subscription to this feature.",
        type: "subscription",
      });
    }
  };
  return (
    <>
      <Modal
        isOpen={errorData?.status}
        onOpenChange={() => setErrorData({ status: false })}
        placement="top"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <svg
                    className="h-6 w-6 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                  <span>Access Denied</span>
                </div>
              </ModalHeader>
              <ModalBody>
                <p className="text-gray-600">{errorData?.message}</p>

                {errorData?.type === "subscription" && (
                  <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      Contact your administrator to upgrade your subscription
                      and unlock this feature.
                    </p>
                  </div>
                )}

                {errorData?.type === "unauthorized" && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-700">
                      If you believe this is an error, please contact your
                      system administrator.
                    </p>
                  </div>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Go Back
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <a
        href={``}
        onClick={handleNavigate}
        target="_blank"
        rel="noreferrer"
        className={clsx(
          "rounded-xl p-2 flex flex-col justify-center items-center  cursor-pointer opacity-90 text-gray-600 w-[85px] gap-y-1 bg-gray-200/50 hover:bg-gray-200 transition-colors duration-300 relative",
          isValidatingCompany && selectedApp === app_?.code && "bg-gray-200",
        )}
      >
        {isValidatingCompany && selectedApp === app_?.code && (
          <div className="absolute top-1/3 bottom-1/2 ">
            <StarLoader />
          </div>
        )}

        {app_?.is_icon ? (
          <div
            className={clsx(
              "rounded-full w-[70px] h-[70px] flex justify-center items-center",
              app_?.icon_bg || `bg-[#322742] `,
            )}
          >
            <app_.icon
              size={25}
              className={clsx("!font-bold", app_?.icon_color)}
            />
          </div>
        ) : (
          <img
            src={app_?.logo}
            alt={app_?.name + "__logo"}
            className="w-[70px] h-[70px] rounded-full"
          />
        )}

        <div
          className={clsx(
            "w[70px] text-center fontmedium text-black text-[13px] font-Lato font-semibold",
          )}
        >
          {app_?.name}
        </div>
      </a>
    </>
  );
};
