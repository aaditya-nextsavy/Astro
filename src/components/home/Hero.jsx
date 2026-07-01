"use client";


const ACHARYA_DATA = [
    {
        id: "acharya-markand",
        image: "/assets/drawer/DRAWER-TEMP.png",
        title: "Vedic Astrology Specialist",
        name: "Acharya Markand",
        description:
            `Acharya Markand is known for deep expertise in predictive astrology, horoscope decoding, and karmic pattern analysis. His approach blends classical Vedic principles with practical life guidance.`,
        highlight:
            `Focused on clarity in relationships, career direction, and timing-based decisions using Dashas and planetary transits.`,
        link: "/contact"
    },
    {
        id: "acharya-shandilya",
        image: "/assets/drawer/DRAWER-TEMP.png",
        title: "Vedic Astrology Specialist",
        name: "Acharya Shandilya",
        role: "Vastu & Spiritual Guidance Expert",
        description:
            `Acharya Shandilya specializes in Vastu correction, energy alignment, and spiritual counseling for home and business spaces.`,
        highlight:
            `Helps harmonize living spaces and life decisions through ancient Vastu principles and energetic balancing.`,
        link: "/contact"
    }
];


export default function HomeHero({ onOpenAcharya }) {





    return (


        <section className="astroHeroWrapper">
          

            {/* Hero Content */}
            <div className="astroHeroContentArea">
                <h1 className="astroHeroMainHeading">
                    Unlock The Cosmic Pathway
                    <br />
                    To Your Inner Harmony
                </h1>

                <div className="astroHeroSubLine">
                    <span className="astroHeroDivider left" />
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 0L6.8061 5.1939L12 6L6.8061 6.8061L6 12L5.1939 6.8061L0 6L5.1939 5.1939L6 0Z" fill="#D0E3F1" />
                    </svg>

                    <p>Guided by the Light of</p>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 0L6.8061 5.1939L12 6L6.8061 6.8061L6 12L5.1939 6.8061L0 6L5.1939 5.1939L6 0Z" fill="#D0E3F1" />

                    </svg>
                    <span className="astroHeroDivider right" />
                </div>

                <div className="astroHeroAcharyaLinks">
                    <button onClick={() => onOpenAcharya(ACHARYA_DATA[0])}>
                        Acharya Markand
                    </button>

                    <div className="astroHeroCenterIcon">
                        <img src="/assets/icons/Hero-Mantra.svg" alt="Center Icon" />
                    </div>

                    <button onClick={() => onOpenAcharya(ACHARYA_DATA[1])}>
                        Acharya Shandilya
                    </button>
                </div>
            </div>

        
        </section>
    );
}