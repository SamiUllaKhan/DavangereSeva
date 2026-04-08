import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Toaster } from "@/components/ui/sonner";
import { isAuthenticated } from "@/app/actions/auth";
import { getUserSession } from "@/app/actions/user";
import FloatingSupport from "@/components/ui/FloatingSupport";
import FloatingCartBar from "@/components/ui/FloatingCartBar";
import NextTopLoader from 'nextjs-toploader';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Davanagere Seva | Professional Services Marketplace",
  description: "Book home cleaning, plumbing, AC repair, and more in Davanagere.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isAdmin = await isAuthenticated();
  const userSession = await getUserSession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased pb-16 md:pb-0`}
      >
        <NextTopLoader 
          color="#0ea5e9"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #0ea5e9,0 0 5px #0ea5e9"
        />
        <Navbar isAuth={isAdmin} userSession={userSession} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <MobileNav isAuth={isAdmin} userSession={userSession} />
        <FloatingCartBar />
        <FloatingSupport />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
