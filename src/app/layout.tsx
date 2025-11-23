import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css"
import { ViewTransitions } from "next-view-transitions";
import { SmoothScrollProvider } from "./SmoothScrollProvider";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Sunflower",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en">
        <SmoothScrollProvider>
          <body className="bg-[#131313] text-white scrollbar-none overflow-y-auto">
            <Nav/>
            {children}
          </body>
        </SmoothScrollProvider>
      </html>
    </ViewTransitions>
  );
}
