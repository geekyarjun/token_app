import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/layout";
import { cn } from "@/lib/utils";
import AuthDialog from "@/components/auth/auth-dialog";
import AuthProvider from "@/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Token Dashboard",
  description: "Comprehensive token overview dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "h-screen")}>
        <Providers>
          <AuthProvider>
            <Header />
            <main style={{ height: `calc(100% - 56px)` }} className="px-[10px]">
              {children}
            </main>
            <AuthDialog />
          </AuthProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
