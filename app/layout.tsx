import "./globals.css";
import { Open_Sans } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import { ToastContainer } from "react-toastify";

const inter = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Chop -Url Shortener",
  description: "Advanced Url Shortening Solution",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true} className={inter.className}>
        <AuthProvider>
          {children} <ToastContainer />{" "}
        </AuthProvider>
      </body>
    </html>
  );
}
