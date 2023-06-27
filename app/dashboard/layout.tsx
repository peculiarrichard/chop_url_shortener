'use client';
import { usePathname } from "next/navigation";
import {ReactEventHandler, useState} from 'react'
import Sidebar from './components/Sidebar';
import { ReactNode, Suspense } from 'react';
import ShortLinks from "./shortlinks/page";
import Dashboard from "./page";
import CustomShortLinks from "./customshortlinks/page";
import CustomDomain from "./customdomain/page";
import Settings from "./settings/page";
import Headerbar from "@/app/dashboard/components/Headerbar";
import QRCodes from "./qrcodes/page";
import Loading from "./loading";
import Feedback from "./feedback/page";


interface LayoutProps {
  children: ReactNode;
}

 const Layout: React.FC<LayoutProps> = ({ children }) => {
  const  pathname  = usePathname();

  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
    <Headerbar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen}></Headerbar>
    <div className="flex w-[95%] mx-auto justify-between items-start pt-4">
      <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar}></Sidebar>
      <div>
        {/* // Render the appropriate component based on the current route */}
        {pathname === '/dashboard' && <Dashboard /> }
        {pathname === '/dashboard/shortlinks' && <ShortLinks />}
        {pathname === '/dashboard/customshortlinks' && <CustomShortLinks />}
        {pathname === '/dashboard/qrcodes' && <QRCodes />}
        {pathname === '/dashboard/customdomain' && <CustomDomain />}
        {pathname === '/dashboard/settings' && <Settings />}
        {pathname === '/dashboard/feedback' && <Feedback />}
      </div>
    </div>
    </>
  );
};

export default Layout;