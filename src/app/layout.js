import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import QueryClientProviderWrapper from "@/components/QueryClientProviderWrapper";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Auth App",
  description: "Authentication application built with Next.js",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProviderWrapper>
          <AuthProvider>
            <TooltipProvider>
              <Toaster position="top-center" />
              {children}
            </TooltipProvider>
          </AuthProvider>
        </QueryClientProviderWrapper>
      </body>
    </html>
  );
}