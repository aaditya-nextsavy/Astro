"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import { subscribeAppReady } from "@/lib/appReady";
import { usePathname } from "next/navigation";
export default function HomeSearchParams({ ready = false } = {}) {
    // const searchParams = useSearchParams();
    const pathname = usePathname();


    useEffect(() => {
        if (pathname !== "/") return;

        const id = window.location.hash.replace("#", "");

        if (!id) return;

        const unsubscribe = subscribeAppReady((appReady) => {
            if (!appReady || !ready) return;



            requestAnimationFrame(() => {
                ScrollTrigger.refresh(true);

                setTimeout(() => {
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

        return unsubscribe;
    }, [pathname, ready]);


    return null;
}
