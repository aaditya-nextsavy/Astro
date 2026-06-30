"use client";
import { useEffect, useState } from "react";


const ACHARYA_DATA = [
    {
        id: "acharya-markand",
        image: "/assets/drawer/DRAWER-TEMP.png",
        title: "Vedic Astrology Specialist",
        name: "Acharya Markand",
        description:
            `Acharya Markand is known for deep expertise in predictive astrology, horoscope decoding, and karmic pattern analysis. His approach blends classical Vedic principles with practical life guidance.`,
        highlight:
            `Focused on clarity in relationships, career direction, and timing-based decisions using Dashas and planetary transits.`,
        link: "/contact"
    },
    {
        id: "acharya-shandilya",
        image: "/assets/drawer/DRAWER-TEMP.png",
        title: "Vedic Astrology Specialist",
        name: "Acharya Shandilya",
        role: "Vastu & Spiritual Guidance Expert",
        description:
            `Acharya Shandilya specializes in Vastu correction, energy alignment, and spiritual counseling for home and business spaces.`,
        highlight:
            `Helps harmonize living spaces and life decisions through ancient Vastu principles and energetic balancing.`,
        link: "/contact"
    }
];


export default function HomeHero({ onOpenAcharya }) {





    return (


        <section className="astroHeroWrapper">
            {/* Top Header */}
            {/* <div className="astroHeroTopBar">
                <div className="astroHeroBrand">
                    <div className="astroHeroBrandLogo" >
                        <img src="/assets/icons/home-title-icon.jpg" alt="Astro Acharya Logo" />
                    </div>

                    <div className="astroHeroBrandText">
                        <span>Vedic Astrologer</span>
                        <span>Vastu Consultant</span>
                    </div>
                </div>

                <div className="astroHeroCenterLogo">
                    Astro Acharya
                    <span className="astroHeroTrademark">©</span>
                </div>

                <div className="astroHeroActions">
                    <button className="astroHeroMenuButton">
                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="2.5" r="2.5" fill="#D0E3F1" />
                            <circle cx="2.94141" cy="12.5" r="2.5" fill="#D0E3F1" />
                            <circle cx="12.5" cy="2.5" r="2.5" fill="#D0E3F1" />
                            <circle cx="12.7949" cy="12.5" r="2.5" fill="#D0E3F1" />
                        </svg>

                    </button>

                    <button className="astroHeroContactButton">
                        Get In Touch
                    </button>
                </div>
            </div> */}

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
            </div>

            {/* Bottom Navigation Area */}
            {/* <div className="astroHeroBottomSection">
                <div className="astroHeroTimeBlock">
                    <svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2.5" cy="2.5" r="2.5" fill="#D0E3F1" />
                        <circle cx="12.3535" cy="2.5" r="2.5" fill="#D0E3F1" />
                    </svg>
                    <span>
                        ( IST {time} )
                    </span>
                    <svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2.5" cy="2.5" r="2.5" fill="#D0E3F1" />
                        <circle cx="12.3535" cy="2.5" r="2.5" fill="#D0E3F1" />
                    </svg>

                </div>

                <nav className="astroHeroNavigation">

                    <div>
                        <svg width="5" height="15" viewBox="0 0 5 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="12.3535" r="2.5" transform="rotate(-90 2.5 12.3535)" fill="#D0E3F1" />
                            <circle cx="2.5" cy="2.5" r="2.5" transform="rotate(-90 2.5 2.5)" fill="#D0E3F1" />
                        </svg>

                    </div>
                    <a href="#">About</a>
                    <a href="#">Services</a>
                    <a href="#">Gallery</a>
                    <a href="#">Rudraks</a>
                    <a href="#">Contact</a>

                    <div>
                        <svg width="5" height="15" viewBox="0 0 5 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="12.3535" r="2.5" transform="rotate(-90 2.5 12.3535)" fill="#D0E3F1" />
                            <circle cx="2.5" cy="2.5" r="2.5" transform="rotate(-90 2.5 2.5)" fill="#D0E3F1" />
                        </svg>

                    </div>
                </nav>

                <a href="#" target="_blank" className="astroHeroTimeBlock">
                    <svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2.5" cy="2.5" r="2.5" fill="#D0E3F1" />
                        <circle cx="12.3535" cy="2.5" r="2.5" fill="#D0E3F1" />
                    </svg>
                    Divine Time <svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2.5" cy="2.5" r="2.5" fill="#D0E3F1" />
                        <circle cx="12.3535" cy="2.5" r="2.5" fill="#D0E3F1" />
                    </svg>

                </a>
            </div> */}
        </section>
    );
}