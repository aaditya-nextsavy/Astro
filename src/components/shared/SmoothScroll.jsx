"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { subscribeAppReady } from "@/lib/appReady";

export default function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion) {
      return;
    }

    const lenis = new Lenis({
      lerp: 0.06,
      smoothWheel: true,
      smoothTouch: false,
      wheelMultiplier: 0.9,
      touchMultiplier: 1,
    });

    window.lenis = lenis;
    lenis.stop();

    const unsubscribeReady = subscribeAppReady((ready) => {
      if (!ready) return;
      lenis.start();

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh(true);
        });
      });

    });


    const unsubscribe = lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);



    return () => {
      //  Remove the global reference
      delete window.lenis;
      gsap.ticker.remove(update);
      unsubscribe();
      unsubscribeReady();
      lenis.destroy();
    };
  }, []);

  // Lenis outlives route changes and keeps easing toward the old page's scroll target,
  // so a link clicked mid-scroll lands the new page partway down — reset it to the top.
  // Hash links (/#rudrakshaSection) are left to HomeSearchParams.
  useEffect(() => {
    if (window.location.hash) return;

    const toTop = () => {
      window.lenis?.resize();
      window.lenis?.scrollTo(0, { immediate: true, force: true });
      window.scrollTo(0, 0);
    };

    toTop();
    // again after the new page's pins/layout settle
    const frame = requestAnimationFrame(() => {
      toTop();
      ScrollTrigger.refresh();
    });

    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  return null;
}
