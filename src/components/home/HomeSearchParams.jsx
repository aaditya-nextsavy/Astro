"use client";

import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { subscribeAppReady } from "@/lib/appReady";
import { usePathname } from "next/navigation";

// where the home page was when it was last unloaded (for reloads of /#section)
const SCROLL_KEY = "home-scroll-on-unload";

const storage = () => {
    try {
        return window.sessionStorage;
    } catch {
        return null;
    }
};

// Scroll position to restore when this document is a reload of the same home URL, else null.
// Read from storage once per document (the effect below runs more than once while the page boots).
let reloadScroll;
const getReloadScroll = () => {
    if (reloadScroll === undefined) reloadScroll = takeReloadScroll();
    // only for the boot right after the reload, never for later in-app visits to /#section
    return performance.now() < 30000 ? reloadScroll : null;
};

const takeReloadScroll = () => {
    const store = storage();
    const raw = store?.getItem(SCROLL_KEY);
    store?.removeItem(SCROLL_KEY);
    if (!raw) return null;

    const nav = performance.getEntriesByType?.("navigation")?.[0];
    if (nav?.type !== "reload") return null;

    try {
        const saved = JSON.parse(raw);
        // the save must come from the unload right before this document started, on this URL
        const gap = performance.timeOrigin - saved.at;
        if (saved.href !== window.location.href || gap < -1000 || gap > 10000) return null;
        return typeof saved.y === "number" ? saved.y : null;
    } catch {
        return null;
    }
};

export default function HomeSearchParams({ ready = false } = {}) {
    const pathname = usePathname();

    // remember the scroll position when the page is left / reloaded
    useEffect(() => {
        if (pathname !== "/") return;

        const save = () => {
            storage()?.setItem(
                SCROLL_KEY,
                JSON.stringify({ href: window.location.href, y: window.scrollY, at: Date.now() })
            );
        };

        window.addEventListener("pagehide", save);
        return () => window.removeEventListener("pagehide", save);
    }, [pathname]);

    useEffect(() => {
        if (pathname !== "/") return;

        const id = window.location.hash.replace("#", "");

        if (!id) return;

        // refreshing /#section: stay where the visitor was, don't pull them back to the section
        const reloadY = getReloadScroll();

        let frame;
        let timer;

        const unsubscribe = subscribeAppReady((appReady) => {
            if (!appReady || !ready) return;

            frame = requestAnimationFrame(() => {
                ScrollTrigger.refresh(true);

                if (reloadY !== null) {
                    reloadScroll = null; // used up
                    window.lenis?.scrollTo(reloadY, { immediate: true, force: true });
                    window.scrollTo(0, reloadY);
                    return;
                }

                timer = setTimeout(() => {
                    const el = document.getElementById(id);

                    if (!el) return;

                    window.lenis?.scrollTo(el, {
                        offset: -60,
                        duration: 3,
                        easing: (t) =>
                            t < 0.5
                                ? 8 * t * t * t * t
                                : 1 - Math.pow(-2 * t + 2, 4) / 2,
                    });
                }, 1500);
            });
        });

        // leaving the page before the delayed scroll fires must not scroll the next page
        return () => {
            unsubscribe();
            cancelAnimationFrame(frame);
            clearTimeout(timer);
        };
    }, [pathname, ready]);


    return null;
}
