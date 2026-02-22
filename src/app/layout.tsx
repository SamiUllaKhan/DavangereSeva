import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import { Toaster } from "@/components/ui/sonner";
import { isAuthenticated } from "@/app/actions/auth";
import { getUserSession } from "@/app/actions/user";
import WhatsAppButton from "@/components/ui/WhatsAppButton";

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
        <Navbar isAuth={isAdmin} userSession={userSession} />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <MobileNav isAuth={isAdmin} userSession={userSession} />
        <WhatsAppButton />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
