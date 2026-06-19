"use client";

import { useState, useEffect } from "react";

export default function SiteNav() {
    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            setTime(
                new Intl.DateTimeFormat("en-IN", {
                    timeZone: "Asia/Kolkata",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                }).format(new Date())
            );
        };

        updateTime();

        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="site-floating-navbars">
            {/* TOP BAR */}

            <div className="astroHeroTopBar">
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

                <div className="astroHeroActions ">
                    <a href="/contact" className="astroHeroMenuButton glass-effect-card">
                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
                            <circle cx="2.94141" cy="12.5" r="2.5" fill="currentColor" />
                            <circle cx="12.5" cy="2.5" r="2.5" fill="currentColor" />
                            <circle cx="12.7949" cy="12.5" r="2.5" fill="currentColor" />
                        </svg>

                    </a>

                    <a href="/contact" className="astroHeroContactButton glass-effect-card">
                        Get In Touch
                    </a>
                </div>
            </div>

            {/* BOTTOM BAR */}

            <div className="astroHeroBottomSection">
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

                <nav className="astroHeroNavigation glass-effect-card">

                    <div>
                        <svg width="5" height="15" viewBox="0 0 5 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="12.3535" r="2.5" transform="rotate(-90 2.5 12.3535)" fill="currentColor" />
                            <circle cx="2.5" cy="2.5" r="2.5" transform="rotate(-90 2.5 2.5)" fill="currentColor" />
                        </svg>

                    </div>
                    <a href="#">About</a>
                    <a href="/service">Services</a>
                    <a href="#">Gallery</a>
                    <a href="#">Rituals</a>
                    <a href="/contact">Contact</a>

                    <div>
                        <svg width="5" height="15" viewBox="0 0 5 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="2.5" cy="12.3535" r="2.5" transform="rotate(-90 2.5 12.3535)" fill="currentColor" />
                            <circle cx="2.5" cy="2.5" r="2.5" transform="rotate(-90 2.5 2.5)" fill="currentColor" />
                        </svg>

                    </div>
                </nav>

                <a href="#" target="_blank" className="astroHeroTimeBlock">
                    <svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
                        <circle cx="12.3535" cy="2.5" r="2.5" fill="currentColor" />
                    </svg>
                    Divine Time <svg width="15" height="5" viewBox="0 0 15 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
                        <circle cx="12.3535" cy="2.5" r="2.5" fill="currentColor" />
                    </svg>

                </a>
            </div>

        </div>
    );
}