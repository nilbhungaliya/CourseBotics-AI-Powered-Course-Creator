import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ClerkLoaded, ClerkProvider, GoogleOneTap } from "@clerk/nextjs";
import { Header } from "./_components/Header";

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI-Powered Course Creator",
  description:
    "AI-Powered Course Creator is an innovative platform that enables users to effortlessly design and build educational courses using artificial intelligence. By providing details such as the course title, duration, number of chapters, and whether video content is required, the platform generates a comprehensive course outline along with suggested YouTube videos tailored to each chapter.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <GoogleOneTap />
        <body className={inter.className}>
          <ClerkLoaded>{children}</ClerkLoaded>
        </body>
      </ClerkProvider>
    </html>
  );
}