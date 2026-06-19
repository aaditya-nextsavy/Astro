"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

import { LOADER_QUOTES } from "./loaderData";

export default function LoaderQuotes({ isComplete }) {
    const [index, setIndex] = useState(0);

    const quoteRef = useRef(null);

    useEffect(() => {
        if (isComplete) return;

        const interval = setInterval(() => {
            const tl = gsap.timeline();

            tl.to(quoteRef.current, {
                opacity: 0,
                y: -8,
                duration: 1,
                ease: "power2.inOut",
            })
                .call(() => {
                    setIndex(
                        (prev) => (prev + 1) % LOADER_QUOTES.length
                    );

                    gsap.set(quoteRef.current, {
                        y: 8,
                    });
                })
                .to(quoteRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power2.inOut",
                });
        }, 3000);

        return () => clearInterval(interval);
    }, [isComplete]);

    return (
        <p
            ref={quoteRef}
            className="loader-quote"
        >
            {LOADER_QUOTES[index]}
        </p>
    );
}