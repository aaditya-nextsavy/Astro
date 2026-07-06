"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/loader/Loader";
import { hasSeenSiteLoader, markSiteLoaderSeen } from "@/lib/loaderState";

export default function GlobalLoader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!hasSeenSiteLoader()) {
            setLoading(true);
        }
    }, []);

    const handleComplete = () => {
        markSiteLoaderSeen();
        setLoading(false);
    };

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-[9999]">
            <Loader onComplete={handleComplete} />
        </div>
    );
}
