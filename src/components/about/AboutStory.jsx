"use client";

import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useRef,
} from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { subscribeAppReady } from "@/lib/appReady";
import Image from "next/image";
import AboutStoryMobile from "./AboutStoryMobile";




export const storyTimeline = [

    {
        year: "1950 - Present",
        sectionTitle: "A Century of Divine Lineage",
        title: "Divine Lineage",
        subtitle: "The Sacred Story of Shri Mai Mandir, Nadiad",
        description:
            "To consult with the current Aacharyas is to step into a century-old tapestry woven by three extraordinary souls. The story of this lineage is a history of spiritual awakening that began in the heart of Gujarat and eventually touched the global stage.",
        image: "/assets/gallery/g-1.png",
        type: "standard",
    },

    {
        year: "1950",
        sectionTitle: "I. The Foundation",
        title: "The Foundation",
        subtitle: "Divine Architect",
        badge: "H.H. 1008 Shri Kanishtha Keshav Maharaj",
        description: `The spiritual geography of Nadiad was forever transformed when H.H. 1008 Shri Kanishtha Keshav Maharaj established the Shri Mai Mandir. He was a visionary who did not merely build a temple; he anchored a divine frequency. Through intense penance (Tapasya) and a deep connection with the Divine Mother, he created a sanctuary where the ancient Vedas could breathe in the modern world.
He serves as the "Root" of this lineage—the one who planted the seeds of Loka-Kalyan (universal welfare) and established the strict standards of Vedic purity that remain the temple’s hallmark to this day.`,
        image: "/assets/gallery/g-1.png",
        type: "standard",
    },

    {
        year: "1980",
        sectionTitle: "II. The Expansion",
        title: "The Expansion",
        subtitle: "Global Voice of the Mother",
        badge: "H.H. 1008 Shri Bhagawati Keshavbhavani Maharaj",
        description: `If the foundation was an act of creation, the next chapter was one of magnificent expansion. H.H. 1008 Shri Bhagawati Keshavbhavani Maharaj was the "Sun" that carried the light of Shri Mai to the world. A legendary spiritual orator, his journey began at the tender age of 16, when he first took the Vyaspeeth to preach the Shrimad Devi Bhagavat Katha.
For nearly seven decades, until the age of 83, his voice resonated across continents, translating esoteric wisdom into a universal language of peace. Beyond his global travels, he was a master of ritual, conducting numerous Yagnas specifically designed for the welfare of humanity and the healing of the world. He brought international recognition to Nadiad, proving that the grace of the Divine Mother knows no borders.
`,
        image: "/assets/gallery/g-2.png",
        type: "standard",
    },

    {
        year: "2003",
        sectionTitle: "III. The Heart",
        title: "The Heart",
        subtitle: "Pillar of Absolute Surrender",
        badge: "Maidharmacharya Shri Vishvesh Bhagawati Keshavbhavani Maharaj",
        description: `While the world looked to the global stage, the internal sanctity of the lineage was guarded by the selfless devotion of Maidharmacharya Shri Vishvesh Bhagawati Keshavbhavani Maharaj. His life stands as a rare testament to the power of Sharanagati—total surrender. As a son and a disciple, he walked step-by-step in the shadow of his Father-Guru, Shri Bhagawati Keshavbhavani Maharaj.
He was the quiet, immovable force that managed the temple's sacred activities and ensured that spiritual knowledge was spread with absolute integrity. Remaining steadfast by his Guru’s side until his very last breath, he became the "Bridge of Purity," ensuring that the wisdom of the ancestors reached the next generation without losing a single drop of its essence.
`,
        image: "/assets/gallery/g-1.png",
        type: "standard",
    },

    {
        year: "Present",
        sectionTitle: "The Living Legacy",
        title: "The Living Legacy",
        description: `Today, this triple-distilled wisdom—the Vision of the Great-Grandfather, the Global Oratory of the Grandfather, and the Selfless Devotion of the Father—culminates in the mission of Aacharya Markand and Aacharya Shandilya.

They do not just practice Astrology and Vastu; they serve as the modern custodians of a 100-year-old spiritual current. In their hands, the ancient Bhrigu Nandi Nadi and the principles of Vastu Shastra are applied with the same purity and power that have defined their family for over a century.

With hearts rooted in ancient traditions and minds enlightened by modern knowledge, these spiritual guides have woven a unique fabric of Vastu and astrology—a blend of timeless wisdom and contemporary understanding. Their journey is not just about predictions and remedies but about empowering lives with the cosmic truth and helping souls align with the universe’s rhythm.
`,
        image: "/assets/gallery/g-2.png",
        type: "legacy",
    },
];

const AboutStory = () => {

    const [activeIndex, setActiveIndex] = useState(0);
    const wrapperRef = useRef(null);
    const current =
        storyTimeline[activeIndex] ??
        storyTimeline[0];
    const [timelineProgress, setTimelineProgress] = useState(0);

    const cloudRef = useRef(null);
    const personRef = useRef(null);

    const contentRef = useRef(null);
    const heartImageFaded = useRef(false);

    const [displayImage, setDisplayImage] = useState(
        storyTimeline[0].image
    );



    const [isDesktop, setIsDesktop] = useState(null);


    useEffect(() => {
        const checkScreen = () => {
            setIsDesktop(window.innerWidth > 1300);
        };

        checkScreen();

        window.addEventListener("resize", checkScreen);

        return () => window.removeEventListener("resize", checkScreen);
    }, []);



    useEffect(() => {

        gsap.set(".about-story-animate-image", {
            opacity: 0,
        });

        gsap.to(".about-story-animate-image", {
            opacity: 1,
            duration: 0.6,
            ease: "power2.out",
        });


        gsap.to(
            ".about-story-animate",

            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.25,
                ease: "power2.out",
            }
        );
    }, [activeIndex]);


    useLayoutEffect(() => {
        if (!isDesktop || !wrapperRef.current) return;

        let ctx;

        const unsubscribe = subscribeAppReady((ready) => {
            if (!ready || ctx) return;

            ctx = gsap.context(() => {
                const totalSteps = storyTimeline.length;
                const heartIndex = totalSteps - 2;

                let previousIndex = -1;

                ScrollTrigger.create({
                    trigger: wrapperRef.current,
                    start: "top top",
                    end: `+=${totalSteps * 100}%`,
                    pin: true,
                    scrub: true,

                    onUpdate: (self) => {
                        const segmentSize = 1 / totalSteps;

                        const start =
                            heartIndex * segmentSize +
                            segmentSize * 0.5;

                        const end =
                            (heartIndex + 1) * segmentSize;

                        const moveProgress = gsap.utils.clamp(
                            0,
                            1,
                            (self.progress - start) /
                            (end - start)
                        );

                        gsap.set(cloudRef.current, {
                            xPercent: -100 * moveProgress,
                        });

                        setTimelineProgress(self.progress);

                        const index = Math.min(
                            totalSteps - 1,
                            Math.floor(
                                self.progress *
                                (totalSteps - 0.001)
                            )
                        );

                        const segmentStart =
                            index * segmentSize;

                        const segmentEnd =
                            (index + 1) * segmentSize;

                        const segmentProgress =
                            gsap.utils.clamp(
                                0,
                                1,
                                (self.progress - segmentStart) /
                                (segmentEnd - segmentStart)
                            );

                        /* CONTENT FADE */

                        if (index === heartIndex) {
                            const fadeProgress =
                                gsap.utils.clamp(
                                    0,
                                    1,
                                    (segmentProgress - 0.35) / 0.25
                                );

                            gsap.set(contentRef.current, {
                                opacity: 1 - fadeProgress,
                            });
                        } else if (index < heartIndex) {
                            gsap.set(contentRef.current, {
                                opacity: 1,
                            });
                        }

                        /* IMAGE FADE (trigger based) */

                        if (
                            index === heartIndex &&
                            segmentProgress >= 0.5 &&
                            !heartImageFaded.current
                        ) {
                            heartImageFaded.current = true;

                            gsap.to(personRef.current, {
                                opacity: 0,
                                duration: 0.6,
                                ease: "power2.out",
                                overwrite: true,
                            });
                        }

                        if (
                            index < heartIndex &&
                            heartImageFaded.current
                        ) {
                            heartImageFaded.current = false;

                            gsap.to(personRef.current, {
                                opacity: 1,
                                duration: 0.6,
                                ease: "power2.out",
                                overwrite: true,
                            });
                        }

                        if (index !== previousIndex) {
                            previousIndex = index;
                            setActiveIndex(index);
                        }
                    },
                });

                requestAnimationFrame(() => {
                    gsap.fromTo(
                        ".about-story-animate",
                        {
                            opacity: 0,
                            y: 30,
                        },
                        {
                            opacity: 1,
                            y: 0,
                            duration: 0.8,
                            stagger: 0.25,
                            ease: "power2.out",
                        }
                    );

                    gsap.fromTo(
                        ".about-story-animate-image",
                        {
                            opacity: 0,
                        },
                        {
                            opacity: 1,
                            duration: 0.6,
                            ease: "power2.out",
                        }
                    );
                });
            }, wrapperRef);
        });

        return () => {
            unsubscribe();
            ctx?.revert();
        };
    }, [isDesktop]);

    

    if (isDesktop === null) {
        return (
            <div className="about-story-loader">
                <div className="loader-ring">
                    <div className="loader-ring-inner"></div>
                </div>
            </div>
        );
    }

    if (!isDesktop) {
        return <AboutStoryMobile storyTimeline={storyTimeline} />;
    }

    else
        return (



            <div ref={wrapperRef} className="about-story-wrapper" style={{
                height: `${storyTimeline.length + 1 * 100}vh`,
            }} >


                <div className="about-story-sticky">



                    <div
                        ref={cloudRef}
                        className="about-story-floating-cloud"
                    >
                        <Image
                            src="/assets/background/masked-cloud-bg.png"
                            alt="clouds"
                            fill
                        />


                        <Image

                            ref={personRef}
                            key={current.image}
                            src={current.image}
                            alt={current.title}
                            fill
                            className="about-story-person about-story-animate-image"
                        />

                    </div>




                    <div
                        className={`about-story-grid ${current.type === "legacy"
                            ? "about-story-grid--legacy"
                            : ""
                            }`}
                    >

                        {/* LEFT */}
                        <div ref={contentRef} key={current.year} className="about-story-content">

                            <div className="about-story-main-heading">
                                {
                                    activeIndex === 0 ? (
                                        <h1 className="about-story-animate">{storyTimeline[0].sectionTitle}</h1>
                                    ) : (
                                        <h2 className="about-story-animate">{storyTimeline[activeIndex].sectionTitle}</h2>
                                    )
                                }
                            </div>

                            <div className="about-story-copy">

                                {
                                    current?.badge && (
                                        <span className="about-story-animate about-story-badge glass-effect-card">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.3336 11.6743C18.1377 17.4784 22.5129 22.5138 22.5129 22.5138C22.5129 22.5138 17.4779 18.1378 11.6738 12.3341C5.86973 6.52997 1.49414 1.49496 1.49414 1.49496C1.49414 1.49496 6.52953 5.87056 12.3336 11.6743Z" fill="#D0E3F1" />
                                                <path d="M12.3336 12.3352C6.52916 18.1393 1.49414 22.5141 1.49414 22.5141C1.49414 22.5141 5.86935 17.4795 11.6738 11.675C17.4783 5.87094 22.5133 1.49496 22.5133 1.49496C22.5133 1.49496 18.1385 6.53074 12.3336 12.3352Z" fill="#D0E3F1" />
                                                <path d="M11.9948 12.3761C5.36736 12.2863 -0.00374044 12.0457 1.95449e-06 11.8369C0.00224739 11.6292 5.37712 11.5334 12.0053 11.6228C18.6327 11.7126 24.0037 11.9536 24 12.1617C23.997 12.3698 18.6222 12.4656 11.9948 12.3761Z" fill="#D0E3F1" />
                                                <path d="M12.3767 12.0054C12.4665 5.37803 12.37 0.00283488 12.1619 0.000215206C11.9542 -0.00315295 11.7135 5.36755 11.6237 11.995C11.5335 18.6224 11.6297 23.9976 11.8374 24.0006C12.0458 24.0032 12.2876 18.6325 12.3767 12.0054Z" fill="#D0E3F1" />
                                                <path d="M11.905 12.2426C7.62967 10.5241 4.20687 9.02229 4.26038 8.88757C4.31465 8.75396 7.82389 10.0383 12.1003 11.7565C16.3768 13.475 19.7984 14.9768 19.7456 15.1108C19.6914 15.2448 16.1814 13.9604 11.905 12.2426Z" fill="#D0E3F1" />
                                                <path d="M12.2412 12.1012C13.9593 7.82592 15.2433 4.31553 15.1093 4.26127C14.9754 4.20775 13.4732 7.63017 11.7547 11.9062C10.0361 16.1819 8.7529 19.6919 8.88651 19.7462C9.02049 19.8001 10.5219 16.3773 12.2412 12.1012Z" fill="#D0E3F1" />
                                                <path d="M12.0846 12.2475C7.73327 13.7654 4.16753 14.8859 4.11963 14.7489C4.07173 14.6123 7.5611 13.2703 11.912 11.7531C16.2637 10.2348 19.8291 9.11546 19.877 9.25131C19.9241 9.38791 16.4355 10.7295 12.0846 12.2475Z" fill="#D0E3F1" />
                                                <path d="M12.2469 11.9129C10.7294 7.56165 9.38774 4.07298 9.25152 4.12051C9.11492 4.16841 10.2343 7.73456 11.7529 12.0851C13.2708 16.436 14.6114 19.925 14.7491 19.8779C14.8849 19.8296 13.7649 16.2642 12.2469 11.9129Z" fill="#D0E3F1" />
                                                <path d="M15.2227 15.2299C13.4455 17.0072 10.5526 17.0072 8.77496 15.2292C6.99695 13.4516 6.99695 10.5587 8.77459 8.78144C10.5519 7.0038 13.4447 7.00417 15.2224 8.78181C17 10.5598 17 13.4523 15.2227 15.2299ZM8.86628 8.87349C7.13916 10.6006 7.13879 13.4112 8.86628 15.1379C10.593 16.8654 13.4035 16.865 15.1303 15.1379C16.8574 13.4108 16.8578 10.6006 15.1303 8.87349C13.4035 7.14638 10.5934 7.14675 8.86628 8.87349Z" fill="#D0E3F1" />
                                            </svg>


                                            {current.badge}

                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M12.3336 11.6743C18.1377 17.4784 22.5129 22.5138 22.5129 22.5138C22.5129 22.5138 17.4779 18.1378 11.6738 12.3341C5.86973 6.52997 1.49414 1.49496 1.49414 1.49496C1.49414 1.49496 6.52953 5.87056 12.3336 11.6743Z" fill="#D0E3F1" />
                                                <path d="M12.3336 12.3352C6.52916 18.1393 1.49414 22.5141 1.49414 22.5141C1.49414 22.5141 5.86935 17.4795 11.6738 11.675C17.4783 5.87094 22.5133 1.49496 22.5133 1.49496C22.5133 1.49496 18.1385 6.53074 12.3336 12.3352Z" fill="#D0E3F1" />
                                                <path d="M11.9948 12.3761C5.36736 12.2863 -0.00374044 12.0457 1.95449e-06 11.8369C0.00224739 11.6292 5.37712 11.5334 12.0053 11.6228C18.6327 11.7126 24.0037 11.9536 24 12.1617C23.997 12.3698 18.6222 12.4656 11.9948 12.3761Z" fill="#D0E3F1" />
                                                <path d="M12.3767 12.0054C12.4665 5.37803 12.37 0.00283488 12.1619 0.000215206C11.9542 -0.00315295 11.7135 5.36755 11.6237 11.995C11.5335 18.6224 11.6297 23.9976 11.8374 24.0006C12.0458 24.0032 12.2876 18.6325 12.3767 12.0054Z" fill="#D0E3F1" />
                                                <path d="M11.905 12.2426C7.62967 10.5241 4.20687 9.02229 4.26038 8.88757C4.31465 8.75396 7.82389 10.0383 12.1003 11.7565C16.3768 13.475 19.7984 14.9768 19.7456 15.1108C19.6914 15.2448 16.1814 13.9604 11.905 12.2426Z" fill="#D0E3F1" />
                                                <path d="M12.2412 12.1012C13.9593 7.82592 15.2433 4.31553 15.1093 4.26127C14.9754 4.20775 13.4732 7.63017 11.7547 11.9062C10.0361 16.1819 8.7529 19.6919 8.88651 19.7462C9.02049 19.8001 10.5219 16.3773 12.2412 12.1012Z" fill="#D0E3F1" />
                                                <path d="M12.0846 12.2475C7.73327 13.7654 4.16753 14.8859 4.11963 14.7489C4.07173 14.6123 7.5611 13.2703 11.912 11.7531C16.2637 10.2348 19.8291 9.11546 19.877 9.25131C19.9241 9.38791 16.4355 10.7295 12.0846 12.2475Z" fill="#D0E3F1" />
                                                <path d="M12.2469 11.9129C10.7294 7.56165 9.38774 4.07298 9.25152 4.12051C9.11492 4.16841 10.2343 7.73456 11.7529 12.0851C13.2708 16.436 14.6114 19.925 14.7491 19.8779C14.8849 19.8296 13.7649 16.2642 12.2469 11.9129Z" fill="#D0E3F1" />
                                                <path d="M15.2227 15.2299C13.4455 17.0072 10.5526 17.0072 8.77496 15.2292C6.99695 13.4516 6.99695 10.5587 8.77459 8.78144C10.5519 7.0038 13.4447 7.00417 15.2224 8.78181C17 10.5598 17 13.4523 15.2227 15.2299ZM8.86628 8.87349C7.13916 10.6006 7.13879 13.4112 8.86628 15.1379C10.593 16.8654 13.4035 16.865 15.1303 15.1379C16.8574 13.4108 16.8578 10.6006 15.1303 8.87349C13.4035 7.14638 10.5934 7.14675 8.86628 8.87349Z" fill="#D0E3F1" />
                                            </svg>


                                        </span>
                                    )
                                }



                                <h3 className="about-story-animate about-story-subtitle">
                                    {current.subtitle}
                                </h3>

                                <p className="about-story-animate about-story-description">
                                    {current.description}
                                </p>

                            </div>

                        </div>

                        {/* RIGHT */}
                        <div className="about-story-visual hide-mobile">

                            <div className="about-story-image-stack">

                                <div className="about-story-cloud-mask" />

                                <div className="about-story-inner-bg" />


                                {/* <div
                                ref={cloudRef}
                                className="about-story-cloud-bg"
                            >
                                <Image
                                    src="/assets/background/masked-cloud-bg.png"
                                    alt="clouds"
                                    fill
                                />
                            </div> */}



                                {/* <Image
                                src={current.image}
                                alt={current.title}
                                fill
                                className="about-story-person"
                            /> */}

                            </div>

                        </div>

                    </div>
                    <div className="about-story-timeline" >

                        <div className="about-story-timeline-track" />

                        <div
                            className="about-story-timeline-fill"
                            style={{
                                transform: `scaleX(${timelineProgress})`,
                            }}


                        />



                        {storyTimeline.map((item, index) => (
                            <div
                                key={item.year}
                                className={`about-story-timeline-item ${activeIndex >= index
                                    ? "is-active"
                                    : ""
                                    }`}
                            >


                                <span className="about-story-timeline-title">
                                    {item.title}
                                </span>

                                <span className="about-story-timeline-year">
                                    ({item.year})
                                </span>

                                <div className="about-story-timeline-dot" />
                            </div>
                        ))}

                    </div>

                </div>

            </div>
        )
}

export default AboutStory



