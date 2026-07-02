import HomePageWrapper from "@/components/home/HomePageWrapper";

export const metadata = {
  title: "Unlock The Cosmic Pathway To Your Inner Harmony",
  description:
    "Unlock the cosmic pathway to your inner harmony. Discover ancient wisdom, spiritual guidance, and transformative experiences designed to help you find balance, clarity, and personal growth.",
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

export default function Home() {
  return (
    <HomePageWrapper />
  );
}
