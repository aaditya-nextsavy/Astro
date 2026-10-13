"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { subscribeAppReady } from "@/lib/appReady";

// Scroll position each page was left at, for browser Back/Forward (lost on a full reload)
const savedScroll = new Map();
const pageKey = () => window.location.pathname + window.location.search;
// how long a page gets to finish its own late layout refresh before the position is re-checked
const RESTORE_SETTLE_MS = 400;

export default function SmoothScroll() {
  const pathname = usePathname();
  // key: page being recorded; frozen: recording paused; popKey: page a Back/Forward is heading to
  const tracking = useRef({ key: null, frozen: true, popKey: null });

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

  // Remember how far each page was scrolled, so browser Back/Forward can return there.
  useEffect(() => {
    const track = tracking.current;

    const onScroll = () => {
      // frozen while a page is being swapped in; body is fixed (scrollY 0) while the mobile menu is open
      if (track.frozen || document.body.style.position === "fixed") return;
      savedScroll.set(track.key, window.scrollY);
    };

    const onPopState = () => {
      const key = pageKey();
      if (key === track.key) return; // only the #hash changed, same page
      track.frozen = true;
      track.popKey = key;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("popstate", onPopState);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("popstate", onPopState);
    };
  }, []);

  // Stop recording before the new page's first scroll event, which would otherwise be
  // saved against it (or, clamped by a shorter page, against the one just left).
  useLayoutEffect(() => {
    tracking.current.frozen = true;
    tracking.current.key = pageKey();

    // Scroll positions are handled here (top on load, saved position on Back/Forward). Left
    // on "auto", the browser also restores its own position on refresh, before the pinned
    // sections exist: the page showed the wrong section (the footer) and then jumped to the top.
    // The setting is kept per history entry, so it is already in force when this page reloads.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, [pathname]);

  // Lenis outlives route changes and keeps easing toward the old page's scroll target,
  // so a link clicked mid-scroll lands the new page partway down — reset it to the top.
  // Arriving by browser Back/Forward goes on to the position the page was left at.
  // Hash links (/#rudrakshaSection) are left to HomeSearchParams.
  useEffect(() => {
    const track = tracking.current;
    const restoreY = track.popKey === track.key ? savedScroll.get(track.key) || 0 : 0;
    track.popKey = null;

    if (window.location.hash) {
      track.frozen = false;
      return;
    }

    const jumpTo = (y) => {
      window.lenis?.resize();
      window.lenis?.scrollTo(y, { immediate: true, force: true });
      window.scrollTo(0, y);
    };

    let timer;

    jumpTo(0);
    // again after the new page's pins/layout settle
    const frame = requestAnimationFrame(() => {
      jumpTo(0);
      ScrollTrigger.refresh();

      if (!restoreY) {
        track.frozen = false;
        return;
      }

      // pins are measured now, so the page has its full height
      jumpTo(restoreY);
      ScrollTrigger.update();

      // the page's own late refresh (fonts, images) can change its height: settle once more
      timer = setTimeout(() => {
        if (Math.abs(window.scrollY - restoreY) > 2) {
          jumpTo(restoreY);
          ScrollTrigger.update();
        }
        track.frozen = false;
      }, RESTORE_SETTLE_MS);
    });

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(timer);
    };
  }, [pathname]);

  return null;
}
