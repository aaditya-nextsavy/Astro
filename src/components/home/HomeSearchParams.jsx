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
                    duration: 1.5,
                });
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchParams]);

    return null;
}