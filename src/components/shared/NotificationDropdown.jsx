import { useState } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { createPortal } from "react-dom";
import { Image } from "@heroui/react";
import { Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNotificationClick = () => {
    setIsOpen(!isOpen);
  };

  const notificationData = [
    {
      name: "Sophia",
      event: "Birthday",
      time: "In 2 days",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAj5fs0dR_OGjFq1m_FRM3vv5H7mr5-BBxZuqxyy3KY80P4-7uliZWFaMIwWPNrf2j5hCsAk0PMK6fxKHPxefs1smZK-k0L7xU0zoqdu04hbEimKcP_HWZFnFJzn_Ny4u0X5N6WkykZXHYHKfbPXnnx2yNtWPESfFXULA6MEPtLhhtMN8HX4ugZs_iua2uTNOFP5aocjPDKOmbWkwpjZ9fZRk6Bs8gSn6RfmPt41n49wUsULNqUJYQ8Y6Gr5gN_VKN1tvOWAozXBbY",
    },
    {
      name: "Ethan",
      event: "Birthday",
      time: "In 5 days",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCiepHqTnlSlg5MM_us-DCLz8y16DMOIQ9XrxODZFv3l4PvfhbVneVvHhORkXqMxDG5_EOKKKJHvUacAQUHOqj4PQSogktCSoDe7qkwfcWVEfOgx1M_k61dPz_2ABhB4PgYLrBlOI-jhptzTts8gS8mWXP4F1jjcBiXPqaW1e5aXy2saoZ5ziPJRpDRukyWwLvEoiJZzdc5Vh2V9_vHyg9H0QSxssGuFlZ4Zw7m36rNdimRFeH8mmoiboJUCe5IRusHkOkW3LWSmIg",
    },
    {
      name: "Olivia",
      event: "Birthday",
      time: "In 10 days",
      avatar:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD7A_nKLKtWOgQfxf90oCD1cYc2x-fxD4ngL2SGU5yE3MayaWMzxBtrhnlv7Vzu6KqxigK2FCJ1dsoj_UO2WNcr8B27NkfKT1Jp6Gw2P2QP_Q2UaXT6ukp1VhDEEg8Kjp35omj1WEBtcPesCaAXkMUqS-5uBRqs1dbTyOgj46GWAGe3bemQqHE5vAZl2BubV72dZMKF6AbwVMh0rx-EMExBVU1UgCrX0jZ2pM80nSPa07XB4FNd1FpASBpIWPTgLLNQNL9yhm1Ikgo",
    },
  ];

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
          <FaBell size={22} className="text-gray-400" />
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
          <div className="bg-white/50 dark:bg-card-dark rounded-b-lg shadow-sm">
            <ul className="divide-y divide-primary/20 dark:divide-border-dark">
              {notificationData.map((notification, index) => (
                <li
                  key={index + "___notification"}
                  className="flex items-center gap-4 py-4 px-6 hover:bg-primary/5 dark:hover:bg-primary/10 cursor-pointer"
                >
                  <Image
                    alt={`${notification.name}'s avatar`}
                    className="size-12 rounded-full object-cover"
                    src={notification.avatar}
                    width={48}
                    height={48}
                  />
                  <div className="grow">
                    <p className="font-medium text-background-dark dark:text-background-light">
                      {`${notification.name}'s Birthday`}
                    </p>
                    <p className="text-sm text-background-dark/70 dark:text-background-light/70">
                      {notification.time}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <div className="p-4 text-center">
              <Link
                to={"/approval"}
                onClick={() => setIsOpen(false)}
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                View all 7 upcoming
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default NotificationDropdown;
