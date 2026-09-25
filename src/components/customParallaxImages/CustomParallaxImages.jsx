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
    // optional per-image masks, e.g. { "/assets/home/x.png": "/assets/background/circular-mask.png" }
    imageMasks = {},

}) {

    const perImageMask = images.some((img) => imageMasks[img]);
    const maskStyle = (src) => ({
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
    });

    // per-image masks carry their own fit (same as .cpp-mask) so they don't depend on extra CSS
    const imageMaskStyle = (src) => ({
        ...maskStyle(src),
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
    });

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
                    // with per-image masks each image carries its own mask instead of the shared one
                    style={perImageMask ? undefined : maskStyle(maskImage)}
                >

                    {images.map((img, index) => (

                        <img
                            key={index}
                            ref={(el) => (imageRefs.current[index] = el)}
                            src={img}
                            className={`cpp-subject ${perImageMask ? "cpp-subject-masked" : ""}`}
                            style={perImageMask ? imageMaskStyle(imageMasks[img] ?? maskImage) : undefined}
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