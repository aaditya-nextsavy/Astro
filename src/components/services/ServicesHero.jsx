"use client";
import { useEffect, useState } from "react";


export default function ServicesHero() {


    const [time, setTime] = useState("");

    useEffect(() => {
        const updateTime = () => {
            const formatted = new Intl.DateTimeFormat(
                "en-IN",
                {
                    timeZone: "Asia/Kolkata",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                }
            ).format(new Date());

            setTime(formatted);
        };

        updateTime();

        const interval = setInterval(
            updateTime,
            1000
        );

        return () =>
            clearInterval(interval);
    }, []);



    return (


        <section className="astroHeroWrapper">

            {/* Hero Content */}
            <div className="astroHeroContentArea">
                <h1 className="astroHeroMainHeading">
                    Bridging the Earth & <br /> the Cosmos
                </h1>

                <div className="astroHeroSubLine">
                    <span className="astroHeroDivider left" />
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 0L6.8061 5.1939L12 6L6.8061 6.8061L6 12L5.1939 6.8061L0 6L5.1939 5.1939L6 0Z" fill="#D0E3F1" />
                    </svg>


                    <p>Scroll To View Services</p>

                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 0L6.8061 5.1939L12 6L6.8061 6.8061L6 12L5.1939 6.8061L0 6L5.1939 5.1939L6 0Z" fill="#D0E3F1" />
                    </svg>


                    <span className="astroHeroDivider right" />
                </div>


            </div>


        </section>
    );
}