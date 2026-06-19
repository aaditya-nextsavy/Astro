"use client"
import { useState, useEffect, useRef } from "react";
import Footer from "./Footer"
import Link from "next/link";


const FooterWrapper = () => {


    const floatingNavRef = useRef(null);
    const bottomNavRef = useRef(null);



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








    return (

        <>




            <main className="relative">
                <div>


                    <div
                        ref={floatingNavRef}
                        className="site-floating-navbars"
                    >
                        <div className="astroHeroTopBar">
                            <Link href="/" className="astroHeroBrand">
                                <div className="astroHeroBrandLogo" >
                                    <img src="/assets/icons/home-title-icon.jpg" alt="Astro Acharya Logo" />
                                </div>

                                <div className="astroHeroBrandText">
                                    <span>Vedic Astrologer</span>
                                    <span>Vastu Consultant</span>
                                </div>
                            </Link>

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



                    </div>




                </div>


            </main>

            <div className="contact-page-wrapper">
                <Footer />
            </div>




        </>
    )
}

export default FooterWrapper