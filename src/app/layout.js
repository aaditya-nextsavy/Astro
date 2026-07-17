import "./globals.css";
import SmoothScroll from "@/components/shared/SmoothScroll";
import GlobalBackground from "@/components/background/GlobalBackground";
import { newYork, satoshi } from "./fonts";
import SessionLoader from "@/components/loader/SessionLoader";
import Providers from "./providers";

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


<head>
  <link
    rel="preload"
    href="/assets/background/cloud1.png"
    as="image"
  />

  <link
    rel="preload"
    href="/assets/background/cloud2.svg"
    as="image"
  />

  <link
    rel="preload"
    href="/assets/background/cloud3.png"
    as="image"
  />

  <link
    rel="preload"
    href="/assets/background/cloud4.svg"
    as="image"
  />


  <link
    rel="preload"
    href="/assets/background/cloud5.png"
    as="image"
  />

  <link
    rel="preload"
    href="/assets/home/card-noise.png"
    as="image"
  />

  <link
    rel="preload"
    href="/assets/loader/zodiac.svg"
    as="image"
  />

  <link
    rel="preload"
    href="/assets/loader/noise-bg.png"
    as="image"
  />



</head>



export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${newYork.variable} ${satoshi.variable}`}
    >
      <body className="min-h-full flex flex-col">

        <GlobalBackground />
        <SmoothScroll />
        <SessionLoader />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
