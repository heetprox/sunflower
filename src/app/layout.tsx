import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css"
import { ViewTransitions } from "next-view-transitions";
import { SmoothScrollProvider } from "./SmoothScrollProvider";

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
            {children}
          </body>
        </SmoothScrollProvider>
      </html>
    </ViewTransitions>
  );
}
