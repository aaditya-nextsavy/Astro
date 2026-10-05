import "./globals.css";
import SmoothScroll from "@/components/shared/SmoothScroll";
import SiteCursor from "@/components/shared/SiteCursor";
import PageTransition from "@/components/shared/PageTransition";
import HeaderScrollState from "@/components/shared/HeaderScrollState";
import GlobalBackground from "@/components/background/GlobalBackground";
import { newYork, satoshi } from "./fonts";
import SessionLoader from "@/components/loader/SessionLoader";
import Providers from "./providers";
import { preload } from "react-dom";

export const metadata = {
  title: "Unlock The Cosmic Pathway To Your Inner Harmony",
  description:
    "Unlock the cosmic pathway to your inner harmony. Discover ancient wisdom, spiritual guidance, and transformative experiences designed to help you find balance, clarity, and personal growth.",
  icons: {
    icon: "/assets/favicons/favicon.ico",
    shortcut: "/assets/favicons/favicon.ico",
    apple: "/assets/favicons/apple-touch-icon.png",
  },
  manifest: "/assets/favicons/site.webmanifest",
  keywords: [
    "inner harmony",
    "spiritual journey",
    "cosmic pathway",
    "wellness",
    "meditation",
    "mindfulness",
    "personal growth",
    "spiritual healing",
    "ancient wisdom",
  ],
  openGraph: {
    title: "Unlock The Cosmic Pathway To Your Inner Harmony",
    description:
      "Discover ancient wisdom, spiritual guidance, and transformative experiences to help you achieve inner harmony and personal growth.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Unlock The Cosmic Pathway To Your Inner Harmony",
    description:
      "Discover ancient wisdom, spiritual guidance, and transformative experiences to help you achieve inner harmony and personal growth.",
  },
};


// First-screen art: the loader and the live site both open on these, so fetch them
// alongside the HTML instead of waiting for the JS to request them
const PRELOAD_IMAGES = [
  "/assets/background/cloud1.webp",
  "/assets/background/cloud2.svg",
  "/assets/background/cloud3.webp",
  "/assets/background/cloud4.webp",
  "/assets/background/cloud5.webp",
  "/assets/background/star.svg",
  "/assets/loader/zodiac.svg",
  "/assets/loader/noise.svg",
];



export default function RootLayout({ children }) {
  PRELOAD_IMAGES.forEach((href) =>
    preload(href, { as: "image", fetchPriority: "high" })
  );

  return (
    <html
      lang="en"
      className={`${newYork.variable} ${satoshi.variable}`}
    >
      <body className="min-h-full flex flex-col">

        <GlobalBackground />
        <SmoothScroll />
        <HeaderScrollState />
        <SessionLoader />
        <Providers>
          {children}
        </Providers>
        <PageTransition />
        <SiteCursor />
      </body>
    </html>
  );
}
