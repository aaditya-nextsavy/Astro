"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Loader from "@/components/loader/Loader";
import AcharyaDrawer from "@/components/drawer/AcharyaDrawer";
import Footer from "@/components/footer/Footer";
import Link from "next/link";
import ServicesListing from "./ServicesListing";
import ServicesHero from "./ServicesHero";


export default function ServicesWrapper() {

    const heroCloudContainerRef = useRef(null);
    const floatingNavRef = useRef(null);
    const bottomNavRef = useRef(null);
    const lastlightSection = useRef(null);
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedService, setSelectedService] = useState(null);
    const [activeServiceIndex, setActiveServiceIndex] = useState(null);

    const handleDrawerClose = () => {
        setDrawerOpen(false);
        setSelectedService(null);
        setActiveServiceIndex(null);
    };


    useLayoutEffect(() => {
        const container = heroCloudContainerRef.current;

        if (!container) return;

        const clouds = container.querySelectorAll(
            ".light-background-cloud"
        );

        const tween = gsap.to(clouds, {
            opacity: 0,
            y: -100,
            ease: "none",
            scrollTrigger: {
                trigger: ".light-background-content",

                start: "top center",

                end: "center center",

                scrub: true,
            },
        });

        return () => {
            tween.scrollTrigger?.kill();
            tween.kill();
        };
    }, []);


    useLayoutEffect(() => {
        const nav = floatingNavRef.current;

        if (!nav) {
            return undefined;
        }

        const lightSections = gsap.utils.toArray(
            ".light-background-zone, .light-background-zone--takeover"
        );

        if (!lightSections.length) {
            return undefined;
        }

        const activeSections = new Set();

        const syncNavTheme = () => {
            nav.classList.toggle(
                "light-section-active",
                activeSections.size > 0
            );
        };

        const triggers = lightSections.map((section) => {
            const isTakeover = section.classList.contains(
                "light-background-zone--takeover"
            );

            return ScrollTrigger.create({
                trigger: section,

                // First light section behaves normally
                start: isTakeover ? "top+=30%" : "top 100%",

                // Keep your existing end position
                // end: "bottom 100%",
                end: isTakeover ? "bottom+=50%" : "bottom+=0%",

                // markers: true,

                onEnter: () => {
                    activeSections.add(section);
                    syncNavTheme();
                },

                onEnterBack: () => {
                    activeSections.add(section);
                    syncNavTheme();
                },

                onLeave: () => {
                    activeSections.delete(section);
                    syncNavTheme();
                },

                onLeaveBack: () => {
                    activeSections.delete(section);
                    syncNavTheme();
                },
            });
        });

        syncNavTheme();

        return () => {
            triggers.forEach((trigger) => trigger.kill());
            activeSections.clear();
        };
    }, []);

    useEffect(() => {
        if (loading) {
            const scrollY = window.scrollY;

            document.body.style.position = "fixed";
            document.body.style.top = `-${scrollY}px`;
            document.body.style.left = "0";
            document.body.style.right = "0";
            document.body.style.width = "100%";
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.position = "";
                document.body.style.top = "";
                document.body.style.left = "";
                document.body.style.right = "";
                document.body.style.width = "";
                document.body.style.overflow = "";

                window.scrollTo(0, scrollY);
            };
        }
    }, [loading]);





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
        if (!lastlightSection.current || !bottomNavRef.current) return;

        const nav = bottomNavRef.current;

        const trigger = ScrollTrigger.create({
            trigger: lastlightSection.current,

            // footer top reaches top of viewport,
            // then wait another 100vh
            start: "top top-=0%",

            onEnter: () => {
                nav.classList.add("hide-bottom-nav");
            },

            onLeaveBack: () => {
                nav.classList.remove("hide-bottom-nav");
            },
        });

        return () => trigger.kill();
    }, []);


    return (


        <>


            <main className="relative min-h-screen">
                <div
                    className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"
                        }`}
                >

                    {/* move to global layout */}

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


                        <div ref={bottomNavRef}
                            className="astroHeroBottomSection">
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

                                <div className="navigation-indicator services">
                                    <div className="blurred-bg">
                                        <svg width="173" height="56" viewBox="0 0 173 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <g filter="url(#filter0_f_41_11276)">
                                                <path d="M123 55C123 55 106.658 55 86.5 55C66.3416 55 50 55 50 55C50 55 66.3416 44 86.5 44C106.658 44 123 55 123 55Z" fill="#C4D6E5" />
                                            </g>
                                            <defs>
                                                <filter id="filter0_f_41_11276" x="0" y="-6" width="173" height="111" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                                    <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                                    <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                                    <feGaussianBlur stdDeviation="25" result="effect1_foregroundBlur_41_11276" />
                                                </filter>
                                            </defs>
                                        </svg>


                                    </div>
                                    <svg width="14" height="7" viewBox="0 0 14 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7.19403 6.80887C10.5797 10.1945 13.1319 13.1318 13.1319 13.1318C13.1319 13.1318 10.1948 10.5792 6.80914 7.19374C3.42348 3.80807 0.871094 0.871033 0.871094 0.871033C0.871094 0.871033 3.80836 3.42342 7.19403 6.80887Z" fill="#D0E3F1" />
                                        <path d="M7.19403 7.1944C3.80814 10.5801 0.871094 13.132 0.871094 13.132C0.871094 13.132 3.42326 10.1952 6.80914 6.80931C10.195 3.42364 13.1321 0.871033 13.1321 0.871033C13.1321 0.871033 10.5801 3.80852 7.19403 7.1944Z" fill="#D0E3F1" />
                                        <path d="M6.99684 7.21973C3.13091 7.16734 -0.00218189 7.02697 1.1401e-06 6.90516C0.00131096 6.784 3.1366 6.72811 7.00297 6.78028C10.8689 6.83268 14.002 6.97327 13.9998 7.09464C13.998 7.21602 10.8628 7.2719 6.99684 7.21973Z" fill="#D0E3F1" />
                                        <path d="M7.21875 7.00294C7.27114 3.13701 7.21483 0.00152905 7.09345 9.23608e-07C6.97229 -0.00196381 6.83192 3.1309 6.77953 6.99683C6.72692 10.8628 6.78301 13.9983 6.90417 14C7.02576 14.0015 7.16679 10.8687 7.21875 7.00294Z" fill="#D0E3F1" />
                                        <path d="M6.94402 7.14142C4.45012 6.13897 2.45352 5.26293 2.48474 5.18434C2.51639 5.10641 4.56341 5.85561 7.05796 6.85784C9.55251 7.86029 11.5485 8.73634 11.5177 8.8145C11.486 8.89265 9.43857 8.14343 6.94402 7.14142Z" fill="#D0E3F1" />
                                        <path d="M7.14213 7.05798C8.14436 4.56408 8.89334 2.51639 8.81519 2.48474C8.73704 2.45352 7.86077 4.4499 6.85832 6.94423C5.85588 9.43834 5.10733 11.4858 5.18526 11.5175C5.26341 11.5489 6.13924 9.55231 7.14213 7.05798Z" fill="#D0E3F1" />
                                        <path d="M7.05072 7.14487C4.51251 8.03031 2.43252 8.68391 2.40458 8.60401C2.37664 8.52433 4.41208 7.7415 6.95007 6.8565C9.4885 5.97084 11.5683 5.31789 11.5962 5.39714C11.6237 5.47682 9.58871 6.25943 7.05072 7.14487Z" fill="#D0E3F1" />
                                        <path d="M7.14451 6.95009C6.25929 4.41188 5.47667 2.37685 5.39721 2.40458C5.31753 2.43252 5.97046 4.51274 6.85634 7.05052C7.74177 9.58851 8.52373 11.6237 8.60407 11.5962C8.68331 11.5681 8.02995 9.4883 7.14451 6.95009Z" fill="#D0E3F1" />
                                        <path d="M8.87888 8.88292C7.84216 9.91964 6.15468 9.91964 5.11774 8.88248C4.08058 7.84554 4.08058 6.15807 5.11752 5.12135C6.15425 4.08441 7.84173 4.08462 8.87867 5.12156C9.91561 6.15872 9.91561 7.84598 8.87888 8.88292ZM5.17101 5.17504C4.16354 6.18251 4.16332 7.82197 5.17101 8.82923C6.17826 9.83691 7.8177 9.83669 8.82495 8.82923C9.83242 7.82176 9.83264 6.18251 8.82495 5.17504C7.8177 4.16758 6.17848 4.16779 5.17101 5.17504Z" fill="#D0E3F1" />
                                    </svg>

                                </div>

                                <div>
                                    <svg width="5" height="15" viewBox="0 0 5 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2.5" cy="12.3535" r="2.5" transform="rotate(-90 2.5 12.3535)" fill="currentColor" />
                                        <circle cx="2.5" cy="2.5" r="2.5" transform="rotate(-90 2.5 2.5)" fill="currentColor" />
                                    </svg>

                                </div>
                                <a href="/about">About</a>
                                <a href="/services">Services</a>
                                <a href="/gallery">Gallery</a>
                                <a href="/#rudaxSection">Rituals</a>
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

                    <div className="hero-stack-sequence-wrapper">



                        <ServicesHero />



                        {/* 
                        <AcharyaDrawer
                            isOpen={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                        /> */}
                        <div className="light-background-zone">

                            {/* top */}
                            <svg className="light-background-content-top curve-1" width="1926" height="86" viewBox="0 0 1926 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.371094 83.8028C0.371094 83.8028 396.871 7.98401 967.371 2.33315C1537.87 -3.31771 1924.87 64.792 1924.87 64.792" stroke="#F3E9D8" strokeWidth="4" />
                            </svg>


                            <svg className="light-background-content-top curve-2" width="1929" height="228" viewBox="0 0 1929 228" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M969 2.33314C398.5 7.984 2 83.8028 2 83.8028V225.5H1926.5V64.792C1926.5 64.792 1539.5 -3.31772 969 2.33314Z" fill="#F3E9D8" stroke="#F3E9D8" strokeWidth="4" />
                            </svg>


                            {/* bottom */}
                            <svg className="light-background-content-bottom curve-1" width="1926" height="86" viewBox="0 0 1926 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.371094 83.8028C0.371094 83.8028 396.871 7.98401 967.371 2.33315C1537.87 -3.31771 1924.87 64.792 1924.87 64.792" stroke="#F3E9D8" strokeWidth="4" />
                            </svg>


                            <svg className="light-background-content-bottom curve-2" width="1929" height="228" viewBox="0 0 1929 228" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M969 2.33314C398.5 7.984 2 83.8028 2 83.8028V225.5H1926.5V64.792C1926.5 64.792 1539.5 -3.31772 969 2.33314Z" fill="#F3E9D8" stroke="#F3E9D8" strokeWidth="4" />
                            </svg>


                            <div className="light-background-bg">

                                <div className="light-background-overlay" />
                            </div>
                            <div className="light-background-content">

                                <ServicesListing
                                    activeServiceIndex={activeServiceIndex}
                                    setActiveServiceIndex={setActiveServiceIndex}
                                    onOpenAcharya={(service, index) => {
                                        setSelectedService(service);
                                        setActiveServiceIndex(index);
                                        setDrawerOpen(true);
                                    }}
                                />





                            </div>
                        </div>


                    </div>



                    <div className="hero-stack-sequence-wrapper">

                        <div className="hero-stack-sequence-2" >

                        </div>
                    </div>


                </div>

                <div
                    className={`absolute inset-0 z-50 transition-opacity duration-1000 ${loading
                        ? "opacity-100"
                        : "pointer-events-none opacity-0"
                        }`}
                >
                    <Loader
                        onComplete={() => setLoading(false)}
                    />
                </div>
            </main>



            <div ref={lastlightSection} className="footer-takeover-zone service-page">
                <Footer />
            </div>


            <AcharyaDrawer
                isOpen={drawerOpen}
                service={selectedService}
                onClose={handleDrawerClose}
                isLight={true}
            />


        </>

    );
}
