import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "zawa8",
  description: "transliterates souTh asian languages",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body> {children} </body>
    </html>
  );
}
