import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "NextGen Tech | Modern content operations for growing teams",
  description: "A polished content and customer platform for blogs, messages, and growth operations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en">
      
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[var(--page-bg)] text-[var(--page-text)] antialiased`}>
        <ToastContainer
          position="top-right"
          autoClose={2800}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnHover
          draggable
          transition={Slide}
          closeButton={false}
          theme="light"
          toastClassName="!rounded-[24px] !border !border-slate-200 !shadow-[0_22px_70px_rgba(15,23,42,0.16)] !bg-white/95 !backdrop-blur-md"
          className="!text-slate-700 !text-sm !leading-6"
          progressClassName="!bg-[var(--page-accent)]"
        />
        {children}
      </body>
    </html>
    </ClerkProvider>
  );
}
