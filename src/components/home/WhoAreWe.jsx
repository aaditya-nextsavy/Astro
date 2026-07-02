"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { subscribeAppReady } from "@/lib/appReady";

const whoWeAreData = [
    {
        id: 1,
        label: "Who We Are",
        title: "A Tale of Spiritual Legacy and Divine Guidance",
        paragraphs: [
            `In a small town blessed by the sacred vibrations of Shri Mai Mandir in Nadiad, a lineage of wisdom began, nurtured by the blessings of the revered H.H. 1008 Shri Bhagwati Keshavbhai Maharaj. This legacy, carried forward with grace and devotion by his grandsons, Acharya Markand and Acharya Shandilya, is now a beacon of hope for those seeking balance and purpose in life.`,
            `With hearts rooted in ancient traditions and minds enlightened by modern knowledge, these spiritual guides have woven a unique fabric of Vastu and astrology.`,
        ],
        buttonText: "More About Us",
        image: "/assets/home/who-are-we-1.png",
        imagePosition: "left",
        theme: "dark",
    },
    {
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
    },
];

function WhoAreWePanel({ item, index }) {
    const panelRef = useRef(null);

    useLayoutEffect(() => {
        if (!panelRef.current) return;

        let ctx;

        const unsubscribe = subscribeAppReady((ready) => {
            if (!ready || ctx) return;

            ctx = gsap.context(() => {
                const panel = panelRef.current;

                const image = panel.querySelector(".who-we-are-image");
                const label = panel.querySelector(".who-we-are-label");
                const title = panel.querySelector(".who-we-are-title");
                const descriptions = panel.querySelectorAll(".who-we-are-description");
                const buttons = panel.querySelector(".who-we-are-buttons-wrapper");

                gsap.set(image, {
                    opacity: 0.95,
                    yPercent: 10,
                    scale: 1.1,
                    transformOrigin: "center center",
                });

                gsap.set([label, title, ...descriptions, buttons], {
                    opacity: 0,
                    y: 30,
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: panel,
                        start: "top 92%",
                        end: "top 55%",
                        toggleActions: "play none none reverse",
                    },
                });


                tl.to(image, {
                    yPercent: 0,
                    scale: 1,
                    ease: "none",
                    duration: 1,
                })

                    // text animation (stagger fade-in)
                    .fromTo(
                        label,
                        {
                            opacity: 0,
                            y: 24,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.45,
                            ease: "power3.out",
                        },
                        "-=0.55"
                    )

                    .fromTo(
                        title,
                        {
                            opacity: 0,
                            y: 24,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.55,
                            ease: "power3.out",
                        },
                        "-=0.35"
                    )

                    .fromTo(
                        descriptions,
                        {
                            opacity: 0,
                            y: 24,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.55,
                            stagger: 0.06,
                            ease: "power3.out",
                        },
                        "-=0.30"
                    )

                    .fromTo(
                        buttons,
                        {
                            opacity: 0,
                            y: 24,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.45,
                            ease: "power3.out",
                        },
                        "-=0.25"
                    );

            }, panelRef);
        });

        return () => {
            unsubscribe();
            ctx?.revert();
        };
    }, []);
    return (
        <article
            ref={panelRef}
            className={`who-we-are-panel ${item.imagePosition === "right" ? "who-we-are-panel--reverse" : ""
                }`}
            data-index={index}
        >
            <div className="who-we-are-panel__sticky">
                <div
                    className={`who-we-are-layout ${item.imagePosition === "right" ? "reverse" : ""
                        }`}
                >
                    <div className="who-we-are-image-wrapper">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="who-we-are-image"
                        />
                    </div>

                    <div className="who-we-are-content">
                        <span className="who-we-are-label">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.22144 7.78132C12.0908 11.6507 15.0076 15.0077 15.0076 15.0077C15.0076 15.0077 11.651 12.0903 7.78156 8.22118C3.91217 4.35179 0.995117 0.995117 0.995117 0.995117C0.995117 0.995117 4.35205 3.91218 8.22144 7.78132Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M8.22143 8.22194C4.3518 12.0913 0.995117 15.0079 0.995117 15.0079C0.995117 15.0079 3.91192 11.6515 7.78156 7.78182C11.6512 3.91243 15.0079 0.995117 15.0079 0.995117C15.0079 0.995117 12.0913 4.3523 8.22143 8.22194Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M7.99651 8.25113C3.57824 8.19125 -0.00249363 8.03083 1.303e-06 7.89161C0.00149826 7.75314 3.58474 7.68927 8.00352 7.7489C12.4218 7.80878 16.0025 7.96945 16 8.10817C15.998 8.24689 12.4148 8.31076 7.99651 8.25113Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M8.25112 8.00349C8.311 3.58521 8.24664 0.00174751 8.10792 1.05557e-06C7.96945 -0.00224438 7.80903 3.57822 7.74915 7.9965C7.68903 12.4148 7.75313 15.9982 7.89159 16.0002C8.03056 16.002 8.19174 12.4215 8.25112 8.00349Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M7.93568 8.16201C5.08547 7.01633 2.8036 6.01513 2.83928 5.92531C2.87546 5.83624 5.21495 6.69249 8.06591 7.83791C10.9169 8.98359 13.198 9.9848 13.1628 10.0741C13.1266 10.1634 10.7866 9.30718 7.93568 8.16201Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M8.16177 8.06592C9.30719 5.21571 10.1632 2.87546 10.0739 2.83928C9.98455 2.8036 8.98309 5.08521 7.83742 7.93592C6.69174 10.7864 5.83625 13.1264 5.92531 13.1626C6.01463 13.1985 7.0156 10.9166 8.16177 8.06592Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M8.05735 8.16601C5.15649 9.17796 2.77933 9.92495 2.7474 9.83363C2.71546 9.74257 5.04171 8.84788 7.94232 7.83644C10.8434 6.82424 13.2204 6.07801 13.2523 6.16858C13.2837 6.25964 10.958 7.15407 8.05735 8.16601Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M8.16561 7.94234C7.15391 5.04149 6.25947 2.7157 6.16866 2.74739C6.07759 2.77933 6.82381 5.15676 7.83626 8.05711C8.8482 10.9577 9.74188 13.2837 9.8337 13.2523C9.92426 13.2201 9.17755 10.8432 8.16561 7.94234Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M10.1485 10.1521C8.96365 11.3369 7.03506 11.3369 5.84997 10.1516C4.66463 8.96646 4.66464 7.0379 5.84973 5.85305C7.03457 4.66796 8.96316 4.6682 10.1482 5.8533C11.3333 7.03864 11.3333 8.96697 10.1485 10.1521ZM5.91085 5.91442C4.75944 7.06583 4.75919 8.93953 5.91085 10.0907C7.06201 11.2424 8.93569 11.2421 10.0868 10.0907C11.2383 8.93928 11.2385 7.06583 10.0868 5.91442C8.93569 4.76301 7.06226 4.76326 5.91085 5.91442Z"
                                    fill="#D0E3F1"
                                />
                            </svg>
                            {item.label}
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8.22144 7.78132C12.0908 11.6507 15.0076 15.0077 15.0076 15.0077C15.0076 15.0077 11.651 12.0903 7.78156 8.22118C3.91217 4.35179 0.995117 0.995117 0.995117 0.995117C0.995117 0.995117 4.35205 3.91218 8.22144 7.78132Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M8.22143 8.22194C4.3518 12.0913 0.995117 15.0079 0.995117 15.0079C0.995117 15.0079 3.91192 11.6515 7.78156 7.78182C11.6512 3.91243 15.0079 0.995117 15.0079 0.995117C15.0079 0.995117 12.0913 4.3523 8.22143 8.22194Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M7.99651 8.25113C3.57824 8.19125 -0.00249363 8.03083 1.303e-06 7.89161C0.00149826 7.75314 3.58474 7.68927 8.00352 7.7489C12.4218 7.80878 16.0025 7.96945 16 8.10817C15.998 8.24689 12.4148 8.31076 7.99651 8.25113Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M8.25112 8.00349C8.311 3.58521 8.24664 0.00174751 8.10792 1.05557e-06C7.96945 -0.00224438 7.80903 3.57822 7.74915 7.9965C7.68903 12.4148 7.75313 15.9982 7.89159 16.0002C8.03056 16.002 8.19174 12.4215 8.25112 8.00349Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M7.93568 8.16201C5.08547 7.01633 2.8036 6.01513 2.83928 5.92531C2.87546 5.83624 5.21495 6.69249 8.06591 7.83791C10.9169 8.98359 13.198 9.9848 13.1628 10.0741C13.1266 10.1634 10.7866 9.30718 7.93568 8.16201Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M8.16177 8.06592C9.30719 5.21571 10.1632 2.87546 10.0739 2.83928C9.98455 2.8036 8.98309 5.08521 7.83742 7.93592C6.69174 10.7864 5.83625 13.1264 5.92531 13.1626C6.01463 13.1985 7.0156 10.9166 8.16177 8.06592Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M8.05735 8.16601C5.15649 9.17796 2.77933 9.92495 2.7474 9.83363C2.71546 9.74257 5.04171 8.84788 7.94232 7.83644C10.8434 6.82424 13.2204 6.07801 13.2523 6.16858C13.2837 6.25964 10.958 7.15407 8.05735 8.16601Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M8.16561 7.94234C7.15391 5.04149 6.25947 2.7157 6.16866 2.74739C6.07759 2.77933 6.82381 5.15676 7.83626 8.05711C8.8482 10.9577 9.74188 13.2837 9.8337 13.2523C9.92426 13.2201 9.17755 10.8432 8.16561 7.94234Z"
                                    fill="#D0E3F1"
                                />
                                <path
                                    d="M10.1485 10.1521C8.96365 11.3369 7.03506 11.3369 5.84997 10.1516C4.66463 8.96646 4.66464 7.0379 5.84973 5.85305C7.03457 4.66796 8.96316 4.6682 10.1482 5.8533C11.3333 7.03864 11.3333 8.96697 10.1485 10.1521ZM5.91085 5.91442C4.75944 7.06583 4.75919 8.93953 5.91085 10.0907C7.06201 11.2424 8.93569 11.2421 10.0868 10.0907C11.2383 8.93928 11.2385 7.06583 10.0868 5.91442C8.93569 4.76301 7.06226 4.76326 5.91085 5.91442Z"
                                    fill="#D0E3F1"
                                />
                            </svg>
                        </span>

                        <h2 className="who-we-are-title">{item.title}</h2>

                        {item.paragraphs.map((paragraph, paragraphIndex) => (
                            <p
                                key={paragraphIndex}
                                className="who-we-are-description"
                            >
                                {paragraph}
                            </p>
                        ))}

                        <div className="who-we-are-buttons-wrapper">
                            <button className="who-we-are-button">
                                {item.buttonText}
                            </button>
                            {item?.buttonText2 ? (
                                <button className="who-we-are-button">
                                    {item.buttonText2}
                                </button>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default function WhoAreWe() {
    const sectionReff = useRef(null);

    useLayoutEffect(() => {
        ScrollTrigger.refresh();
    }, []);

    return (
        <section ref={sectionReff} className="who-we-are-section">
            <div className="who-we-are-track">
                {whoWeAreData.map((item, index) => (
                    <WhoAreWePanel key={item.id} item={item} index={index} />
                ))}
            </div>
        </section>
    );
}

export { whoWeAreData };
