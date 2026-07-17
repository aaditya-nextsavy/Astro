"use client";

import React, { useState, useRef, useLayoutEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css/pagination";


import "swiper/css";

const slides = [
    {
        id: 1,
        image: "/assets/rudraksha/One-Mukhi-Rudraksha.png",
        title: "One Mukhi Rudraksha",
        description: "The deity of the One Mukhi Rudraksha is Kalagni Rudra (a form of Lord Shiva). It is believed to bring mental peace, spiritual growth, good health, and relief from stress while helping to control blood pressure and improve concentration.",
    },
    {
        id: 2,
        image: "/assets/rudraksha/Two-Mukhi-Rudraksha.png",
        title: "Two Mukhi Rudraksha",
        description: "The deity of the Two Mukhi Rudraksha is Ardhanarishvara, the unified form of Lord Shiva and Goddess Parvati. It symbolizes harmony, unity, and balance in relationships while promoting emotional stability, inner peace, and mutual understanding.",
    },
    {
        id: 3,
        image: "/assets/rudraksha/Three-Mukhi-Rudraksha.png",
        title: "Three Mukhi Rudraksha",
        description: "The deity of the Three Mukhi Rudraksha is Lord Agni, the god of fire. It is believed to remove past karmic burdens, boost self-confidence, increase energy, and inspire positivity, courage, and personal transformation.",
    },
    {
        id: 4,
        image: "/assets/rudraksha/Four-Mukhi-Rudraksha.png",
        title: "Four Mukhi Rudraksha",
        description: "The deity of the Four Mukhi Rudraksha is Lord Brahma, the creator of the universe. It is associated with wisdom, knowledge, creativity, and improved communication, making it beneficial for students, teachers, and professionals.",
    },
    {
        id: 5,
        image: "/assets/rudraksha/Five-Mukhi-Rudraksha.png",
        title: "Five Mukhi Rudraksha",
        description: "The deity of the Five Mukhi Rudraksha is Kalagni Rudra, a form of Lord Shiva. It is the most commonly worn Rudraksha and is believed to promote peace of mind, good health, spiritual awareness, and protection from negative energies.",
    },
    {
        id: 6,
        image: "/assets/rudraksha/Six-Mukhi-Rudraksha.png",
        title: "Six Mukhi Rudraksha",
        description: "The deity of the Six Mukhi Rudraksha is Lord Kartikeya. It is believed to enhance confidence, courage, discipline, and intellectual abilities while promoting emotional balance and physical vitality.",
    },
    {
        id: 7,
        image: "/assets/rudraksha/Seven-Mukhi-Rudraksha.png",
        title: "Seven Mukhi Rudraksha",
        description: "The deity of the Seven Mukhi Rudraksha is Goddess Mahalakshmi. It is believed to attract wealth, prosperity, financial stability, and abundance while removing obstacles related to success and happiness.",
    },
    {
        id: 8,
        image: "/assets/rudraksha/Eight-Mukhi-Rudraksha.png",
        title: "Eight Mukhi Rudraksha",
        description: "The deity of the Eight Mukhi Rudraksha is Lord Ganesha. It is believed to remove obstacles, bring success in new ventures, enhance wisdom, and provide protection from negative influences.",
    },
    {
        id: 9,
        image: "/assets/rudraksha/Nine-Mukhi-Rudraksha.png",
        title: "Nine Mukhi Rudraksha",
        description: "The deity of the Nine Mukhi Rudraksha is Goddess Durga. It is believed to provide strength, courage, protection, and fearlessness while helping the wearer overcome challenges and negative energies.",
    },
    {
        id: 10,
        image: "/assets/rudraksha/Ten-Mukhi-Rudraksha.png",
        title: "Ten Mukhi Rudraksha",
        description: "The deity of the Ten Mukhi Rudraksha is Lord Vishnu. It is believed to protect the wearer from negative energies, evil influences, and obstacles while promoting peace, confidence, and spiritual well-being.",
    },
    {
        id: 11,
        image: "/assets/rudraksha/Eleven-Mukhi-Rudraksha.png",
        title: "Eleven Mukhi Rudraksha",
        description: "The deity of the Eleven Mukhi Rudraksha is Lord Hanuman. It is believed to grant courage, strength, wisdom, protection, and success while enhancing self-confidence and spiritual discipline.",
    },
    {
        id: 12,
        image: "/assets/rudraksha/Twelve-Mukhi-Rudraksha.png",
        title: "Twelve Mukhi Rudraksha",
        description: "The deity of the Twelve Mukhi Rudraksha is Lord Surya, the Sun God. It is believed to increase leadership qualities, confidence, vitality, and personal power while bringing success and recognition.",
    },
    {
        id: 13,
        image: "/assets/rudraksha/Thirteen-Mukhi-Rudraksha.png",
        title: "Thirteen Mukhi Rudraksha",
        description: "The deity of the Thirteen Mukhi Rudraksha is Lord Kamadeva and it is blessed by Lord Indra. It is believed to enhance charm, confidence, creativity, and attraction while bringing prosperity, success, harmonious relationships, and fulfillment of desires.",
    },
];

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
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.22144 7.78132C12.0908 11.6507 15.0076 15.0077 15.0076 15.0077C15.0076 15.0077 11.651 12.0903 7.78156 8.22118C3.91217 4.35179 0.995117 0.995117 0.995117 0.995117C0.995117 0.995117 4.35205 3.91218 8.22144 7.78132Z" fill="#17374F" />
                        <path d="M8.22143 8.22194C4.3518 12.0913 0.995117 15.0079 0.995117 15.0079C0.995117 15.0079 3.91192 11.6515 7.78156 7.78182C11.6512 3.91243 15.0079 0.995117 15.0079 0.995117C15.0079 0.995117 12.0913 4.3523 8.22143 8.22194Z" fill="#17374F" />
                        <path d="M7.99651 8.25113C3.57824 8.19125 -0.00249363 8.03083 1.303e-06 7.89161C0.00149826 7.75314 3.58474 7.68927 8.00352 7.7489C12.4218 7.80878 16.0025 7.96945 16 8.10817C15.998 8.24689 12.4148 8.31076 7.99651 8.25113Z" fill="#17374F" />
                        <path d="M8.25112 8.00349C8.311 3.58521 8.24664 0.00174751 8.10792 1.05557e-06C7.96945 -0.00224438 7.80903 3.57822 7.74915 7.9965C7.68903 12.4148 7.75313 15.9982 7.89159 16.0002C8.03056 16.002 8.19174 12.4215 8.25112 8.00349Z" fill="#17374F" />
                        <path d="M7.93568 8.16201C5.08547 7.01633 2.8036 6.01513 2.83928 5.92531C2.87546 5.83624 5.21495 6.69249 8.06591 7.83791C10.9169 8.98359 13.198 9.9848 13.1628 10.0741C13.1266 10.1634 10.7866 9.30718 7.93568 8.16201Z" fill="#17374F" />
                        <path d="M8.16177 8.06592C9.30719 5.21571 10.1632 2.87546 10.0739 2.83928C9.98455 2.8036 8.98309 5.08521 7.83742 7.93592C6.69174 10.7864 5.83625 13.1264 5.92531 13.1626C6.01463 13.1985 7.0156 10.9166 8.16177 8.06592Z" fill="#17374F" />
                        <path d="M8.05735 8.16601C5.15649 9.17796 2.77933 9.92495 2.7474 9.83363C2.71546 9.74257 5.04171 8.84788 7.94232 7.83644C10.8434 6.82424 13.2204 6.07801 13.2523 6.16858C13.2837 6.25964 10.958 7.15407 8.05735 8.16601Z" fill="#17374F" />
                        <path d="M8.16561 7.94234C7.15391 5.04149 6.25947 2.7157 6.16866 2.74739C6.07759 2.77933 6.82381 5.15676 7.83626 8.05711C8.8482 10.9577 9.74188 13.2837 9.8337 13.2523C9.92426 13.2201 9.17755 10.8432 8.16561 7.94234Z" fill="#17374F" />
                        <path d="M10.1485 10.1525C8.96365 11.3374 7.03506 11.3374 5.84997 10.152C4.66463 8.96695 4.66464 7.03838 5.84973 5.85354C7.03457 4.66845 8.96316 4.66869 10.1482 5.85378C11.3333 7.03913 11.3333 8.96745 10.1485 10.1525ZM5.91085 5.91491C4.75944 7.06632 4.75919 8.94002 5.91085 10.0912C7.06201 11.2428 8.93569 11.2426 10.0868 10.0912C11.2383 8.93977 11.2385 7.06632 10.0868 5.91491C8.93569 4.7635 7.06226 4.76375 5.91085 5.91491Z" fill="#17374F" />
                    </svg>

                    <span>
                        Rudraksha Collection
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.22144 7.78132C12.0908 11.6507 15.0076 15.0077 15.0076 15.0077C15.0076 15.0077 11.651 12.0903 7.78156 8.22118C3.91217 4.35179 0.995117 0.995117 0.995117 0.995117C0.995117 0.995117 4.35205 3.91218 8.22144 7.78132Z" fill="#17374F" />
                        <path d="M8.22143 8.22194C4.3518 12.0913 0.995117 15.0079 0.995117 15.0079C0.995117 15.0079 3.91192 11.6515 7.78156 7.78182C11.6512 3.91243 15.0079 0.995117 15.0079 0.995117C15.0079 0.995117 12.0913 4.3523 8.22143 8.22194Z" fill="#17374F" />
                        <path d="M7.99651 8.25113C3.57824 8.19125 -0.00249363 8.03083 1.303e-06 7.89161C0.00149826 7.75314 3.58474 7.68927 8.00352 7.7489C12.4218 7.80878 16.0025 7.96945 16 8.10817C15.998 8.24689 12.4148 8.31076 7.99651 8.25113Z" fill="#17374F" />
                        <path d="M8.25112 8.00349C8.311 3.58521 8.24664 0.00174751 8.10792 1.05557e-06C7.96945 -0.00224438 7.80903 3.57822 7.74915 7.9965C7.68903 12.4148 7.75313 15.9982 7.89159 16.0002C8.03056 16.002 8.19174 12.4215 8.25112 8.00349Z" fill="#17374F" />
                        <path d="M7.93568 8.16201C5.08547 7.01633 2.8036 6.01513 2.83928 5.92531C2.87546 5.83624 5.21495 6.69249 8.06591 7.83791C10.9169 8.98359 13.198 9.9848 13.1628 10.0741C13.1266 10.1634 10.7866 9.30718 7.93568 8.16201Z" fill="#17374F" />
                        <path d="M8.16177 8.06592C9.30719 5.21571 10.1632 2.87546 10.0739 2.83928C9.98455 2.8036 8.98309 5.08521 7.83742 7.93592C6.69174 10.7864 5.83625 13.1264 5.92531 13.1626C6.01463 13.1985 7.0156 10.9166 8.16177 8.06592Z" fill="#17374F" />
                        <path d="M8.05735 8.16601C5.15649 9.17796 2.77933 9.92495 2.7474 9.83363C2.71546 9.74257 5.04171 8.84788 7.94232 7.83644C10.8434 6.82424 13.2204 6.07801 13.2523 6.16858C13.2837 6.25964 10.958 7.15407 8.05735 8.16601Z" fill="#17374F" />
                        <path d="M8.16561 7.94234C7.15391 5.04149 6.25947 2.7157 6.16866 2.74739C6.07759 2.77933 6.82381 5.15676 7.83626 8.05711C8.8482 10.9577 9.74188 13.2837 9.8337 13.2523C9.92426 13.2201 9.17755 10.8432 8.16561 7.94234Z" fill="#17374F" />
                        <path d="M10.1485 10.1525C8.96365 11.3374 7.03506 11.3374 5.84997 10.152C4.66463 8.96695 4.66464 7.03838 5.84973 5.85354C7.03457 4.66845 8.96316 4.66869 10.1482 5.85378C11.3333 7.03913 11.3333 8.96745 10.1485 10.1525ZM5.91085 5.91491C4.75944 7.06632 4.75919 8.94002 5.91085 10.0912C7.06201 11.2428 8.93569 11.2426 10.0868 10.0912C11.2383 8.93977 11.2385 7.06632 10.0868 5.91491C8.93569 4.7635 7.06226 4.76375 5.91085 5.91491Z" fill="#17374F" />
                    </svg>


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