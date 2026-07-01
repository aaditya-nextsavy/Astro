"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { subscribeAppReady } from "@/lib/appReady";

export default function SmoothScroll() {
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

      let started = false;

      const unsubscribeReady = subscribeAppReady((ready) => {
        if (!ready || started) return;

        started = true;

        lenis.start();

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            ScrollTrigger.refresh(true);
          });
        });
      });

    });


    const unsubscribe = lenis.on("scroll", ScrollTrigger.update);

    const update = (time) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(update);



    return () => {
      // 👇 Remove the global reference
      delete window.lenis;
      gsap.ticker.remove(update);
      unsubscribe();
      unsubscribeReady();
      lenis.destroy();
    };
  }, []);

  return null;
}