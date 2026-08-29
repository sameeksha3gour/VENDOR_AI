import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VAI Finance",
  description: "Smart Finance and Vendor Management",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}