"use client";

import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { gsap } from "@/lib/gsap";

const galleryItems = [
    {
        id: 1,
        title: "Rudra Abhishek",
        image: "/assets/gallery/g-1.png",
    },
    {
        id: 2,
        title: "Sacred Rudraks",
        image: "/assets/gallery/g-2.png",
    },
    {
        id: 3,
        title: "Temple Ceremonies",
        image: "/assets/gallery/g-1.png",
    },
    {
        id: 4,
        title: "Vedic Pooja",
        image: "/assets/gallery/g-2.png",
    },
    {
        id: 5,
        title: "Shiva Aradhana",
        image: "/assets/gallery/g-1.png",
    },
];

const GalleryImagePreview = () => {
    const [activeIndex, setActiveIndex] = useState(3);

    const imageRef = useRef(null);
    const trackRef = useRef(null);
    const navRef = useRef(null);
    const titleRefs = useRef([]);

    // const handleChange = (index) => {
    //     if (index === activeIndex) return;

    //     gsap.fromTo(
    //         imageRef.current,
    //         {
    //             opacity: 0,
    //             scale: 1.08,
    //         },
    //         {
    //             opacity: 1,
    //             scale: 1,
    //             duration: 1.2,
    //             ease: "power3.out",
    //         }
    //     );

    //     setActiveIndex(index);
    // };

    useLayoutEffect(() => {
        titleRefs.current.forEach((item, i) => {
            if (!item) return;

            gsap.to(item, {
                opacity: i === activeIndex ? 1 : 0.35,
                duration: 1,
                ease: "power3.out",
            });
        });

        const activeButton = titleRefs.current[activeIndex];

        if (
            activeButton &&
            trackRef.current &&
            navRef.current
        ) {
            const isMobile = window.innerWidth <= 991;

            if (isMobile) {
                const navWidth = navRef.current.offsetWidth;
                const buttonLeft = activeButton.offsetLeft;
                const buttonWidth = activeButton.offsetWidth;

                const x =
                    navWidth / 2 -
                    (buttonLeft + buttonWidth / 2);

                gsap.to(trackRef.current, {
                    x,
                    duration: 1,
                    ease: "power3.out",
                });
            } else {
                const navHeight = navRef.current.offsetHeight;
                const buttonTop = activeButton.offsetTop;
                const buttonHeight = activeButton.offsetHeight;

                const y =
                    navHeight / 2 -
                    (buttonTop + buttonHeight / 2);

                gsap.to(trackRef.current, {
                    y,
                    duration: 1,
                    ease: "power3.out",
                });
            }
        }
    }, [activeIndex]);

    useEffect(() => {
        gsap.to(".cloud-1", {
            y: -20,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });

        gsap.to(".cloud-2", {
            y: 20,
            duration: 10,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        });
    }, []);


    const animateImage = () => {
        gsap.fromTo(
            imageRef.current,
            {
                opacity: 0,
                scale: 1,
            },
            {
                opacity: 1,
                scale: 1,
                duration: 2.5,
                ease: "power2.out",
            }
        );
    };

    const handleChange = (index) => {
        if (index === activeIndex) return;

        gsap.to(imageRef.current, {
            opacity: 0,
            duration: 2.8,
            ease: "power2.inOut",
            onComplete: () => {
                setActiveIndex(index);

                gsap.fromTo(
                    imageRef.current,
                    {
                        opacity: 0,
                    },
                    {
                        opacity: 1,
                        duration: 2.5,
                        ease: "power2.inOut",
                    }
                );
            },
        });
    };

    const handlePrev = () => {
        animateImage();

        setActiveIndex((prev) =>
            prev === 0 ? galleryItems.length - 1 : prev - 1
        );
    };

    const handleNext = () => {
        animateImage();

        setActiveIndex((prev) =>
            prev === galleryItems.length - 1 ? 0 : prev + 1
        );
    };



    return (
        <section className="gallery-showcase">

            <img
                src="/assets/background/masked-cloud-bg.png"
                alt=""
                className="gallery-showcase__cloud-overlay_out"
            />


            <div className="gallery-showcase__heading">
                <h2>
                    Moments
                    <br />
                    Of Devotion
                </h2>
            </div>

            <div className="gallery-showcase__visual relative">





                <div className="gallery-showcase__cloud-mask">
                    <img
                        ref={imageRef}
                        src={galleryItems[activeIndex].image}
                        alt=""
                        className="gallery-showcase__image"
                    />

                    {/* <img
                        src="/assets/background/masked-cloud-bg.png"
                        alt=""
                        className="gallery-showcase__cloud-overlay cloud-1"
                    /> */}


                </div>
            </div>

            <div className="gallery-showcase__navigation-wrapper">

                <div
                    ref={navRef}
                    className="gallery-showcase__navigation"
                >
                    <div
                        ref={trackRef}
                        className="gallery-showcase__navigation-track"
                    >
                        {galleryItems.map((item, index) => (
                            <button
                                key={item.id}
                                ref={(el) =>
                                    (titleRefs.current[index] = el)
                                }
                                className={`gallery-showcase__item ${index === activeIndex
                                    ? "is-active"
                                    : ""
                                    }`}
                                onClick={() => handleChange(index)}
                            >
                                {index === activeIndex ? (
                                    <>
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.3315 11.6715C18.1355 17.4755 22.5106 22.5108 22.5106 22.5108C22.5106 22.5108 17.4757 18.1349 11.6717 12.3313C5.8677 6.52727 1.49219 1.49234 1.49219 1.49234C1.49219 1.49234 6.5275 5.86787 12.3315 11.6715Z" fill="#D0E3F1" />
                                            <path d="M12.3315 12.3324C6.52713 18.1364 1.49219 22.5112 1.49219 22.5112C1.49219 22.5112 5.86733 17.4766 11.6717 11.6722C17.4761 5.86825 22.511 1.49234 22.511 1.49234C22.511 1.49234 18.1362 6.52804 12.3315 12.3324Z" fill="#D0E3F1" />
                                            <path d="M11.9946 12.3766C5.36728 12.2867 -0.00374039 12.0461 1.95446e-06 11.8373C0.00224736 11.6296 5.37703 11.5338 12.0051 11.6232C18.6324 11.713 24.0034 11.954 23.9996 12.1621C23.9966 12.3702 18.6219 12.466 11.9946 12.3766Z" fill="#D0E3F1" />
                                            <path d="M12.3767 12.0051C12.4665 5.3778 12.3699 0.00268226 12.1619 6.26185e-05C11.9542 -0.00330549 11.7135 5.36731 11.6237 11.9946C11.5335 18.6219 11.6297 23.9971 11.8374 24.0001C12.0458 24.0027 12.2876 18.632 12.3767 12.0051Z" fill="#D0E3F1" />
                                            <path d="M11.9029 12.2434C7.62766 10.5249 4.20492 9.02315 4.25843 8.88842C4.3127 8.75482 7.82188 10.0392 12.0983 11.7573C16.3746 13.4758 19.7962 14.9776 19.7435 15.1115C19.6892 15.2455 16.1793 13.9612 11.9029 12.2434Z" fill="#D0E3F1" />
                                            <path d="M12.2431 12.0984C13.9612 7.82312 15.2452 4.31279 15.1112 4.25852C14.9772 4.20501 13.475 7.62737 11.7566 11.9034C10.0381 16.179 8.75486 19.6889 8.88846 19.7432C9.02244 19.7971 10.5239 16.3744 12.2431 12.0984Z" fill="#D0E3F1" />
                                            <path d="M12.0864 12.2494C7.73517 13.7673 4.16948 14.8877 4.12158 14.7508C4.07368 14.6142 7.563 13.2722 11.9138 11.755C16.2654 10.2367 19.8308 9.11742 19.8787 9.25326C19.9259 9.38986 16.4372 10.7315 12.0864 12.2494Z" fill="#D0E3F1" />
                                            <path d="M12.2489 11.913C10.7313 7.56178 9.38969 4.07316 9.25347 4.12069C9.11688 4.16859 10.2362 7.73468 11.7548 12.0852C13.2727 16.436 14.6132 19.925 14.7509 19.8778C14.8868 19.8296 13.7667 16.2642 12.2489 11.913Z" fill="#D0E3F1" />
                                            <path d="M15.2226 15.2285C13.4454 17.0057 10.5525 17.0057 8.77494 15.2277C6.99695 13.4501 6.99696 10.5573 8.77457 8.78005C10.5518 7.00244 13.4446 7.0028 15.2223 8.78041C16.9999 10.5584 16.9999 13.4508 15.2226 15.2285ZM8.86626 8.8721C7.13917 10.5992 7.13879 13.4097 8.86626 15.1364C10.593 16.8639 13.4034 16.8635 15.1302 15.1364C16.8572 13.4093 16.8576 10.5992 15.1302 8.8721C13.4034 7.14501 10.5933 7.14538 8.86626 8.8721Z" fill="#D0E3F1" />
                                        </svg>
                                        {item.title}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12.3315 11.6715C18.1355 17.4755 22.5106 22.5108 22.5106 22.5108C22.5106 22.5108 17.4757 18.1349 11.6717 12.3313C5.8677 6.52727 1.49219 1.49234 1.49219 1.49234C1.49219 1.49234 6.5275 5.86787 12.3315 11.6715Z" fill="#D0E3F1" />
                                            <path d="M12.3315 12.3324C6.52713 18.1364 1.49219 22.5112 1.49219 22.5112C1.49219 22.5112 5.86733 17.4766 11.6717 11.6722C17.4761 5.86825 22.511 1.49234 22.511 1.49234C22.511 1.49234 18.1362 6.52804 12.3315 12.3324Z" fill="#D0E3F1" />
                                            <path d="M11.9946 12.3766C5.36728 12.2867 -0.00374039 12.0461 1.95446e-06 11.8373C0.00224736 11.6296 5.37703 11.5338 12.0051 11.6232C18.6324 11.713 24.0034 11.954 23.9996 12.1621C23.9966 12.3702 18.6219 12.466 11.9946 12.3766Z" fill="#D0E3F1" />
                                            <path d="M12.3767 12.0051C12.4665 5.3778 12.3699 0.00268226 12.1619 6.26185e-05C11.9542 -0.00330549 11.7135 5.36731 11.6237 11.9946C11.5335 18.6219 11.6297 23.9971 11.8374 24.0001C12.0458 24.0027 12.2876 18.632 12.3767 12.0051Z" fill="#D0E3F1" />
                                            <path d="M11.9029 12.2434C7.62766 10.5249 4.20492 9.02315 4.25843 8.88842C4.3127 8.75482 7.82188 10.0392 12.0983 11.7573C16.3746 13.4758 19.7962 14.9776 19.7435 15.1115C19.6892 15.2455 16.1793 13.9612 11.9029 12.2434Z" fill="#D0E3F1" />
                                            <path d="M12.2431 12.0984C13.9612 7.82312 15.2452 4.31279 15.1112 4.25852C14.9772 4.20501 13.475 7.62737 11.7566 11.9034C10.0381 16.179 8.75486 19.6889 8.88846 19.7432C9.02244 19.7971 10.5239 16.3744 12.2431 12.0984Z" fill="#D0E3F1" />
                                            <path d="M12.0864 12.2494C7.73517 13.7673 4.16948 14.8877 4.12158 14.7508C4.07368 14.6142 7.563 13.2722 11.9138 11.755C16.2654 10.2367 19.8308 9.11742 19.8787 9.25326C19.9259 9.38986 16.4372 10.7315 12.0864 12.2494Z" fill="#D0E3F1" />
                                            <path d="M12.2489 11.913C10.7313 7.56178 9.38969 4.07316 9.25347 4.12069C9.11688 4.16859 10.2362 7.73468 11.7548 12.0852C13.2727 16.436 14.6132 19.925 14.7509 19.8778C14.8868 19.8296 13.7667 16.2642 12.2489 11.913Z" fill="#D0E3F1" />
                                            <path d="M15.2226 15.2285C13.4454 17.0057 10.5525 17.0057 8.77494 15.2277C6.99695 13.4501 6.99696 10.5573 8.77457 8.78005C10.5518 7.00244 13.4446 7.0028 15.2223 8.78041C16.9999 10.5584 16.9999 13.4508 15.2226 15.2285ZM8.86626 8.8721C7.13917 10.5992 7.13879 13.4097 8.86626 15.1364C10.593 16.8639 13.4034 16.8635 15.1302 15.1364C16.8572 13.4093 16.8576 10.5992 15.1302 8.8721C13.4034 7.14501 10.5933 7.14538 8.86626 8.8721Z" fill="#D0E3F1" />
                                        </svg>

                                    </>
                                ) : (
                                    item.title
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="gallery-showcase__controls">

                    <button
                        className="gallery-showcase__nav-btn glass-effect-card"
                        onClick={handlePrev}
                    >
                        <svg width="10" height="28" viewBox="0 0 10 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 6.66048C0.523765 6.66048 1.30588 6.0502 1.96235 5.43243C2.80941 4.63815 3.54847 3.68901 4.11247 2.60082C4.53529 1.7849 4.94118 0.795793 4.94118 -0.000152588M4.94118 -0.000152588C4.94118 0.795793 5.34706 1.78573 5.76988 2.60082C6.33459 3.68901 7.07365 4.63815 7.91929 5.43243C8.57647 6.0502 9.36 6.66048 9.88235 6.66048M4.94118 -0.000152588L4.94118 32.4704" stroke="#D0E3F1" strokeWidth="0.470588" />
                        </svg>

                    </button>

                    <button
                        className="gallery-showcase__nav-btn glass-effect-card"
                        onClick={handleNext}
                    >
                        <svg width="10" height="28" viewBox="0 0 10 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 20.6337C0.523765 20.6337 1.30588 21.2439 1.96235 21.8617C2.80941 22.656 3.54847 23.6051 4.11247 24.6933C4.53529 25.5093 4.94118 26.4984 4.94118 27.2943M4.94118 27.2943C4.94118 26.4984 5.34706 25.5084 5.76988 24.6933C6.33459 23.6051 7.07365 22.656 7.91929 21.8617C8.57647 21.2439 9.36 20.6337 9.88235 20.6337M4.94118 27.2943L4.94118 -5.17629" stroke="#D0E3F1" strokeWidth="0.470588" />
                        </svg>

                    </button>

                </div>

            </div>
        </section>
    );
};

export default GalleryImagePreview;