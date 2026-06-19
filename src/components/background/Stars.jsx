"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Stars() {
    const [stars, setStars] = useState([]);
    const starsRef = useRef([]);

    useEffect(() => {
        const generatedStars = Array.from(
            { length: 18 },
            (_, i) => ({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 100,
                size: Math.random() * 1.5 + 0.5,
                glow: Math.random() * 20 + 10,
                duration: Math.random() * 4 + 6,
                delay: Math.random() * 5,
                opacity: Math.random() * 0.5 + 0.5, // 0.5 - 1
            })
        );

        setStars(generatedStars);
    }, []);

    useEffect(() => {
        if (!stars.length) return;

        starsRef.current.forEach((starEl, index) => {
            if (!starEl) return;

            const baseOpacity = Math.random() * 0.4 + 0.6;

            gsap.fromTo(
                starEl,
                {
                    opacity: 0,
                    scale: 0.8,
                },
                {
                    opacity: baseOpacity,
                    scale: 1,
                    duration: 1.5,
                    delay: Math.random() * 2,
                    ease: "power2.out",
                    onComplete: () => {
                        gsap.to(starEl, {
                            opacity: baseOpacity * (Math.random() * 0.4 + 0.3),
                            duration: Math.random() * 2 + 1,
                            repeat: -1,
                            yoyo: true,
                            ease: "sine.inOut",
                        });
                    },
                }
            );
        });
    }, [stars]);

    return (
        <div className="background-stars">
            {stars.map((star, index) => (
                <div
                    key={star.id}
                    ref={(el) => (starsRef.current[index] = el)}
                    className="star"
                    style={{
                        left: `${star.left}%`,
                        top: `${star.top}%`,
                        "--size": star.size,
                        "--glow": `${star.glow}px`,
                    }}
                >
                    <img
                        src="./assets/background/star.svg"
                        alt=""
                        draggable={false}
                    />
                </div>
            ))}
        </div>
    );
}