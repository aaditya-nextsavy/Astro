"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";


import "swiper/css";

import { RUDRAKSHA_ITEMS as slides } from "@/data/siteData";

const SliderWithFade = () => {
    const [active, setActive] = useState(0);
    const swiperRef = useRef(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const VISIBLE = 5;
    const HALF = Math.floor(VISIBLE / 2);

    const start = Math.max(
        0,
        Math.min(
            active - HALF,
            slides.length - VISIBLE
        )
    );

    const visibleBullets = slides.slice(start, start + VISIBLE);



    useLayoutEffect(() => {
        console.log(
            "SliderWithFade  mounted",
            document.body.scrollHeight
        );
    }, []);


    return (
        <section className="home-product-slider-section" id="rudrakshaSection">



            <img
                className="product-slider-bg-image"
                src="/assets/background/mask-bg-clouds.png"
                alt="clouds"
            />


            {/* TOP CONTENT */}
            <div className="slider-header">

                <div className="slider-header-label">





                </div>

                <h2 className="mb-4 lg:mb-8 ">Discover Sacred Rudraksha Energies</h2>

            </div>

            {/* SLIDER WRAPPER (important for fade illusion) */}
            <div className="slider-viewport">





                {/* LEFT FADE */}
                <div className="side-fade left" />

                {/* RIGHT FADE */}
                <div className="side-fade right" />

                <Swiper
                    initialSlide={5}
                    modules={[Autoplay, Pagination]}
                    centeredSlides
                    loop={false}
                    allowTouchMove={false}
                    simulateTouch={false}
                    touchRatio={0}
                    speed={900}
                    onSlideChange={(swiper) => setActive(swiper.realIndex)}
                    onSlideChangeTransitionStart={() => {
                        setIsAnimating(true);
                    }}
                    onSlideChangeTransitionEnd={() => {
                        setIsAnimating(false);
                    }}
                    slidesPerView={3}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                        },
                        600: {
                            slidesPerView: 3,
                        },
                    }}
                    // pagination={{
                    //     clickable: true,
                    //     el: ".custom-pagination",

                    // }}
                    spaceBetween={10}
                    autoplay={{
                        delay: 2500000000000,
                        disableOnInteraction: false,
                    }}
                    className="product-swiper"
                    onSwiper={(swiper) => (swiperRef.current = swiper)}
                >
                    {slides.map((item, index) => (
                        <SwiperSlide key={item.id}>
                            <div className="product-slide">
                                <img src={item.image} alt={item.title} />

                                <div className="edge-fade left" />
                                <div className="edge-fade right" />

                            </div>

                            <div
                                className={`slider-content ${active === index ? "is-active" : ""
                                    }`}
                            >
                                <h3>{item.title}</h3>
                                <p>{item.description}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>


            </div>

            <div className="slider-nav">
                <button
                    className="nav-btn left"
                    disabled={isAnimating}
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <svg width="41" height="15" viewBox="0 0 41 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.99095 14.8232C9.99095 14.0376 9.07553 12.8644 8.14887 11.8797C6.95745 10.6091 5.53374 9.50054 3.90147 8.65454C2.67757 8.0203 1.19392 7.41148 0 7.41148M0 7.41148C1.19392 7.41148 2.67882 6.80265 3.90147 6.16842C5.53374 5.32136 6.95745 4.21277 8.14887 2.9443C9.07553 1.95854 9.99095 0.783242 9.99095 -0.000287592M0 7.41148L48.7059 7.41148" stroke="#17374F" strokeWidth="0.705882" />
                    </svg>

                </button>

                <div className="custom-pagination">
                    {visibleBullets.map((_, i) => {
                        const index = start + i;

                        return (
                            <button
                                key={index}
                                onClick={() => swiperRef.current?.slideTo(index)}
                                className={`bullet ${index === active
                                    ? "active"
                                    : index === active - 1 || index === active + 1
                                        ? "near"
                                        : "far"
                                    }`}
                            />
                        );
                    })}
                </div>


                <button
                    className="nav-btn right"
                    disabled={isAnimating}
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <svg width="41" height="15" viewBox="0 0 41 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M30.9502 14.8232C30.9502 14.0376 31.8656 12.8644 32.7923 11.8797C33.9837 10.6091 35.4074 9.50054 37.0397 8.65454C38.2636 8.0203 39.7473 7.41148 40.9412 7.41148M40.9412 7.41148C39.7473 7.41148 38.2624 6.80265 37.0397 6.16842C35.4074 5.32136 33.9837 4.21277 32.7923 2.9443C31.8656 1.95854 30.9502 0.783242 30.9502 -0.000287592M40.9412 7.41148L-7.76471 7.41148" stroke="#17374F" strokeWidth="0.705882" />
                    </svg>

                </button>
            </div>

            {/* DYNAMIC CONTENT */}
            {/* <div className="slider-content">
                <h3>{slides[active].title}</h3>
                <p>{slides[active].description}</p>
            </div> */}

        </section>
    );
};

export default SliderWithFade;