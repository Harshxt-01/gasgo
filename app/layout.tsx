import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-toggle/ThemeProvider";
import { AuthProvider } from "@/components/auth/AuthContext";
import { ToastProvider } from "@/components/ui/ToastProvider";

export const metadata: Metadata = {
  title: "AuraGas — Modern Smart LPG Booking & Telemetry",
  description:
    "Next-generation LPG gas cylinder booking platform. Express delivery, automated refills, live GPS tracking, and instant safety inspection records.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased selection:bg-orange-500/20 selection:text-orange-500 min-h-screen flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AuthProvider>
            <ToastProvider>
              {children}
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

