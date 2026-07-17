"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";

export default function LoaderCenter({
    progress,
    onReady,
}) {
    const wheelRef = useRef(null);
    const [imageLoaded, setImageLoaded] = useState(false);

    useEffect(() => {
        gsap.to(wheelRef.current, {
            rotate: 360,
            duration: 100,
            ease: "none",
            repeat: -1,
        });
    }, []);

    const handleLoad = () => {
        setImageLoaded(true);
        onReady?.();
    };

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
                    priority
                    onLoad={handleLoad}
                />
            </div>

            {imageLoaded && (
                <div className="loader-percent">
                    {progress}
                    <span className="loader-span-percent">%</span>
                </div>
            )}
        </div>
    );
}