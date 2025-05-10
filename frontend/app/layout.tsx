import { HeroUIProvider } from "@heroui/react";
import type { Metadata } from "next";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Firegroup test case",
  description: "Firegroup test case",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <HeroUIProvider>
          <div className="container pt-4">
            <main>{children}</main>
          </div>
        </HeroUIProvider>
      </body>
    </html>
  );
}
