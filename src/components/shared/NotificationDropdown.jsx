import { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { createPortal } from "react-dom";
import { Avatar, Badge } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import {
  useGetNotification,
  useUpdateNotification,
} from "../../service/api/notification";
import useCurrentUser from "../../hooks/useCurrentUser";
import { preProfileLink } from "../../utils/pre-profile-link";
import { format } from "date-fns";
import { useGetProjectByMutation } from "../../service/api/project";
import useDrawerStore from "../../hooks/useDrawerStore";
import { catchErrFunc } from "../../utils/catchErrFunc";
import StarLoader from "../core/loaders/StarLoader";
const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userData } = useCurrentUser();
  const { data: get_notifications } = useGetNotification(
    userData?.data?.STAFF_ID
  );

  const { openDrawer } = useDrawerStore();

  const { mutateAsync: mutateGetProjectDetail, isPending: isPendingDetail } =
    useGetProjectByMutation();

  const navigate = useNavigate();

  const { mutate: updateNotification, isPending: isUpdating } =
    useUpdateNotification();

  const notificationData =
    get_notifications?.filter((notf) => !notf?.IS_READ) || [];

  const handleNotificationClick = () => {
    setIsOpen(!isOpen);
  };

  const handleTreatNotification = async (notification) => {
    updateNotification(notification?.ID);
    await getVendorDetail(notification);
    setIsOpen(false);
    navigate("/approval");
  };

  const getVendorDetail = async (notification) => {
    try {
      const projectDetail = await mutateGetProjectDetail(
        notification?.PROCUREMENT_ID
      );

      const support_documents = projectDetail?.support_documents;

      const details = {
        ...projectDetail,
        data: {
          ...projectDetail,
        },
        procurement_items: projectDetail?.procurement_items,
        approvers: projectDetail?.approval_request,
        notes: [],
        support_documents,
      };

      openDrawer({
        viewName: "project-detail",
        drawerSize:
          details?.RODER_TYPE === "Local Purchase Order" ? "1200" : null,
        projectDetail: details,
        is_approval: true,
      });
    } catch (err) {
      catchErrFunc(err);
    }
  };

  return (
    <>
      {/* Render overlay at body level using portal */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 bgblack/50  z-60"
            onClick={handleNotificationClick}
          />,
          document.body
        )}

      <main className="relative">
        <button
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white dark:bg-[#1f1c1c] hover:bg-gray-100 dark:hover:bg-[#381d2a] cursor-pointer"
          onClick={handleNotificationClick}
        >
          <Badge
            color="danger"
            content={notificationData?.length}
            isInvisible={!notificationData?.length}
          >
            <FaBell size={22} className="text-gray-400" />
          </Badge>
        </button>

        <section
          className={
            (isOpen
              ? "transition-all duration-300 ease-in-out opacity-100 scale-100 "
              : "transition-all duration-300 ease-in-out opacity-0 scale-95 pointer-events-none ") +
            "absolute right-4 mt-2 w-80 md:w-96 bg-white dark:bg-card-dark rounded-lg shadow-lg z-70"
          }
        >
          <div className="px-6 pt-5">
            <h3 className="text-xl font-semibold text-background-dark dark:text-background-light mb-4">
              Notifications
            </h3>
          </div>
          <div className="bg-white/50 dark:bg-card-dark rounded-b-lg shadow-sm relative">
            {isPendingDetail && isUpdating && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-50 opacity-30 w-full h-full z-50">
                <StarLoader />
              </div>
            )}
            <ul className="divide-y divide-primary/20 dark:divide-border-dark">
              {notificationData?.length === 0 ? (
                <li className="flex items-center justify-center py-6 px-6">
                  <p className="text-sm text-background-dark/70 dark:text-background-light/70 font-primary">
                    No notifications available.
                  </p>
                </li>
              ) : (
                notificationData?.slice(0, 7)?.map((notification, index) => (
                  <li
                    key={index + "___notification"}
                    className="flex items-center gap-4 py-4 px-6 hover:bg-primary/5 dark:hover:bg-primary/10 cursor-pointer"
                    onClick={() => handleTreatNotification(notification)}
                  >
                    <div>
                      <Avatar
                        alt={`${notification.STAFF_NAME}'s avatar`}
                        className="size-12 rounded-full object-cover"
                        src={preProfileLink(notification?.STAFF_NAME)}
                        width={25}
                        height={25}
                      />
                    </div>
                    <div className="grow">
                      <p className="font-medium text-background-dark dark:text-background-light text-sm font-primary">
                        {`${notification?.MESSAGE}`}
                      </p>
                      <p className="text-sm text-background-dark/70 dark:text-background-light/70 font-primary">
                        {format(notification?.CREATED_AT, "MMM dd, yyyy HH:mm")}
                      </p>
                    </div>
                  </li>
                ))
              )}
            </ul>
            {notificationData?.length > 8 && (
              <div className="p-4 text-center">
                <Link
                  to={"/approval"}
                  onClick={() => setIsOpen(false)}
                  className="text-sm font-medium text-primary hover:text-primary/80"
                >
                  View all notifications
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default NotificationDropdown;
