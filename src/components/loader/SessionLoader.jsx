"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";

export default function SessionLoader() {
    const [loading, setLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        const hasSeenLoader = sessionStorage.getItem("hasSeenLoader");

        if (!hasSeenLoader) {
            setLoading(true);
        }
    }, []);

    const handleComplete = () => {
        sessionStorage.setItem("hasSeenLoader", "true");
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