"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";

export default function GlobalLoader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loaded = sessionStorage.getItem("site-loaded");

        if (!loaded) {
            setLoading(true);
        }
    }, []);

    const handleComplete = () => {
        sessionStorage.setItem("site-loaded", "true");
        setLoading(false);
    };

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-[9999]">
            <Loader onComplete={handleComplete} />
        </div>
    );
}