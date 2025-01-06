"use client";
import { useState } from "react";
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

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleRouteChange = (route: string) => {
    router.push(`/${route}`);
  };

  const handleLogout = () => {
    console.log("Logged out");
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <button className={styles["hamburger-btn"]} onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ""}`}>
        <div
          className={styles["sidebar-header"]}
          onClick={() => handleRouteChange("/")}
        >
          <h2 className={styles.logo}>My Dashboard</h2>
        </div>
        <ul className={styles["sidebar-menu"]}>
          <li
            className={`${styles["sidebar-item"]} ${
              pathname === "/overview" ? styles.active : ""
            }`}
            onClick={() => handleRouteChange("overview")}
          >
            <FaChartLine className={styles["sidebar-icon"]} />
            <span className={styles["sidebar-text"]}>Overview</span>
          </li>
          <li
            className={`${styles["sidebar-item"]} ${
              pathname === "/add-expense" ? styles.active : ""
            }`}
            onClick={() => handleRouteChange("add-expense")}
          >
            <FaPlus className={styles["sidebar-icon"]} />
            <span className={styles["sidebar-text"]}>Add Expense</span>
          </li>
          <li
            className={`${styles["sidebar-item"]} ${
              pathname === "/summary" ? styles.active : ""
            }`}
            onClick={() => handleRouteChange("summary")}
          >
            <FaFileAlt className={styles["sidebar-icon"]} />
            <span className={styles["sidebar-text"]}>Summary</span>
          </li>
          <li
            className={`${styles["sidebar-item"]} ${
              pathname === "/history" ? styles.active : ""
            }`}
            onClick={() => handleRouteChange("history")}
          >
            <FaHistory className={styles["sidebar-icon"]} />
            <span className={styles["sidebar-text"]}>Expenses History</span>
          </li>
          <li
            className={`${styles["sidebar-item"]} ${
              pathname === "/settings" ? styles.active : ""
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
