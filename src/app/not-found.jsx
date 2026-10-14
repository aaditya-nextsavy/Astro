import Link from "next/link";
import FloatingNavbar from "@/components/layout/FloatingNavbar";
import HeroHeading from "@/components/home/HeroHeading";

// Home-hero style page: header + IST / Panchang row, big heading, description, two buttons (no footer)
export default function NotFound() {
  return (
    <FloatingNavbar showFooter={false}>
      <main className="astroHeroWrapper not-found-hero">
        <div className="astroHeroContentArea">
          <HeroHeading className="astroHeroMainHeading not-found-hero__code" lines={["404"]} />

          <p className="not-found-hero__text">
            This path isn&apos;t written in the stars. The page you&apos;re looking for may have moved,
            but guidance on astrology, Vastu and Rudraksha is only a step away.
          </p>

          <div className="not-found-hero__actions">
            <Link href="/" className="astroHeroContactButton glass-effect-card">
              Return Home
            </Link>
            <Link href="/contact" className="astroHeroContactButton glass-effect-card">
              Get In Touch
            </Link>
          </div>
        </div>
      </main>
    </FloatingNavbar>
  );
}
