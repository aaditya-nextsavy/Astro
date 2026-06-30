"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionData = [
    {
        id: 1,
        title: "Vastu Shastra",
        subtitle: "The Art of Harmonious Living",
        description: `Every wall, every corner, every space around you is alive with energy.
Through Vastu Shastra, we decode these energies to create environments
that resonate with positivity and abundance.

Their profound understanding of Vastu Shastra transforms homes into
sanctuaries of peace and offices into engines of success.`,
        image: "/assets/home/main-image-1.png",
    },
    {
        id: 2,
        title: "Numerology",
        subtitle: "Unlocking Cosmic Patterns",
        description: `Numbers carry vibrations that influence every aspect of life.
By understanding these patterns, you gain clarity, confidence,
and direction in personal and professional journeys.

Discover the hidden language of numbers and align yourself
with opportunities meant for you.`,
        image: "/assets/home/main-image-2.png",
    },
];
export default function MainImageInfoSection() {
    const sectionRef = useRef(null);

    useEffect(() => {
        if (!sectionRef.current) return;

        let ctx;

        const initGSAP = () => {
            ctx = gsap.context(() => {
                const rows = gsap.utils.toArray(".info-row");

                rows.forEach((row, i) => {
                    const image = row.querySelector(".info-image");
                    const content = row.querySelector(".info-content");

                    const title = row.querySelector("h2");
                    const subtitle = row.querySelector("span");
                    const paragraph = row.querySelector("p");

                    // initial state
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: row,
                            start: "top 60%",
                            end: "bottom top",
                            scrub: 0.6, // base smoothness
                        },
                    });
                    gsap.fromTo(
                        [title, subtitle, paragraph],
                        {
                            opacity: 0,
                            y: 40,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.15,
                            ease: "power3.out",
                            scrollTrigger: {
                                trigger: row,
                                start: "top 70%",
                                toggleActions: "play none none reverse",
                            },
                        }
                    );

                    gsap.set(image, {
                        scale: 1,
                        y: 100,
                        rotate: i % 2 === 0 ? -0 : 0,
                    });

                    gsap.set(content, {
                        y: 40,
                    });

                    gsap.to(image, {
                        y: -120,
                        scale: 1,
                        rotate: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: row,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.6,
                        },
                    });

                    gsap.to(content, {
                        y: -200,
                        ease: "none",
                        scrollTrigger: {
                            trigger: row,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 0.6,
                        },
                    });

                    // IMAGE PARALLAX
                    gsap.to(image, {
                        y: -180,
                        scale: 1,
                        rotate: 0,
                        ease: "none",
                        scrollTrigger: {
                            trigger: row,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1,
                        },
                    });


                    gsap.set(image, {
                        scale: 1,
                        y: 60,
                        rotate: i % 2 === 0 ? -0 : 0,
                    });

                    gsap.set(content, {
                        y: 40,
                    });

                    // CONTENT PARALLAX
                    gsap.to(content, {
                        y: -250,
                        ease: "none",
                        opacity: 1,
                        scrollTrigger: {
                            trigger: row,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: 1.2,
                        },
                    });
                });

                ScrollTrigger.refresh();
            }, sectionRef);
        };

        // 🔥 WAIT FOR FULL PAGE LOAD (CRITICAL FIX)
        if (document.readyState === "complete") {
            initGSAP();
        } else {
            window.addEventListener("load", initGSAP);
        }

        return () => {
            window.removeEventListener("load", initGSAP);
            ctx?.revert();
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    return (
        <section ref={sectionRef} className="main-image-info-section">




            {sectionData.map((item, index) => (
                <div
                    key={item.id}
                    className={`info-row ${index % 2 !== 0 ? "info-row-reverse" : ""}`}
                >
                    <div className="info-image-wrapper">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="info-image"
                        />
                    </div>

                    <div className="info-content-wrapper">
                        <div className="info-content">
                            <h2>{item.title}</h2>
                            <span>{item.subtitle}</span>
                            <p>{item.description}</p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}   