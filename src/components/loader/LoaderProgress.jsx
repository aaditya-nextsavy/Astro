"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export default function LoaderProgress({ progress }) {
    const fillRef = useRef(null);

    useEffect(() => {
        if (progress <= 0) return;

        gsap.to(fillRef.current, {
            width: `${progress}%`,
            duration: 1.5,
            ease: "power2.out",
            overwrite: true,
        });
    }, [progress]);

    return (
        <div className="loader-progress">
            <span
                ref={fillRef}
                className="loader-progress-fill"
            />
        </div>
    );
}