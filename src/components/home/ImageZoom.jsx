"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ImageZoom() {
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const leftTextRef = useRef(null);
    const rightTextRef = useRef(null);
    const image1Ref = useRef(null); // zoom1
    const image2Ref = useRef(null); // zoom2
    const image3Ref = useRef(null); // zoom3





    useLayoutEffect(() => {

        const getInitialSize = () => {
            const w = window.innerWidth;

            if (w <= 575) return { width: 180, height: 100 };
            if (w <= 767) return { width: 240, height: 125 };
            if (w <= 991) return { width: 250, height: 130 };
            if (w <= 1199) return { width: 280, height: 148 };

            return { width: 334.222, height: 188 };
        };

        const { width, height } = getInitialSize();



        const ctx = gsap.context(() => {

            gsap.set(imageRef.current, {
                width,
                height,
                borderRadius: 500,
                opacity: 1,
                overflow: "hidden",
            });

            let currentImage = 3;

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=1200",
                    scrub: 0.5,
                    pin: true,

                    onUpdate: (self) => {
                        const p = self.progress;

                        if (p < 0.13) {
                            gsap.to(image3Ref.current, { opacity: 1, duration: 0.5, overwrite: true });
                            gsap.to(image2Ref.current, { opacity: 0, duration: 0.5, overwrite: true });
                            gsap.to(image1Ref.current, { opacity: 0, duration: 0.5, overwrite: true });
                        }

                        else if (p < 0.43) {
                            gsap.to(image3Ref.current, { opacity: 0, duration: 0.5, overwrite: true });
                            gsap.to(image2Ref.current, { opacity: 1, duration: 0.5, overwrite: true });
                            gsap.to(image1Ref.current, { opacity: 0, duration: 0.5, overwrite: true });
                        }

                        else {
                            gsap.to(image3Ref.current, { opacity: 0, duration: 0.5, overwrite: true });
                            gsap.to(image2Ref.current, { opacity: 0, duration: 0.5, overwrite: true });
                            gsap.to(image1Ref.current, { opacity: 1, duration: 0.5, overwrite: true });
                        }
                    }
                }
            });

            tl.to(
                leftTextRef.current,
                {
                    x: -400,
                    opacity: 0,
                    ease: "none",
                },
                0
            );

            tl.to(
                rightTextRef.current,
                {
                    x: 400,
                    opacity: 0,
                    ease: "none",
                },
                0
            );

            tl.to(
                imageRef.current,
                {
                    width: "100vw",
                    height: "100vh",
                    borderRadius: 0,
                    ease: "none",
                },
                0
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <div ref={sectionRef} className="image-zoom-section">

            {/* <img
                src="/assets/background/cloud1.png"
                alt="clouds"
                className="section-layer-image"
            /> */}


            <div className="light-background-bg">

                <img
                    className="light-background-cloud cloud-1"
                    src="/assets/background/white-bg-cloud-1.png"
                    alt=""
                />

                <img
                    className="light-background-cloud cloud-2"
                    src="/assets/background/white-bg-cloud-2.png"
                    alt=""
                />

                <img
                    className="light-background-cloud cloud-3"
                    src="/assets/background/white-bg-cloud-3.png"
                    alt=""
                />

                <div className="light-background-overlay" />

            </div>



            <div className="image-zoom-inner">

                <h2
                    ref={leftTextRef}
                    className="image-zoom-left"
                >
                    Crafting Spaces.
                </h2>

                {/* <img
                    ref={imageRef}
                    src="/assets/home/imageZoom1.jpg"
                    alt="Temple"
                    className="zoom-image"
                /> */}
                <div ref={imageRef} className="zoom-image-wrapper">
                    <img
                        ref={image3Ref}
                        src="/assets/home/imageZoom3.png"
                        className="zoom-image"
                        alt=""
                    />

                    <img
                        ref={image2Ref}
                        src="/assets/home/imageZoom2.png"
                        className="zoom-image"
                        alt=""
                    />

                    <img
                        ref={image1Ref}
                        src="/assets/home/imageZoom1.jpg"
                        className="zoom-image"
                        alt=""
                    />
                </div>


                <h2
                    ref={rightTextRef}
                    className="image-zoom-right"
                >
                    Transforming Lives.
                </h2>

            </div>
        </div>
    );
}