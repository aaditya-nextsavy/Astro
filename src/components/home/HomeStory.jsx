"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const homeStoryData = {



    id: 2,
    label: "Our Vision",
    title: "Guiding Souls Towards Harmony and Success",
    paragraphs: [
        `Every home, workplace, and journey carries a unique energy. Our mission is to help individuals understand and align with these energies. Through Vastu Shastra, Astrology, and Numerology, we provide practical guidance rooted in timeless wisdom.`,
        `Our vision is not merely to predict outcomes but to empower people with clarity, confidence, and spiritual balance.`,
    ],
    buttonText: "View More Details",
    buttonText2: "Contact",
    image: "/assets/home/who-are-we-2.png",
    imagePosition: "right",
    theme: "dark",

};

export default function HomeStory() {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const section = sectionRef.current;

        if (!section) return;

        const ctx = gsap.context(() => {
            const image = section.querySelector(".home-story-image");
            const label = section.querySelector(".home-story-label");
            const title = section.querySelector(".home-story-title");
            const descriptions = section.querySelectorAll(".home-story-description");
            const buttons = section.querySelector(".home-story-buttons");

            gsap.set(image, {
                scale: 1.1,
                yPercent: 10,
            });

            gsap.set(
                [label, title, ...descriptions, buttons],
                {
                    opacity: 0,
                    y: 60,
                }
            );

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: section,
                    start: "top top",
                    end: "+=180%",
                    scrub: true,
                    invalidateOnRefresh: true,
                },
            });

            tl.to(image, {
                scale: 1,
                yPercent: 0,
                duration: 1,
                ease: "none",
            })
                .to(
                    label,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                    },
                    0.1
                )
                .to(
                    title,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.6,
                    },
                    0.25
                )
                .to(
                    descriptions,
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.2,
                        duration: 0.6,
                    },
                    0.45
                )
                .to(
                    buttons,
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4,
                    },
                    0.9
                );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="home-story-section"
        >
            <div className="home-story-sticky">
                <div className="home-story-layout">

                    <div className="home-story-content">
                        <span className="home-story-label">
                            {homeStoryData.label}
                        </span>

                        <h2 className="home-story-title">
                            {homeStoryData.title}
                        </h2>

                        {homeStoryData.paragraphs.map((paragraph, index) => (
                            <p
                                key={index}
                                className="home-story-description"
                            >
                                {paragraph}
                            </p>
                        ))}

                        <div className="home-story-buttons">
                            <button className="home-story-button">
                                {homeStoryData.buttonText}
                            </button>

                            <button className="home-story-button">
                                {homeStoryData.buttonText2}
                            </button>
                        </div>
                    </div>

                    <div className="home-story-image-wrapper">
                        <img
                            src={homeStoryData.image}
                            alt={homeStoryData.title}
                            className="home-story-image"
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}