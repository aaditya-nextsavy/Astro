import AboutWrapper from '@/components/about/AboutWrapper'
import React from 'react'


export const metadata = {
    title: "About Us | 100 Years of Vedic Astrology & Vastu Legacy",
    description:
        "Discover the 100-year spiritual legacy of Aacharya Markand and Aacharya Shandilya. Rooted in the traditions of Bhrigu Nandi Nadi, Vastu Shastra, and Vedic astrology, they combine ancient wisdom with modern understanding to guide individuals toward harmony, prosperity, and spiritual growth.",

    keywords: [
        "About Us",
        "Aacharya Markand",
        "Aacharya Shandilya",
        "Vedic Astrology",
        "Bhrigu Nandi Nadi",
        "Vastu Shastra",
        "Spiritual Guidance",
        "Astrology Experts",
        "Vastu Experts",
        "100 Years of Legacy",
        "Ancient Wisdom",
        "Spiritual Consultation",
        "Cosmic Guidance",
    ],

    alternates: {
        canonical: "/about",
    },

   
};


const page = () => {
    return (
        <>
            <AboutWrapper />
        </>
    )
}

export default page