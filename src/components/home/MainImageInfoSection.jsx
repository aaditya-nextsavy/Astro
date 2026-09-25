"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { subscribeAppReady } from "@/lib/appReady";
import CustomParallaxImages from "../customParallaxImages/CustomParallaxImages";

const sectionData = [
    {
        id: 1,
        title: "Vastu Shastra",
        subtitle: "The Art of Harmonious Living",
        description: `Every wall, every corner, every space around you is alive with energy. Through Vastu Shastra, we decode these energies to create environments that resonate with positivity and abundance. Their profound understanding of Vastu Shastra transforms homes into sanctuaries of peace and offices into engines of success.`,
        image: "/assets/home/main-image-1.png",
        // layered like Why Us: background + masked subject on top
        parallaxImage: "/assets/home/vastu-1.png",
    },
    {
        id: 2,
        title: "Astrology",
        subtitle: "Mapping the Stars, Guiding Your Destiny",
        description: `The stars have a story to tell—your story. Through meticulous analysis of your birth chart, the Aacharyas illuminate the celestial pathways shaping your life. Their consultations dive deep into your life's purpose, challenges, and opportunities, offering remedies rooted in ancient wisdom yet adaptable to the modern age. From strengthening relationships to unlocking career potential, their insights empower you to embrace your destiny with clarity and confidence.
`,
        image: "/assets/home/main-image-2.png",
    },
];

export default function MainImageInfoSection() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        if (!sectionRef.current) return;

        let ctx;

        const unsubscribe = subscribeAppReady((ready) => {
            if (!ready || ctx) return;

            ctx = gsap.context(() => {
                const rows = gsap.utils.toArray(".info-row");

                rows.forEach((row) => {
                    const image = row.querySelector(".info-image");
                    const content = row.querySelector(".info-content");

                    const title = row.querySelector("h2");
                    const subtitle = row.querySelector("span");
                    const paragraph = row.querySelector("p");

                    // Fade in text
                    gsap.fromTo(
                        [title, subtitle, paragraph],
                        {
                            opacity: 0,
                            y: 80,
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

                    // Initial positions
                    gsap.set(image, { y: 20 });      // Almost no offset
                    gsap.set(content, { y: 180 });   // Start well below

                    // IMAGE → Barely moves
                    gsap.to(image, {
                        y: -20,
                        ease: "none",
                        scrollTrigger: {
                            trigger: row,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    });

                    // CONTENT → Travels a long distance upward
                    gsap.to(content, {
                        y: -180,
                        ease: "none",
                        scrollTrigger: {
                            trigger: row,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    });
                });
            }, sectionRef);
        });

        return () => {
            unsubscribe();
            ctx?.revert();
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
                        {item.parallaxImage ? (
                            // .info-image keeps the existing scroll parallax on this block
                            <div className="info-image info-image-layered">
                                <CustomParallaxImages
                                    images={[item.parallaxImage]}
                                    imageMasks={{ [item.parallaxImage]: "/assets/background/circular-mask.png" }}
                                    activeIndex={0}
                                    showBgMask
                                    bgLight
                                />
                            </div>
                        ) : (
                            <img
                                src={item.image}
                                alt={item.title}
                                className="info-image"
                            />
                        )}
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