"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function CustomParallaxImages({

    images = [],
    activeIndex = 0,

    bgImage = "/assets/customParallaxImage/cpp-bg.png",
    bgImageLight = "/assets/customParallaxImage/cpp-bg-light.png",
    maskImage = "/assets/customParallaxImage/circle.png",
    bgmaskImage = "/assets/customParallaxImage/circle.png",
    showGlow = false,
    showBgMask = true,
    glowColor = "#5DA4D9",
    bgLight = false,

}) {

    const sectionRef = useRef(null);
    const imageRefs = useRef([]);

    useLayoutEffect(() => {

        if (!imageRefs.current.length) return;

        gsap.to(imageRefs.current, {
            autoAlpha: 0,
            duration: 0.45,
            overwrite: true,
        });

        gsap.to(imageRefs.current[activeIndex], {
            autoAlpha: 1,
            duration: 0.45,
            overwrite: true,
        });

    }, [activeIndex]);

    return (

        <div
            ref={sectionRef}
            className="custom-parallax-images"
        >

            <div className="cpp-stage">

                <div
                    className="cpp-bg-mask"
                    style={{
                        WebkitMaskImage: showBgMask ? `url(${bgmaskImage})` : "none",
                        maskImage: showBgMask ? `url(${bgmaskImage})` : "none",
                    }}
                >
                    <img
                        src={bgLight ? bgImageLight : bgImage}
                        className="cpp-bg"
                        alt=""
                    />
                </div>

                {showGlow && (
                    <div
                        className="cpp-glow"
                        style={{
                            background: glowColor,
                        }}
                    />
                )}

                <div
                    className="cpp-mask"
                    style={{
                        WebkitMaskImage: `url(${maskImage})`,
                        maskImage: `url(${maskImage})`,
                    }}
                >

                    {images.map((img, index) => (

                        <img
                            key={index}
                            ref={(el) => (imageRefs.current[index] = el)}
                            src={img}
                            className="cpp-subject"
                            alt=""
                        />

                    ))}

                </div>

                {/* <img
                    src="/assets/customParallaxImage/cloud-ring.png"
                    className="cpp-cloud-ring"
                    alt=""
                /> */}

            </div>

        </div>

    );

}