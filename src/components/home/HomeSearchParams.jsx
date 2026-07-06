"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { subscribeAppReady } from "@/lib/appReady";

export default function HomeSearchParams({ ready = false } = {}) {
    const searchParams = useSearchParams();

    useEffect(() => {
        const id = searchParams.get("scroll");

        if (!id) return;

        let raf1 = null;
        let raf2 = null;

        const runScroll = () => {
            raf1 = requestAnimationFrame(() => {
                raf2 = requestAnimationFrame(() => {
                    ScrollTrigger.refresh(true);

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
                });
            });
        };

        const unsubscribe = subscribeAppReady((appReady) => {
            if (!appReady || !ready) return;
            runScroll();
        });

        return () => {
            unsubscribe();
            if (raf1 !== null) {
                cancelAnimationFrame(raf1);
            }
            if (raf2 !== null) {
                cancelAnimationFrame(raf2);
            }
        };
    }, [ready, searchParams]);

    return null;
}
