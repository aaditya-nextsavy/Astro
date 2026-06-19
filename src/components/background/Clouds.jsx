"use client";

import Image from "next/image";
import { useEffect } from "react";
import gsap from "gsap";

const CLOUDS = [
    {
        id: 1,
        src: "/assets/background/cloud1.png",
        top: "5%",
        left: "-10%",
        width: 500,
        duration: 40,
    },
    {
        id: 2,
        src: "./assets/background/cloud2.svg",
        top: "20%",
        left: "30%",
        width: 350,
        duration: 50,
    },
    {
        id: 3,
        src: "./assets/background/cloud3.svg",
        top: "30%",
        right: "0%",
        width: 250,
        duration: 60,
    },
    {
        id: 4,
        src: "/assets/background/cloud4.png",
        top: "30%",
        left: "-20%",
        width: 1200,
        duration: 45,
    },
    {
        id: 5,
        src: "/assets/background/cloud5.png",
        top: "30%",
        right: "-30%",
        width: 1250,
        duration: 55,
    },
];

export default function Clouds() {


    // useEffect(() => {

    //     gsap.utils.toArray(".cloud").forEach((cloud) => {

    //         gsap.to(cloud, {
    //             x: gsap.utils.random(-50, 50),
    //             y: gsap.utils.random(-30, 30),

    //             duration:
    //                 gsap.utils.random(25, 50),

    //             ease: "sine.inOut",

    //             repeat: -1,
    //             yoyo: true,
    //         });

    //     });

    // }, []);

    useEffect(() => {
        const clouds = document.querySelectorAll(".cloud");

        const handleScroll = () => {
            const scrollY = window.scrollY;

            clouds.forEach((cloud) => {
                const depth = Number(cloud.dataset.depth);
                const direction =
                    cloud.dataset.side === "left" ? -1 : 1;

                gsap.to(cloud, {
                    x: scrollY * 0.25 * depth * direction,
                    y: scrollY * 0.1 * depth,
                    duration: 0.8,
                    ease: "power2.out",
                    overwrite: true,
                });
            });
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    //     return (
    //         <div className="background-clouds">

    //             {CLOUDS.map((cloud) => (
    //                 <div
    //                     key={cloud.id}
    //                     className="cloud"
    //                     style={{
    //                         top: cloud.top,
    //                         left: cloud.left,
    //                         right: cloud.right,
    //                         width: `${cloud.width}px`,
    //                         "--duration": `${cloud.duration}s`,
    //                     }}
    //                 >
    //                     <Image
    //                         src={cloud.src}
    //                         alt=""
    //                         width={cloud.width}
    //                         height={200}
    //                     />
    //                 </div>
    //             ))}

    //         </div>
    //     );
    // }
    return (
        <div className="background-clouds">
            {CLOUDS.map((cloud) => (
                <div
                    key={cloud.id}
                    className="cloud"
                    data-depth={parseFloat(cloud.top) / 50}
                    data-side={cloud.left ? "left" : "right"}
                    style={{
                        top: cloud.top,
                        left: cloud.left,
                        right: cloud.right,
                        width: `${cloud.width}px`,
                    }}
                >
                    <Image
                        src={cloud.src}
                        alt="cloud"
                        width={cloud.width}
                        height={200}
                    />
                </div>
            ))}
        </div>
    );
}