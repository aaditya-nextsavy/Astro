"use client";

import { useEffect } from "react";

// Adds `header-scrolled` to <html> once the page is scrolled away from the top,
// which fades in the blurred band behind the fixed header (.astroHeroTopBar::before).
const THRESHOLD = 24;

export default function HeaderScrollState() {
    useEffect(() => {
        const root = document.documentElement;
        let frame = 0;

        const update = () => {
            frame = 0;
            root.classList.toggle("header-scrolled", window.scrollY > THRESHOLD);
        };

        const onScroll = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
            cancelAnimationFrame(frame);
            root.classList.remove("header-scrolled");
        };
    }, []);

    return null;
}
