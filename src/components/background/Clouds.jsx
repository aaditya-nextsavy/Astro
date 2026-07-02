"use client";

import { useLayoutEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const CLOUDS = [
    {
        id: 1,
        src: "/assets/background/cloud1.png",
        top: "5%",
        left: "-10%",
        width: "28vw",
        maxWidth: 500,
        duration: 20,
    },
    {
        id: 2,
        src: "/assets/background/cloud2.svg",
        top: "20%",
        left: "30%",
        width: "18vw",
        maxWidth: 350,
        duration: 30,
    },
    {
        id: 3,
        src: "/assets/background/cloud3.png",
        top: "30%",
        right: "-20%",
        width: "23vw",
        maxWidth: 250,
        duration: 30,
    },
    {
        id: 4,
        src: "/assets/background/cloud4.png",
        top: "30%",
        left: "-20%",
        width: "62vw",
        maxWidth: 1200,
        duration: 15,
    },
    {
        id: 5,
        src: "/assets/background/cloud5.png",
        top: "30%",
        right: "-30%",
        width: "65vw",
        maxWidth: 1250,
        duration: 25,
    },
];

export default function Clouds() {


    // useLayoutEffect(() => {
    //     let animations = [];

    //     const ctx = gsap.context(() => {
    //         const clouds = gsap.utils.toArray(".cloud");

    //         clouds.forEach((cloud) => {
    //             const side = cloud.dataset.side;
    //             const cloudWidth = cloud.offsetWidth;
    //             const screenWidth = window.innerWidth;

    //             const speed = gsap.utils.random(0.5, 12);
    //             const delay = gsap.utils.random(0, 1);

    //             let currentX = 0;

    //             const travelDistance =
    //                 screenWidth + cloudWidth + 250;

    //             const duration = travelDistance / speed;

    //             const animation = gsap.to(cloud, {
    //                 x:
    //                     side === "left"
    //                         ? `+=${travelDistance}`
    //                         : `-=${travelDistance}`,

    //                 duration,
    //                 delay,
    //                 ease: "none",
    //                 repeat: -1,
    //                 repeatDelay: gsap.utils.random(0, 3),

    //                 onRepeat: () => {
    //                     gsap.set(cloud, {
    //                         x:
    //                             side === "left"
    //                                 ? -cloudWidth - 250
    //                                 : screenWidth + cloudWidth + 250,
    //                     });

    //                     currentX =
    //                         side === "left"
    //                             ? -cloudWidth - 250
    //                             : screenWidth + cloudWidth + 250;

    //                     animation.vars.x =
    //                         side === "left"
    //                             ? currentX + travelDistance
    //                             : currentX - travelDistance;
    //                 },
    //             });

    //             animations.push(animation);

    //             gsap.to(cloud, {
    //                 yPercent: -Number(cloud.dataset.depth) * 30,
    //                 ease: "none",

    //                 scrollTrigger: {
    //                     trigger: document.body,
    //                     start: "top top",
    //                     end: "bottom bottom",
    //                     scrub: 1.5,
    //                 },
    //             });
    //         });
    //     });

    //     return () => {
    //         animations.forEach((anim) => anim.kill());
    //         ctx.revert();
    //     };
    // }, []);

    useLayoutEffect(() => {
        const animations = [];

        const ctx = gsap.context(() => {
            const clouds = gsap.utils.toArray(".cloud");

            const CLOUD_SPEED = 6; // px/sec (adjust to your liking)

            clouds.forEach((cloud) => {
                const side = cloud.dataset.side;
                const cloudWidth = cloud.offsetWidth;
                const screenWidth = window.innerWidth;

                const travelDistance =
                    screenWidth + cloudWidth + 250;

                const duration = travelDistance / CLOUD_SPEED;

                let currentX = 0;

                const animation = gsap.to(cloud, {
                    x:
                        side === "left"
                            ? `+=${travelDistance}`
                            : `-=${travelDistance}`,

                    duration,
                    ease: "none",
                    repeat: -1,
                    repeatDelay: 0,

                    onRepeat: () => {
                        gsap.set(cloud, {
                            x:
                                side === "left"
                                    ? -cloudWidth - 250
                                    : screenWidth + cloudWidth + 250,
                        });

                        currentX =
                            side === "left"
                                ? -cloudWidth - 250
                                : screenWidth + cloudWidth + 250;

                        animation.vars.x =
                            side === "left"
                                ? currentX + travelDistance
                                : currentX - travelDistance;
                    },
                });

                animations.push(animation);

                gsap.to(cloud, {
                    yPercent: -Number(cloud.dataset.depth) * 30,
                    ease: "none",
                    scrollTrigger: {
                        trigger: document.body,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1.5,
                    },
                });
            });
        });

        return () => {
            animations.forEach((anim) => anim.kill());
            ctx.revert();
        };
    }, []);


    return (
        <div className="background-clouds">
            {CLOUDS.map((cloud) => (
                <div
                    key={cloud.id}
                    className={`cloud cloud-${cloud.id}`}
                    data-depth={parseFloat(cloud.top) / 50}
                    data-side={cloud.left ? "left" : "right"}
                    style={{
                        top: cloud.top,
                        left: cloud.left,
                        right: cloud.right,
                        width: cloud.width,
                        maxWidth: `${cloud.maxWidth}px`,
                    }}
                >
                    <img
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