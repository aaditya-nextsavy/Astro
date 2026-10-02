"use client";

import { useEffect, useState } from "react";
import { gsap } from "@/lib/gsap";

import LoaderCenter from "./LoaderCenter";
import LoaderQuotes from "./LoaderQuotes";
import LoaderProgress from "./LoaderProgress";
import { useRef } from "react";
import Stars from "../background/Stars";
import Clouds from "../background/Clouds";
export default function Loader({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [loaderReady, setLoaderReady] = useState(false);

    useEffect(() => {
        if (!loaderReady) return;

        let current = 0;
        let timeout;

        const updateProgress = () => {
            setProgress(prev => {
                if (prev >= 100) return 100;

                let increment;

                // calm, unhurried climb: ~5-6.5 s to 100%, then the hold + fade below (~7.5 s total)
                if (prev < 20) {
                    increment = Math.floor(Math.random() * 5) + 3;
                } else if (prev < 50) {
                    increment = Math.floor(Math.random() * 4) + 3;
                } else if (prev < 80) {
                    increment = Math.floor(Math.random() * 4) + 2;
                } else if (prev < 95) {
                    increment = Math.floor(Math.random() * 2) + 2;
                } else {
                    increment = 1;
                }

                current = Math.min(prev + increment, 100);
                return current;
            });

            if (current < 100) {
                const nextDelay =
                    current < 60
                        ? Math.random() * 120 + 80
                        : Math.random() * 180 + 110;

                timeout = setTimeout(updateProgress, nextDelay);
            }
        };

        timeout = setTimeout(updateProgress, 100);

        return () => clearTimeout(timeout);
    }, [loaderReady]);

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
                <div className="loader-noise" />
                <LoaderCenter
                    progress={progress}
                    onReady={() => setLoaderReady(true)}
                />

                <div className="loader-bottom">
                    <LoaderQuotes isComplete={progress >= 100} />

                    <LoaderProgress progress={progress} />



                </div>
            </div>

        </div>
    );
}
