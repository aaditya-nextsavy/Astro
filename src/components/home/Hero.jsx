"use client";

import { useState, useEffect, useLayoutEffect } from "react";
import { preload } from "react-dom";
import { preloadDrawerImages } from "@/components/drawer/AcharyaDrawer";
import HeroHeading from "./HeroHeading";

const ACHARYA_DATA = [
    {
        id: "acharya-markand",
        image: "/assets/drawer/aacharya-markand.webp",
        title: "Acharya Markand",
        name: "Acharya Markand",
        description: <>
            <strong> A Computer Engineer </strong>, carrying forward the sacred legacy of Shri Mai Mandir, Aacharya Markand serves as a dedicated custodian of traditional Astrology and Vastu. He views Astrology and Vastu Shastra as the sacred science of aligning human intention with the natural rhythms of the universe. Drawing upon a heritage enriched by global outreach and selfless devotion, he helps individuals, families, and businesses transform their living and working spaces into reservoirs of vital energy. His guidance offers a grounded bridge between profound Vedic geometry and the strategic demands of modern life.
        </>,
        highlight: `Focused on clarity in relationships, career direction, and timing-based decisions using Dashas and planetary transits.`,
        link: "/contact"
    },
    {
        id: "acharya-shandilya",
        image: "/assets/drawer/aacharya-shandilya.webp",
        title: "Acharya Shandilya",
        name: "Acharya Shandilya",
        role: "Vastu & Spiritual Guidance Expert",
        description:
            <>
                Rooted in the century-old spiritual tradition of his forebears, Aacharya Shandilya, having <strong> International Business Management Degree from Canada</strong>, embodies the timeless principle of Loka-Kalyan—universal welfare—in contemporary life. He unites deep ancestral intuition with rigorous analytical clarity, decoding planetary placements not as mere fatalism, but as a roadmap for the soul. His practice transforms ancient Shastric wisdom into actionable, logical remedies that dissolve karmic friction. Through uncompromising spiritual integrity, he guides individuals toward clarity, purpose, and inner equilibrium in an increasingly complex modern world.</>
        , highlight:
            `Helps harmonize living spaces and life decisions through ancient Vastu principles and energetic balancing.`,
        link: "/contact"
    }
];


export default function HomeHero({ onOpenAcharya, onOpenDivineTime }) {

    // Drawer photos: high-priority <link rel="preload"> in the page head (runs during SSR),
    // then marked as loaded for the session so the drawer skips its loader
    ACHARYA_DATA.forEach(({ image }) => preload(image, { as: "image", fetchPriority: "high" }));

    useEffect(() => {
        preloadDrawerImages(ACHARYA_DATA.map(({ image }) => image));
    }, []);

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
                <HeroHeading
                    className="astroHeroMainHeading"
                    lines={["Unlock The Cosmic Pathway", "To Your Inner Harmony"]}
                />

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

                    <button type="button" onClick={onOpenDivineTime} className="astroHeroTimeBlock">
                        <svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
                            <circle cx="12.3535" cy="2.5" r="2.5" fill="currentColor" />
                        </svg>
                        Today’s Panchang <svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
                            <circle cx="12.3535" cy="2.5" r="2.5" fill="currentColor" />
                        </svg>
                    </button>
                </div>
            </div>


        </section>
    );
}