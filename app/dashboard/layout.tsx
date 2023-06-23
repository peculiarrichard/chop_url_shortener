'use client';
import { usePathname } from "next/navigation";
import Sidebar from '../../components/Sidebar';
import { ReactNode, Suspense } from 'react';
import ShortLinks from "./shortlinks/page";
import Dashboard from "./page";
import CustomShortLinks from "./customshortlinks/page";
import CustomDomain from "./customdomain/page";
import Settings from "./settings/page";
import Headerbar from "@/components/Headerbar";
import QRCodes from "./qrcodes/page";
import Loading from "./loading";
import Feedback from "./feedback/page";


interface LayoutProps {
  children: ReactNode;
}

 const Layout: React.FC<LayoutProps> = ({ children }) => {
  const  pathname  = usePathname();

  return (
    <>
    <Suspense fallback={<p>We are creating magic for you. It will just take a while</p>}>
    <Headerbar></Headerbar>
    <div className="flex w-[95%] mx-auto justify-between items-start pt-4">
      <Sidebar />
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
    </Suspense>
    </>
  );
};

export default Layout;