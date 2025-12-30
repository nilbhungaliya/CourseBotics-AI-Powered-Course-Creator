import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";
import { Toaster } from "sonner";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "CourseBotics",
  description:
    "CourseBotics is an innovative AI-powered platform that enables users to effortlessly design and build educational courses using artificial intelligence. By providing details such as the course title, duration, number of chapters, and whether video content is required, the platform generates a comprehensive course outline along with suggested YouTube videos tailored to each chapter.",
  icons: {
    icon: [
      { url: "/favicon.svg" }
    ]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider 
            session={session}
            refetchInterval={0} // Disable periodic refetching
            refetchOnWindowFocus={false} // Disable refetch when window gains focus
          >
            {children}
            <Toaster position="top-center" richColors />
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
