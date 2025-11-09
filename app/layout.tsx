import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../providers/theme-provider";
import { ClerkProvider } from "@clerk/nextjs";
import { ClientNavbar } from "@/components";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zeep: Connect, Learn & Converse in the Metaverse",
  description:
    "Dive into Zeep, a vibrant metaverse application where you can connect, create, and explore immersive virtual worlds. Experience the future of digital interaction.",
  creator: "Raj Mane",
  icons: "/logo-light-1.png", // Favicon/app icon
  keywords: ["Zeep", "metaverse", "virtual world", "social app", "VR", "AR"], // Keywords for SEO
  authors: [{ name: "Raj Mane", url: "https://rajmane.dev" }],
  openGraph: {
    // Open Graph for social media sharing
    title: "Zeep - Immerse Yourself in the Metaverse",
    description:
      "Connect, create, and explore in Zeep, the next-generation metaverse application.",
    url: "https://zeep.rajmane.dev",
    siteName: "Zeep",
    images: [
      {
        url: "https://www.zeep.com/og-image.jpg", // A visually appealing image for social shares
        width: 1200,
        height: 630,
        alt: "Zeep Metaverse Application",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    // Twitter Card for Twitter sharing
    card: "summary_large_image",
    title: "Zeep - Your Gateway to the Metaverse",
    description: "Experience virtual worlds and social connection with Zeep.",
    creator: "@rajmane84",
    images: ["https://www.zeep.com/twitter-image.jpg"], // Image for Twitter card
  },
  applicationName: "Zeep",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.className} antialiased`}>
          <ThemeProvider>
            <ClientNavbar />
            <div className="mt-16 h-[calc(100vh-64px)]">{children}</div>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
