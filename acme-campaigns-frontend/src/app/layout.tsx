import "@mantine/core/styles.css";
import "./globals.css";

import type { PropsWithChildren } from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";

import { DefaultLayout } from "~/layouts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campaigns Frontend",
};

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <MantineProvider defaultColorScheme="dark">
          <DefaultLayout>{children}</DefaultLayout>
        </MantineProvider>
      </body>
    </html>
  );
};

export default RootLayout;
