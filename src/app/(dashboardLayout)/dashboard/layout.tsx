import Sidebar from "@/components/sidebar/Sidebar";
import { ReactNode } from "react";
import "./layout.css";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="layout-container">
      <Sidebar />
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
