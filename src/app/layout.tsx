import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import SidebarWrapper from "@/components/SidebarWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Probase Admin",
    default: "Probase Admin",
  },
  description: "Management dashboard for Probase Ecosystem",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-slate-50 text-slate-900 min-h-screen flex`}>
        <AuthProvider>
          <SidebarWrapper />
          <main className="flex-1 p-8 overflow-y-auto no-scrollbar bg-indigo-50/30">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
