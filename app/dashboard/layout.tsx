"use client";
import { usePathname } from "next/navigation";
import Sidebar from "./components/Sidebar";
import { ReactNode, Suspense, useState } from "react";
import ShortLinks from "./shortlinks/page";
import Dashboard from "./page";
import CustomShortLinks from "./customshortlinks/page";
import CustomDomain from "./customdomain/page";
import Settings from "./settings/page";
import Headerbar from "@/app/dashboard/components/Headerbar";
import QRCodes from "./qrcodes/page";
import Feedback from "./feedback/page";
import Loading from "./loading";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <Headerbar
        toggleSidebar={toggleSidebar}
        isOpen={isSidebarOpen}></Headerbar>
      <div className="flex w-[95%] mx-auto justify-between items-start pt-4">
        <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar}></Sidebar>
        <Suspense fallback={<Loading></Loading>}>
          <div>
            {pathname === "/dashboard" && <Dashboard />}
            {pathname === "/dashboard/shortlinks" && <ShortLinks />}
            {pathname === "/dashboard/customshortlinks" && <CustomShortLinks />}
            {pathname === "/dashboard/qrcodes" && <QRCodes />}
            {pathname === "/dashboard/customdomain" && <CustomDomain />}
            {pathname === "/dashboard/settings" && <Settings />}
            {pathname === "/dashboard/feedback" && <Feedback />}
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default Layout;
