
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";
import Providers from "./providers";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "DineSpot | Discover, Dine and Reserve",
    template: "%s | DineSpot",
  },
  description:
    "Discover trusted restaurants, explore delicious cuisines and reserve your table through DineSpot.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.variable} font-sans antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />

            <div className="flex-1">{children}</div>

            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;