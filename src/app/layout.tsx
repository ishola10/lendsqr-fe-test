import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "../styles/global.scss";

const workSans = Work_Sans({
  variable: "--font-work-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lendsqr | Admin Dashboard",
  description: "Lendsqr frontend engineering assessment - Admin Dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={workSans.variable}>
        {children}
      </body>
    </html>
  );
}
