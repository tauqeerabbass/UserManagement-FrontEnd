import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Header } from "antd/es/layout/layout";
import { Layout } from "antd";
import Link from "next/link";
import SignOutButton from "./components/SignOutButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "User Management Platform",
  description: "A modern platform for managing users and posts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Layout>
            <Header 
              className="sticky top-0 z-50 flex justify-between items-center h-20 px-4 md:px-8 shadow-lg"
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              }}
            >
              <Link href="/">
                <div className="text-sm md:text-lg lg:text-2xl font-bold text-white cursor-pointer hover:text-blue-100 transition-colors duration-300 whitespace-nowrap">
                  ✨ User Management
                </div>
              </Link>
              <SignOutButton />
            </Header>

            <main className="min-h-screen w-full overflow-y-auto">{children}</main>
          </Layout>
        </Providers>
      </body>
    </html>
  );
}
