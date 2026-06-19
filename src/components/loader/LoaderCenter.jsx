"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { gsap } from "@/lib/gsap";

export default function LoaderCenter({ progress }) {
    const wheelRef = useRef(null);

    useEffect(() => {
        gsap.to(wheelRef.current, {
            rotate: 360,
            duration: 100,
            ease: "none",
            repeat: -1,
        });
    }, []);

    return (
        <div className="loader-center">

            <div
                ref={wheelRef}
                className="loader-wheel"
            >
                <Image
                    src="/assets/loader/zodiac.svg"
                    alt="Zodiac Wheel"
                    fill
                />
            </div>

            <div className="loader-percent">
                {progress}
                <span className="loader-span-percent">%</span>
            </div>

        </div>
    );
}