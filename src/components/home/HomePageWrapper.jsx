"use client";

import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Loader from "@/components/loader/Loader";
import HomeHero from "@/components/home/Hero";
import AcharyaDrawer from "@/components/drawer/AcharyaDrawer";
import ImageZoom from "@/components/home/ImageZoom";
import MainImageInfoSection from "@/components/home/MainImageInfoSection";
import HomeServices from "@/components/home/HomeServices";
import WhoAreWe from "@/components/home/WhoAreWe";
import WhyUs from "@/components/home/WhyUs";
import Footer from "@/components/footer/Footer";
import SliderWithFade from "@/components/home/SliderWithFade";
import ContactCTA from "@/components/home/ContactCTA";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";
import { useSearchParams } from "next/navigation";



export default function HomePageWrapper() {

    const heroCloudContainerRef = useRef(null);
    const floatingNavRef = useRef(null);
    const bottomNavRef = useRef(null);
    const lastlightSection = useRef(null);
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] =
        useState(false);

    const [selectedAcharya, setSelectedAcharya] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const handleOpenAcharya = (data) => {
        setSelectedAcharya(data);
        setDrawerOpen(true);
    };

    const searchParams = useSearchParams();
    useEffect(() => {
        const id = searchParams.get("scroll");


        if (!id) return;

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();

            const el = document.getElementById(id);

            if (el) {
                window.lenis?.scrollTo(el, {
                    offset: -60,
                    duration: 1.5,
                });
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [searchParams]);



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

                // starts fading when middle of content approaches viewport
                start: "top center",

                // completely gone around middle of content
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
                start: isTakeover ? "top+=50%" : "top 55%",

                // Keep your existing end position
                // end: "bottom 100%",
                end: isTakeover ? "bottom+=50%" : "bottom 100%",

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


    useEffect(() => {
        if (!menuOpen) return;

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
    }, [menuOpen]);


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

            // when the section is almost finished
            start: "bottom 0%",
            onEnter: () => {
                nav.classList.add("hide-bottom-nav");
            },

            onLeaveBack: () => {
                nav.classList.remove("hide-bottom-nav");
            },
        });

        return () => trigger.kill();
    }, []);


    useEffect(() => {
        if (!menuOpen) {
            document.body.style.overflow = "";
            return;
        }

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "";
        };
    }, [menuOpen]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                setMenuOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useLayoutEffect(() => {

        requestAnimationFrame(() => {
            ScrollTrigger.refresh();
        });

    }, []);

    return (


        <>


            <main className="relative min-h-screen">
                <div
                    className={`transition-opacity duration-1000 ${loading ? "opacity-0" : "opacity-100"
                        }`}
                >



                    <div className="site-floating-navbars"
                        ref={floatingNavRef}
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

                                <div onClick={() => setMenuOpen(true)} className="astroHeroMenuButton mobile-nav-trigger glass-effect-card">
                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2.5" cy="2.5" r="2.5" fill="currentColor" />
                                        <circle cx="2.94141" cy="12.5" r="2.5" fill="currentColor" />
                                        <circle cx="12.5" cy="2.5" r="2.5" fill="currentColor" />
                                        <circle cx="12.7949" cy="12.5" r="2.5" fill="currentColor" />
                                    </svg>

                                </div>



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

                                <div>
                                    <svg width="5" height="15" viewBox="0 0 5 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <circle cx="2.5" cy="12.3535" r="2.5" transform="rotate(-90 2.5 12.3535)" fill="currentColor" />
                                        <circle cx="2.5" cy="2.5" r="2.5" transform="rotate(-90 2.5 2.5)" fill="currentColor" />
                                    </svg>

                                </div>
                                <a href="/about">About</a>
                                <a href="/services">Services</a>
                                <a href="/gallery">Gallery</a>
                                <Link href="/?scroll=rudaxSection">
                                    Rudraks
                                </Link>
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
                    <div className={`mobile-drawer-menu ${menuOpen ? "open" : ""}`}>

                        <div
                            className="mobile-drawer-menu-backdrop relative"
                            onClick={() => setMenuOpen(false)}
                        />
                        <div className={`acharyaDrawerContent mobile-header-menu  glass-effect-card `}>

                            <div className="acharyaDrawerContent-bg-filter"></div>

                            <Link href=''>
                                <nav>Home</nav>
                                <FaChevronRight />

                            </Link>
                            <Link href='./about'>
                                <nav>About</nav>
                                <FaChevronRight />

                            </Link>
                            <Link href='./services'>
                                <nav>Services</nav>
                                <FaChevronRight />

                            </Link>
                            <Link href='./gallery'>
                                <nav>Gallery</nav>
                                <FaChevronRight />

                            </Link>
                            <Link href='./contact'>
                                <nav>Contact</nav>
                                <FaChevronRight />

                            </Link>





                        </div>

                    </div>

                    <div className="hero-stack-sequence-wrapper">


                        <HomeHero onOpenAcharya={handleOpenAcharya} />


                        <AcharyaDrawer
                            isOpen={drawerOpen}
                            onClose={() => setDrawerOpen(false)}
                            service={selectedAcharya}
                        />


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

                                <ImageZoom />


                                <MainImageInfoSection />


                            </div>

                        </div>



                    </div>



                    {/* <HomeServices /> */}


                    <div className="home-services-wrapper">
                        <HomeServices />
                    </div>






                    <div className="hero-stack-sequence-wrapper">



                        <div className="hero-stack-sequence-2" >


                            <WhoAreWe />

                            {/* <HomeStory /> */}



                        </div>



                        <div className="light-background-zone light-background-zone--takeover min-h-screen" >

                            <svg className="light-background-content-top curve-1" width="1926" height="86" viewBox="0 0 1926 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.371094 83.8028C0.371094 83.8028 396.871 7.98401 967.371 2.33315C1537.87 -3.31771 1924.87 64.792 1924.87 64.792" stroke="#F3E9D8" strokeWidth="4" />
                            </svg>


                            <svg className="light-background-content-top curve-2" width="1929" height="228" viewBox="0 0 1929 228" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M969 2.33314C398.5 7.984 2 83.8028 2 83.8028V225.5H1926.5V64.792C1926.5 64.792 1539.5 -3.31772 969 2.33314Z" fill="#F3E9D8" stroke="#F3E9D8" strokeWidth="4" />
                            </svg>


                            <svg className="light-background-content-bottom curve-1" width="1926" height="86" viewBox="0 0 1926 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0.371094 83.8028C0.371094 83.8028 396.871 7.98401 967.371 2.33315C1537.87 -3.31771 1924.87 64.792 1924.87 64.792" stroke="#F3E9D8" strokeWidth="4" />
                            </svg>


                            <svg className="light-background-content-bottom curve-2" width="1929" height="228" viewBox="0 0 1929 228" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M969 2.33314C398.5 7.984 2 83.8028 2 83.8028V225.5H1926.5V64.792C1926.5 64.792 1539.5 -3.31772 969 2.33314Z" fill="#F3E9D8" stroke="#F3E9D8" strokeWidth="4" />
                            </svg>




                            <div className="light-background-bg">


                                <div className="light-background-overlay" />

                            </div>

                            <div className="light-background-content" >


                                <WhyUs />

                                <SliderWithFade />


                                <ContactCTA />

                            </div>

                        </div>



                    </div>




                </div>
                {/* 
          <div
            className={`absolute inset-0 z-50 transition-opacity duration-1000 ${loading
              ? "opacity-100"
              : "pointer-events-none opacity-0"
              }`}
          >
            <Loader
              onComplete={() => setLoading(false)}
            />
          </div> */}

            </main>



            <div ref={lastlightSection} className="footer-takeover-zone">
                <Footer />
            </div>




        </>

    );
}
