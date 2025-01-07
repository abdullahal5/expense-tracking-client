"use client";
import { useEffect, useState } from "react";
import {
  FaChartLine,
  FaFileAlt,
  FaCog,
  FaSignOutAlt,
  FaPlus,
  FaHistory,
  FaBars,
} from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import styles from "./Sidebar.module.css";
import { useAppSelector } from "@/redux/hook";
import Image from "next/image";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.auth);
  const [isClient, setIsClient] = useState(false);

  const handleRouteChange = (route: string) => {
    router.push(`/dashboard/${route}`);
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      <button className={styles["hamburger-btn"]} onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div
          className={styles["sidebar-header"]}
          onClick={() => handleRouteChange("overview")}
        >
          <h2 className={styles.logo}>My Dashboard</h2>
        </div>
        {isClient && user && (
          <div className={styles["profile-section"]}>
            <Image
              src={user?.profilePicture as string}
              width={50}
              height={50}
              alt="profile Image"
              className={styles["profile-avatar"]}
            />
            <div className={styles["profile-details"]}>
              <p className={styles["profile-name"]}>{user?.name}</p>
              <p className={styles["profile-email"]}>{user?.email}</p>
            </div>
          </div>
        )}
        <ul className={styles["sidebar-menu"]}>
          <li
            className={`${styles["sidebar-item"]} ${
              pathname === "/dashboard/overview" ? styles.active : ""
            }`}
            onClick={() => handleRouteChange("overview")}
          >
            <FaChartLine className={styles["sidebar-icon"]} />
            <span className={styles["sidebar-text"]}>Overview</span>
          </li>
          <li
            className={`${styles["sidebar-item"]} ${
              pathname === "/dashboard/add-expense" ? styles.active : ""
            }`}
            onClick={() => handleRouteChange("add-expense")}
          >
            <FaPlus className={styles["sidebar-icon"]} />
            <span className={styles["sidebar-text"]}>Add Expense</span>
          </li>
          <li
            className={`${styles["sidebar-item"]} ${
              pathname === "/dashboard/summary" ? styles.active : ""
            }`}
            onClick={() => handleRouteChange("summary")}
          >
            <FaFileAlt className={styles["sidebar-icon"]} />
            <span className={styles["sidebar-text"]}>Summary</span>
          </li>
          <li
            className={`${styles["sidebar-item"]} ${
              pathname === "/dashboard/history" ? styles.active : ""
            }`}
            onClick={() => handleRouteChange("history")}
          >
            <FaHistory className={styles["sidebar-icon"]} />
            <span className={styles["sidebar-text"]}>Expenses History</span>
          </li>
          <li
            className={`${styles["sidebar-item"]} ${
              pathname === "/dashboard/settings" ? styles.active : ""
            }`}
            onClick={() => handleRouteChange("settings")}
          >
            <FaCog className={styles["sidebar-icon"]} />
            <span className={styles["sidebar-text"]}>Settings</span>
          </li>
        </ul>
        <button className={styles["logout-btn"]} onClick={handleLogout}>
          <FaSignOutAlt className={styles["logout-icon"]} />
          <span className={styles["logout-text"]}>Logout</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;
