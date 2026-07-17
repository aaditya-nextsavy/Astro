"use client";

import Link from "next/link";
import { useState, useEffect, useLayoutEffect } from "react";

const ACHARYA_DATA = [
    {
        id: "acharya-markand",
        image: "/assets/drawer/drawer-temp.png",
        title: "Acharya Markand",
        name: "Acharya Markand",
        description:
            `Clarity in the Chaos Whether you are navigating a complex career transition or seeking harmony in a partnership, we provide data-driven spiritual insights. We analyze "Guna Milan" with overall Chart Analysis of couple for relationships and "Dashas" for career timing to ensure you are moving with the cosmic tide, not against it.`,
        highlight:
            `Focused on clarity in relationships, career direction, and timing-based decisions using Dashas and planetary transits.`,
        link: "/contact"
    },
    {
        id: "acharya-shandilya",
        image: "/assets/drawer/drawer-temp.png",
        title: "Acharya Shandilya",
        name: "Acharya Shandilya",
        role: "Vastu & Spiritual Guidance Expert",
        description:
            `Clarity in the Chaos Whether you are navigating a complex career transition or seeking harmony in a partnership, we provide data-driven spiritual insights. We analyze "Guna Milan" with overall Chart Analysis of couple for relationships and "Dashas" for career timing to ensure you are moving with the cosmic tide, not against it.`,
        highlight:
            `Helps harmonize living spaces and life decisions through ancient Vastu principles and energetic balancing.`,
        link: "/contact"
    }
];


export default function HomeHero({ onOpenAcharya }) {


    const [time, setTime] = useState("");
    useEffect(() => {
        const updateTime = () => {
            const formatted = new Intl.DateTimeFormat(
                "en-IN",
                {
                    timeZone: "Asia/Kolkata",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                }
            ).format(new Date());
            setTime(formatted);
        };
        updateTime();
        const interval = setInterval(
            updateTime,
            1000
        );
        return () =>
            clearInterval(interval);
    }, []);




    useLayoutEffect(() => {
        console.log(
            "HomeHero  mounted",
            document.body.scrollHeight
        );
    }, []);



    return (


        <section className="astroHeroWrapper">


            {/* Hero Content */}
            <div className="astroHeroContentArea">
                <h1 className="astroHeroMainHeading">
                    Unlock The Cosmic Pathway
                    <br />
                    To Your Inner Harmony
                </h1>

                <div className="astroHeroSubLine">
                    <span className="astroHeroDivider left" />
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 0L6.8061 5.1939L12 6L6.8061 6.8061L6 12L5.1939 6.8061L0 6L5.1939 5.1939L6 0Z" fill="#D0E3F1" />
                    </svg>

                    <p>Guided by the Light of</p>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 0L6.8061 5.1939L12 6L6.8061 6.8061L6 12L5.1939 6.8061L0 6L5.1939 5.1939L6 0Z" fill="#D0E3F1" />

                    </svg>
                    <span className="astroHeroDivider right" />
                </div>

                <div className="astroHeroAcharyaLinks">
                    <button onClick={() => onOpenAcharya(ACHARYA_DATA[0])}>
                        Acharya Markand
                    </button>

                    <div className="astroHeroCenterIcon">
                        <img src="/assets/icons/Hero-Mantra.svg" alt="Center Icon" />
                    </div>

                    <button onClick={() => onOpenAcharya(ACHARYA_DATA[1])}>
                        Acharya Shandilya
                    </button>

                </div>


                <div
                    className="astroHeroBottomSection showmobile">
                    <div className="astroHeroTimeBlock">
                        <svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
                            <circle cx="12.3535" cy="2.5" r="2.5" fill="currentColor" />
                        </svg>
                        <span>
                            ( IST {time} )
                        </span>
                        <svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
                            <circle cx="12.3535" cy="2.5" r="2.5" fill="currentColor" />
                        </svg>
                    </div>

                    <Link href="#" target="_blank" className="astroHeroTimeBlock">
                        <svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
                            <circle cx="12.3535" cy="2.5" r="2.5" fill="currentColor" />
                        </svg>
                        Divine Time <svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
                            <circle cx="12.3535" cy="2.5" r="2.5" fill="currentColor" />
                        </svg>
                    </Link>
                </div>
            </div>


        </section>
    );
}