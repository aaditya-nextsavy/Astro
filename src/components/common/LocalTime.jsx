"use client";

import { useEffect, useState } from "react";

export default function LocalTime({
    className = "astroHeroTimeBlock",
}) {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const formatted = new Intl.DateTimeFormat(undefined, {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }).format(new Date());

            setTime(formatted);
        };

        updateTime();

        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={className}>
            <svg width="15" height="5" viewBox="0 0 15 5" fill="none">
                <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
                <circle cx="12.3535" cy="2.5" r="2.5" fill="currentColor" />
            </svg>

            <span>({time})</span>

            <svg width="15" height="5" viewBox="0 0 15 5" fill="none">
                <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
                <circle cx="12.3535" cy="2.5" r="2.5" fill="currentColor" />
            </svg>
        </div>
    );
}