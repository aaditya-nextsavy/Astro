"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";

export default function HomeSearchParams() {
    const searchParams = useSearchParams();

    useEffect(() => {
        const id = searchParams.get("scroll");

        if (!id) return;

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();

            const el = document.getElementById(id);

            if (el) {
                window.lenis?.scrollTo(el, {
                    offset: -60,
                    duration: 3,
                    easing: (t) =>
                        t < 0.5
                            ? 8 * t * t * t * t
                            : 1 - Math.pow(-2 * t + 2, 4) / 2,
                });
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchParams]);

    return null;
}