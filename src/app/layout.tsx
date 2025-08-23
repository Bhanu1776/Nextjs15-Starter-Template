import { Analytics } from "@vercel/analytics/next";
import { Geist, Geist_Mono } from "next/font/google";
import classNames from "classnames";
import type { Metadata } from "next";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NextJs 15",
  description: "Nextjs 15 starter template",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon.png" />
        <meta name="theme-color" content="#e0c8fd" />

        <meta property="og:title" content="Nextjs App" />
        <meta name="twitter:title" content="Nextjs App" />

        <meta name="description" content="Nextjs 15 starter template" />
        <meta property="og:description" content="Nextjs 15 starter template" />
        <meta name="twitter:description" content="Nextjs 15 starter template" />

        <meta
          property="og:image"
          content="https://ik.imagekit.io/bhanu1776/Nextjs-starter-template/banner"
        />
        <meta
          name="twitter:image"
          content="https://ik.imagekit.io/bhanu1776/Nextjs-starter-template/banner"
        />
      </head>
      {/* //! If you don't want 'screen size' visible at the left bottom of the browser window, You can remove `debug-screens` class */}
      <body
        className={classNames(
          "antialiased",
          geistSans.variable,
          geistMono.variable,
          {
            "debug-screens": process.env.NODE_ENV === "development",
          }
        )}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
