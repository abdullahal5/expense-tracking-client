import Sidebar from "@/components/sidebar/Sidebar";
import { ReactNode } from "react";
import styles from "./Layout.module.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.layoutContainer}>
      <Sidebar />
      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default Layout;
