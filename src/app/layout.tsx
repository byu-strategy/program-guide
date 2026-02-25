import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ContentArea from "@/components/layout/ContentArea";

export const metadata: Metadata = {
  title: {
    default: "BYU Strategy Program Guide",
    template: "%s | BYU Strategy",
  },
  description:
    "Strategic Management Program Guide for BYU Marriott School of Business. Learn about curriculum, career tracks, placement data, and more.",
  openGraph: {
    title: "BYU Strategy Program Guide",
    description:
      "Strategic Management Program Guide for BYU Marriott School of Business.",
    images: ["/images/strat-logo.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/strat-logo.png"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/images/strategy-centered-blue-grey-square.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        <ContentArea>{children}</ContentArea>
        <Footer />
      </body>
    </html>
  );
}
