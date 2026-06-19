"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

const Beam = () => {


    const beamsRef = useRef(null);

    useEffect(() => {

        gsap.to(".beam-main", {
            x: 15,
            duration: 20,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });

        gsap.to(".beam-secondary", {
            x: -10,
            duration: 30,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
        });

    }, []);

    return (
        <div className="background-beams" ref={beamsRef}>
            <div className="beam beam-main" />
            <div className="beam beam-secondary" />
        </div>
    )
}

export default Beam