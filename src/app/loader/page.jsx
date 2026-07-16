"use client";

import { useState } from "react";
import Loader from "@/components/loader/Loader"; // adjust the path

export default function LoaderPage() {
    const [done, setDone] = useState(false);

    if (done) {
        return (
            <div className="h-screen flex items-center justify-center bg-black text-white">
                Loader Finished
            </div>
        );
    }

    return <Loader onComplete={() => setDone(true)} />;
}