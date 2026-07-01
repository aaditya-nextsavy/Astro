"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { subscribeAppReady } from "@/lib/appReady";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const sectionData = [
    {
        id: 1,
        label: "Why Us",
        title: "What Makes Us Your Trusted Spiritual Partners?",
        image: "/assets/home/why-us.png",
    },
    {
        id: 2,
        subTitle: "A Marriage of Tradition & Modernity",
        description:
            "Aacharya Markand’s background in computer engineering lends precision to spiritual analysis, while Aacharya Shandilya’s expertise in international business brings a global perspective to their counsel. Together, they balance the ancient with the contemporary.",
        image: "/assets/home/who-are-we-1.png",
    },
    {
        id: 3,
        subTitle: "A Heritage of Sacred Knowledge",
        description:
            "Born into a lineage of spiritual luminaries, their teachings are steeped in the eternal truths passed down by their grandfather, a towering figure of faith and wisdom.",
        image: "/assets/home/who-are-we-2.png",
    },
    {
        id: 4,
        subTitle: "Solutions Designed for You",
        description:
            "Life is as unique as the stars above. Their consultations are personalized, offering practical remedies tailored to your individual journey—whether a simple Vastu adjustment, an intricate astrological insight, or compassionate spiritual counselling.",
        image: "/assets/home/main-image-1.png",
    },
];

export default function WhyUs() {



    const [activeImage, setActiveImage] = useState(1);
    const blocksRef = useRef([]);



   useLayoutEffect(() => {
    let ctx;
    let observer;
    let trigger;

    const unsubscribe = subscribeAppReady((ready) => {
        if (!ready || ctx) return;

        ctx = gsap.context(() => {
            const blocks = gsap.utils.toArray(".why-us-content-block");

            // ----------------------------
            // Reveal Animation
            // ----------------------------
            observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        const block = entry.target;

                        const elements = block.querySelectorAll(
                            ".why-us-label, .why-us-title, .why-us-subtitle, .why-us-description"
                        );

                        if (entry.isIntersecting) {
                            gsap.to(elements, {
                                y: 0,
                                duration: 0.6,
                                ease: "power2.out",
                                stagger: 0.05,
                            });
                        }
                    });
                },
                {
                    threshold: 0.3,
                }
            );

            blocks.forEach((block) => observer.observe(block));

            // ----------------------------
            // Text Parallax
            // ----------------------------
            blocks.forEach((block) => {
                const elements = block.querySelectorAll(
                    ".why-us-label, .why-us-title, .why-us-subtitle, .why-us-description"
                );

                elements.forEach((el, i) => {
                    gsap.to(el, {
                        y: (i + 1) * -15,
                        ease: "none",
                        scrollTrigger: {
                            trigger: block,
                            start: "top bottom",
                            end: "bottom top",
                            scrub: true,
                        },
                    });
                });
            });

            // ----------------------------
            // Active Image
            // ----------------------------
            const updateActiveBlock = () => {
                const viewportCenter = window.innerHeight * 0.5;

                let activeId = 1;

                blocksRef.current
                    .filter(Boolean)
                    .forEach((block) => {
                        const rect = block.getBoundingClientRect();

                        if (rect.top <= viewportCenter) {
                            activeId = Number(block.dataset.id);
                        }
                    });

                setActiveImage(activeId);
            };

            trigger = ScrollTrigger.create({
                trigger: ".why-us-section",
                start: "top top",
                end: "bottom bottom",
                onUpdate: updateActiveBlock,
            });

            updateActiveBlock();
        });
    });

    return () => {
        observer?.disconnect();
        trigger?.kill();
        unsubscribe();
        ctx?.revert();
    };
}, []);



    return (
        <section className="why-us-section">

            <div className="why-us-layout">

                {/* Sticky Image Side */}

                <div className="why-us-sticky-side">

                    <div className="why-us-image-stack">

                        {sectionData.map((item) => (
                            <img
                                key={item.id}
                                src={item.image}
                                alt={item.title}
                                className={`why-us-image ${activeImage === item.id ? "active" : ""
                                    }`}
                            />
                        ))}

                    </div>

                </div>

                {/* Scroll Content Side */}

                <div className="why-us-content-side">

                    {sectionData.map((item) => (
                        <div
                            key={item.id}
                            data-id={item.id}
                            className="why-us-content-block"
                            ref={(el) => (blocksRef.current[item.id] = el)}
                        >
                            <div
                                className={`why-us-content-inner ${activeImage === item.id ? "active" : ""
                                    }`}
                            >

                                {item.label && (
                                    <span className="why-us-label">

                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.22144 7.7823C12.0908 11.6517 15.0076 15.0086 15.0076 15.0086C15.0076 15.0086 11.651 12.0913 7.78156 8.22215C3.91217 4.35276 0.995117 0.996094 0.995117 0.996094C0.995117 0.996094 4.35205 3.91316 8.22144 7.7823Z" fill="#17374F" />
                                            <path d="M8.22143 8.22291C4.3518 12.0923 0.995117 15.0089 0.995117 15.0089C0.995117 15.0089 3.91192 11.6524 7.78156 7.7828C11.6512 3.91341 15.0079 0.996094 15.0079 0.996094C15.0079 0.996094 12.0913 4.35327 8.22143 8.22291Z" fill="#17374F" />
                                            <path d="M7.99651 8.25113C3.57824 8.19125 -0.00249363 8.03083 1.303e-06 7.89161C0.00149826 7.75314 3.58474 7.68927 8.00352 7.7489C12.4218 7.80878 16.0025 7.96945 16 8.10817C15.998 8.24689 12.4148 8.31076 7.99651 8.25113Z" fill="#17374F" />
                                            <path d="M8.25112 8.00349C8.311 3.58521 8.24664 0.00174751 8.10792 1.05557e-06C7.96945 -0.00224438 7.80903 3.57822 7.74915 7.9965C7.68903 12.4148 7.75313 15.9982 7.89159 16.0002C8.03056 16.002 8.19174 12.4215 8.25112 8.00349Z" fill="#17374F" />
                                            <path d="M7.93568 8.16103C5.08547 7.01536 2.8036 6.01415 2.83928 5.92433C2.87546 5.83526 5.21495 6.69151 8.06591 7.83694C10.9169 8.98261 13.198 9.98383 13.1628 10.0731C13.1266 10.1625 10.7866 9.3062 7.93568 8.16103Z" fill="#17374F" />
                                            <path d="M8.16177 8.0669C9.30719 5.21669 10.1632 2.87643 10.0739 2.84026C9.98455 2.80458 8.98309 5.08619 7.83742 7.9369C6.69174 10.7874 5.83625 13.1274 5.92531 13.1635C6.01463 13.1995 7.0156 10.9176 8.16177 8.0669Z" fill="#17374F" />
                                            <path d="M8.05735 8.16504C5.15649 9.17698 2.77933 9.92397 2.7474 9.83266C2.71546 9.74159 5.04171 8.84691 7.94232 7.83546C10.8434 6.82327 13.2204 6.07703 13.2523 6.1676C13.2837 6.25867 10.958 7.15309 8.05735 8.16504Z" fill="#17374F" />
                                            <path d="M8.16561 7.94137C7.15391 5.04051 6.25947 2.71473 6.16866 2.74641C6.07759 2.77835 6.82381 5.15578 7.83626 8.05614C8.8482 10.9567 9.74188 13.2828 9.8337 13.2513C9.92426 13.2191 9.17755 10.8422 8.16561 7.94137Z" fill="#17374F" />
                                            <path d="M10.1485 10.1535C8.96365 11.3384 7.03506 11.3384 5.84997 10.153C4.66463 8.96793 4.66464 7.03936 5.84973 5.85452C7.03457 4.66943 8.96316 4.66967 10.1482 5.85476C11.3333 7.0401 11.3333 8.96843 10.1485 10.1535ZM5.91085 5.91589C4.75944 7.0673 4.75919 8.94099 5.91085 10.0922C7.06201 11.2438 8.93569 11.2436 10.0868 10.0922C11.2383 8.94074 11.2385 7.0673 10.0868 5.91589C8.93569 4.76448 7.06226 4.76472 5.91085 5.91589Z" fill="#17374F" />
                                        </svg>

                                        {item.label}


                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8.22144 7.7823C12.0908 11.6517 15.0076 15.0086 15.0076 15.0086C15.0076 15.0086 11.651 12.0913 7.78156 8.22215C3.91217 4.35276 0.995117 0.996094 0.995117 0.996094C0.995117 0.996094 4.35205 3.91316 8.22144 7.7823Z" fill="#17374F" />
                                            <path d="M8.22143 8.22291C4.3518 12.0923 0.995117 15.0089 0.995117 15.0089C0.995117 15.0089 3.91192 11.6524 7.78156 7.7828C11.6512 3.91341 15.0079 0.996094 15.0079 0.996094C15.0079 0.996094 12.0913 4.35327 8.22143 8.22291Z" fill="#17374F" />
                                            <path d="M7.99651 8.25113C3.57824 8.19125 -0.00249363 8.03083 1.303e-06 7.89161C0.00149826 7.75314 3.58474 7.68927 8.00352 7.7489C12.4218 7.80878 16.0025 7.96945 16 8.10817C15.998 8.24689 12.4148 8.31076 7.99651 8.25113Z" fill="#17374F" />
                                            <path d="M8.25112 8.00349C8.311 3.58521 8.24664 0.00174751 8.10792 1.05557e-06C7.96945 -0.00224438 7.80903 3.57822 7.74915 7.9965C7.68903 12.4148 7.75313 15.9982 7.89159 16.0002C8.03056 16.002 8.19174 12.4215 8.25112 8.00349Z" fill="#17374F" />
                                            <path d="M7.93568 8.16103C5.08547 7.01536 2.8036 6.01415 2.83928 5.92433C2.87546 5.83526 5.21495 6.69151 8.06591 7.83694C10.9169 8.98261 13.198 9.98383 13.1628 10.0731C13.1266 10.1625 10.7866 9.3062 7.93568 8.16103Z" fill="#17374F" />
                                            <path d="M8.16177 8.0669C9.30719 5.21669 10.1632 2.87643 10.0739 2.84026C9.98455 2.80458 8.98309 5.08619 7.83742 7.9369C6.69174 10.7874 5.83625 13.1274 5.92531 13.1635C6.01463 13.1995 7.0156 10.9176 8.16177 8.0669Z" fill="#17374F" />
                                            <path d="M8.05735 8.16504C5.15649 9.17698 2.77933 9.92397 2.7474 9.83266C2.71546 9.74159 5.04171 8.84691 7.94232 7.83546C10.8434 6.82327 13.2204 6.07703 13.2523 6.1676C13.2837 6.25867 10.958 7.15309 8.05735 8.16504Z" fill="#17374F" />
                                            <path d="M8.16561 7.94137C7.15391 5.04051 6.25947 2.71473 6.16866 2.74641C6.07759 2.77835 6.82381 5.15578 7.83626 8.05614C8.8482 10.9567 9.74188 13.2828 9.8337 13.2513C9.92426 13.2191 9.17755 10.8422 8.16561 7.94137Z" fill="#17374F" />
                                            <path d="M10.1485 10.1535C8.96365 11.3384 7.03506 11.3384 5.84997 10.153C4.66463 8.96793 4.66464 7.03936 5.84973 5.85452C7.03457 4.66943 8.96316 4.66967 10.1482 5.85476C11.3333 7.0401 11.3333 8.96843 10.1485 10.1535ZM5.91085 5.91589C4.75944 7.0673 4.75919 8.94099 5.91085 10.0922C7.06201 11.2438 8.93569 11.2436 10.0868 10.0922C11.2383 8.94074 11.2385 7.0673 10.0868 5.91589C8.93569 4.76448 7.06226 4.76472 5.91085 5.91589Z" fill="#17374F" />
                                        </svg>

                                    </span>
                                )}

                                <h2 className="why-us-title">
                                    {item?.title}
                                </h2>

                                {
                                    item?.subTitle && (
                                        <h3 className="why-us-subtitle">
                                            {item?.subTitle}
                                        </h3>
                                    )
                                }


                                <p className="why-us-description">
                                    {item.description}
                                </p>

                            </div>
                        </div>
                    ))}

                </div>

            </div>

        </section>
    );
}