"use client";

import { useState } from "react";

const SERVICES_DATA = [
    {
        id: "01",
        image: "/assets/drawer/DRAWER-TEMP.png",
        title: "Vastu Consultation",
        description:
            `Create harmony between your living spaces and the natural energies that influence your well-being. Our Vastu consultations evaluate residential and commercial properties to identify imbalances and recommend practical corrections that support health, prosperity, and peace of mind.`,
        highlight:
            `Receive personalized Vastu remedies and actionable recommendations designed to enhance positive energy flow and long-term success.`,
        link: "/contact"
    },
    {
        id: "02",
        image: "/assets/drawer/DRAWER-TEMP.png",
        title: "Personalized Birth Chart Analysis",
        description:
            `Gain deeper insight into your life's purpose through a comprehensive study of your natal chart. We examine planetary placements, houses, yogas, and karmic influences to reveal your strengths, challenges, and opportunities for personal growth.`,
        highlight:
            `Discover how your unique cosmic blueprint can guide important life decisions with greater confidence and clarity.`,
        link: "/contact"
    },
    {
        id: "03",
        image: "/assets/drawer/DRAWER-TEMP.png",
        title: "Astrological Predictions & Effective Remedies",
        description:
            `Understand upcoming life cycles and planetary influences through detailed astrological forecasting. Alongside predictions, we provide practical and spiritual remedies designed to minimize challenges and amplify favorable opportunities.`,
        highlight:
            `Navigate the future with confidence through personalized guidance and time-tested Vedic remedial measures.`,
        link: "/contact"
    },
    {
        id: "04",
        image: "/assets/drawer/DRAWER-TEMP.png",
        title: "Relationship and Career Guidance",
        description:
            `Whether you are seeking harmony in relationships or direction in your professional journey, our astrological consultations provide valuable insights into compatibility, timing, and personal strengths. We analyze key planetary influences to support informed decision-making.`,
        highlight:
            `Receive strategic guidance on partnerships, career transitions, and major life choices aligned with favorable cosmic periods.`,
        link: "/contact"
    },
    {
        id: "05",
        image: "/assets/drawer/DRAWER-TEMP.png",
        title: "Custom Solutions for Prosperity and Growth",
        description:
            `Every individual faces unique challenges and aspirations. We create tailored spiritual and astrological solutions that address specific concerns related to finances, business growth, personal development, and overall prosperity.`,
        highlight:
            `Benefit from customized recommendations designed to unlock opportunities and support sustainable success.`,
        link: "/contact"
    },
    {
        id: "06",
        image: "/assets/drawer/DRAWER-TEMP.png",
        title: "Spiritual Counseling and Life Path Direction",
        description:
            `Find clarity during periods of uncertainty through compassionate spiritual counseling. By combining astrological wisdom with practical guidance, we help you understand life lessons, overcome obstacles, and reconnect with your higher purpose.`,
        highlight:
            `Gain meaningful perspective and direction that empowers you to move forward with confidence and inner balance.`,
        link: "/contact"
    },
    {
        id: "07",
        image: "/assets/drawer/DRAWER-TEMP.png",
        title: "Authentic Puja Services",
        description:
            `Experience traditional Vedic Rudraksha performed with devotion and precision. Our puja services are conducted according to authentic scriptural practices and can be arranged for blessings, protection, prosperity, health, and spiritual upliftment.`,
        highlight:
            `Participate in sacred ceremonies tailored to your intentions and performed with complete ritual authenticity.`,
        link: "/contact"
    },
    {
        id: "08",
        image: "/assets/drawer/DRAWER-TEMP.png",
        title: "Sarvabadha Nivaran Homa",
        description:
            `This powerful Vedic fire ritual is performed to remove obstacles, negative influences, and persistent difficulties affecting various aspects of life. The homa invokes divine energies to restore harmony, protection, and positive momentum.`,
        highlight:
            `Seek relief from recurring challenges through a sacred ritual dedicated to purification, protection, and spiritual well-being.`,
        link: "/contact"
    },
];


const ServicesListing = ({
    onOpenAcharya,
    activeServiceIndex,
    setActiveServiceIndex,
}) => {
    // const [drawerOpen, setDrawerOpen] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);



    return (
        <>
            <section className="services-listing-section">

                <div className="services-listing-wrapper">

                    {SERVICES_DATA.map((service, index) => (
                        <div className="service-items-wrapper" key={service.id}>

                            {/* <button
                                className={`services-listing-item
  ${activeIndex === index ? "services-listing-item--active" : ""}
  ${activeIndex !== null && activeIndex !== index
                                        ? "services-listing-item--not-active"
                                        : ""
                                    }`}
                                onMouseEnter={() => setActiveIndex(index)}
                                onMouseLeave={() => setActiveIndex(null)}
                                onClick={() => handleClick(service)}
                            > */}
                            {/* <button
                                className={`services-listing-item
    ${activeIndex === index || selectedIndex === index
                                        ? "services-listing-item--active"
                                        : ""
                                    }
    ${activeIndex !== null &&
                                        activeIndex !== index &&
                                        selectedIndex !== index
                                        ? "services-listing-item--not-active"
                                        : ""
                                    }
  `} */}
                            <button
                                className={`services-listing-item ${activeServiceIndex === index
                                    ? "services-listing-item--active"
                                    : activeServiceIndex !== null
                                        ? "services-listing-item--not-active"
                                        : ""
                                    }`}
                                onMouseEnter={() => {
                                    if (!drawerOpen) {
                                        setActiveServiceIndex(index);
                                    }
                                }}
                                onMouseLeave={() => {
                                    if (!drawerOpen) {
                                        setActiveServiceIndex(null);
                                    }
                                }}
                                onClick={() => onOpenAcharya(service, index)}
                            >

                                <span className="services-listing-number">
                                    {service.id}
                                </span>

                                <span className="services-listing-title">
                                    {service.title}
                                </span>

                            </button>

                            {index !== SERVICES_DATA.length - 1 && (
                                <div className="services-listing-divider">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12.3317 11.6725C18.1357 17.4766 22.511 22.512 22.511 22.512C22.511 22.512 17.4759 18.136 11.6719 12.3323C5.86777 6.52817 1.49219 1.49316 1.49219 1.49316C1.49219 1.49316 6.52758 5.86876 12.3317 11.6725Z" fill="#17374F" />
                                        <path d="M12.3317 12.3334C6.5272 18.1375 1.49219 22.5123 1.49219 22.5123C1.49219 22.5123 5.8674 17.4777 11.6719 11.6732C17.4763 5.86914 22.5113 1.49316 22.5113 1.49316C22.5113 1.49316 18.1365 6.52894 12.3317 12.3334Z" fill="#17374F" />
                                        <path d="M11.9948 12.3767C5.36736 12.2869 -0.00374044 12.0462 1.95449e-06 11.8374C0.00224739 11.6297 5.37712 11.5339 12.0053 11.6233C18.6327 11.7132 24.0037 11.9542 24 12.1623C23.997 12.3703 18.6222 12.4661 11.9948 12.3767Z" fill="#17374F" />
                                        <path d="M12.3767 12.0052C12.4665 5.37782 12.37 0.00262126 12.1619 1.58335e-06C11.9542 -0.00336657 11.7135 5.36733 11.6237 11.9947C11.5335 18.6222 11.6297 23.9974 11.8374 24.0004C12.0458 24.003 12.2876 18.6323 12.3767 12.0052Z" fill="#17374F" />
                                        <path d="M11.903 12.2435C7.62771 10.525 4.20492 9.02318 4.25843 8.88845C4.3127 8.75485 7.82193 10.0392 12.0984 11.7574C16.3748 13.4759 19.7965 14.9777 19.7437 15.1117C19.6894 15.2457 16.1795 13.9613 11.903 12.2435Z" fill="#17374F" />
                                        <path d="M12.2431 12.0994C13.9613 7.82406 15.2453 4.31367 15.1113 4.25941C14.9773 4.20589 13.4751 7.62831 11.7566 11.9044C10.0381 16.1801 8.75486 19.6901 8.88846 19.7443C9.02244 19.7982 10.5239 16.3754 12.2431 12.0994Z" fill="#17374F" />
                                        <path d="M12.0865 12.2495C7.73522 13.7674 4.16948 14.8879 4.12158 14.7509C4.07368 14.6143 7.56305 13.2723 11.914 11.7551C16.2656 10.2369 19.831 9.11751 19.8789 9.25335C19.9261 9.38995 16.4374 10.7316 12.0865 12.2495Z" fill="#17374F" />
                                        <path d="M12.2489 11.914C10.7314 7.56272 9.38969 4.07405 9.25347 4.12157C9.11687 4.16948 10.2362 7.73562 11.7549 12.0862C13.2728 16.4371 14.6133 19.9261 14.751 19.879C14.8869 19.8307 13.7668 16.2653 12.2489 11.914Z" fill="#17374F" />
                                        <path d="M15.2227 15.2291C13.4455 17.0063 10.5526 17.0063 8.77496 15.2283C6.99695 13.4507 6.99695 10.5578 8.77459 8.78056C10.5519 7.00292 13.4447 7.00328 15.2224 8.78092C17 10.5589 17 13.4514 15.2227 15.2291ZM8.86628 8.87261C7.13916 10.5997 7.13879 13.4103 8.86628 15.137C10.593 16.8645 13.4035 16.8641 15.1303 15.137C16.8574 13.4099 16.8578 10.5997 15.1303 8.87261C13.4035 7.14549 10.5934 7.14587 8.86628 8.87261Z" fill="#17374F" />
                                    </svg>

                                </div>
                            )}

                        </div>
                    ))}

                </div>

            </section >


        </>
    );
};

export default ServicesListing;