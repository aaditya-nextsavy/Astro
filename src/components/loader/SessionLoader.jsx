"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";
import { setAppReady } from "@/lib/appReady";


export default function SessionLoader() {
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");

        if (!hasSeenLoader) {
            setLoading(true);
        } else {
            // Loader skipped this session
            setAppReady(true);
        }
    }, []);

    const handleComplete = () => {
        sessionStorage.setItem("hasSeenLoader", "true");

        // it's now safe to animate
        setAppReady(true);

        setLoading(false);
    };


    if (!mounted) return null;

    return (
        <div
            className={`fixed inset-0 z-[9999] transition-opacity duration-1000 ${loading
                ? "opacity-100"
                : "pointer-events-none opacity-0"
                }`}
        >
            {loading && <Loader onComplete={handleComplete} />}
        </div>
    );
}