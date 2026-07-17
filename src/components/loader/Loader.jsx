"use client";

import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

import LoaderCenter from "./LoaderCenter";
import LoaderQuotes from "./LoaderQuotes";
import LoaderProgress from "./LoaderProgress";
import { useRef } from "react";
import Stars from "../background/Stars";
import Clouds from "../background/Clouds";
import Image from "next/image";
export default function Loader({ onComplete }) {
    const [progress, setProgress] = useState(0);


    useEffect(() => {
        let current = 0;

        const startDelay = setTimeout(() => {

            const updateProgress = () => {

                setProgress(prev => {

                    if (prev >= 100) {
                        return 100;
                    }

                    let increment;

                    if (prev < 20) {
                        increment = Math.floor(Math.random() * 6) + 2;
                    } else if (prev < 50) {
                        increment = Math.floor(Math.random() * 5) + 1;
                    } else if (prev < 80) {
                        increment = Math.floor(Math.random() * 4) + 1;
                    } else if (prev < 95) {
                        increment = Math.floor(Math.random() * 2) + 1;
                    } else {
                        increment = 1;
                    }

                    current = Math.min(prev + increment, 100);

                    return current;
                });

                if (current < 100) {

                    const nextDelay =
                        current < 60
                            ? Math.random() * 250 + 100
                            : Math.random() * 500 + 200;

                    setTimeout(updateProgress, nextDelay);

                }
            };

            updateProgress();

        }, 80);

        return () => clearTimeout(startDelay);

    }, []);

    useEffect(() => {
        if (progress < 100) return;

        const tl = gsap.timeline();

        tl.to(wrapperRef.current, {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
            delay: 0.8,

            onComplete: () => {
                // Let the loader unmount
                onComplete?.();
            },
        });

        return () => tl.kill();
    }, [progress, onComplete]);


    const wrapperRef = useRef(null);




    return (
        <div
            ref={wrapperRef}
            className="loader-wrapper">
            <div className="opacity-30">
                <Clouds />
            </div>

            <Stars />
            <div className="loader">
                <div className="loader-noise">
                    <Image
                        src="/assets/loader/noise-bg.png"
                        alt=""
                        fill
                        priority
                    />
                </div>
                <LoaderCenter progress={progress} />

                <div className="loader-bottom">
                    <LoaderQuotes isComplete={progress >= 100} />

                    <LoaderProgress progress={progress} />



                </div>
            </div>

        </div>
    );
}
