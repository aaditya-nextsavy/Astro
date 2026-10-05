"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// things that get the "hover" state (orbit widens a little)
const INTERACTIVE = "a, button, [role='button'], label, select, summary, input[type='submit'], input[type='button']";

// geometry from /assets/cursor/cursor.svg, centred on (26, 26)
const RING_RADIUS = 25.2; // middle of the ring band — the Moon's path
const RING_WIDTH = 2.6; // band thickness (1px more than the original 1.6)
const MOON_START = -28.6; // degrees; where the Moon sits in the design (top right)

/**
 * Site cursor from /assets/cursor/cursor.svg: Earth in the centre, its ring, and the Moon
 * travelling clockwise round the ring. All of it is one element on the pointer, so Earth, ring
 * and Moon always move together. A click sends a black wave out of Earth.
 * Only on mouse/trackpad devices — touch keeps the native behaviour.
 */
export default function SiteCursor() {
    const cursorRef = useRef(null);

    useEffect(() => {
        if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

        const cursor = cursorRef.current;
        const root = document.documentElement;

        // click wave: black fills Earth from its centre, then a ring rolls outward and fades
        const fill = cursor.querySelector(".site-cursor__wave-fill");
        const ring = cursor.querySelector(".site-cursor__wave-ring");
        const wave = () => {
            gsap.timeline({ overwrite: true })
                .fromTo(fill, { scale: 0, opacity: 1 }, { scale: 1, duration: 0.22, ease: "power2.out" })
                .fromTo(ring, { scale: 1, opacity: 0.9 }, { scale: 3.2, opacity: 0, duration: 0.8, ease: "power2.out" }, 0.18)
                .to(fill, { opacity: 0, duration: 0.45, ease: "power1.out" }, 0.3);
        };

        const moveX = gsap.quickTo(cursor, "x", { duration: 0.08, ease: "power3.out" });
        const moveY = gsap.quickTo(cursor, "y", { duration: 0.08, ease: "power3.out" });

        let visible = false;
        const show = (on) => {
            if (visible === on) return;
            visible = on;
            gsap.to(cursor, { opacity: on ? 1 : 0, duration: 0.25, overwrite: "auto" });
        };

        const onMove = (e) => {
            if (!visible) {
                // first move: jump there instead of sliding in from the corner
                gsap.set(cursor, { x: e.clientX, y: e.clientY });
            }
            moveX(e.clientX);
            moveY(e.clientY);
            show(true);
        };

        const onOver = (e) => {
            const hovering = !!e.target.closest?.(INTERACTIVE);
            cursor.classList.toggle("is-hovering", hovering);
        };

        const onLeave = () => show(false);
        const onDown = () => {
            cursor.classList.add("is-pressed");
            wave();
        };
        const onUp = () => cursor.classList.remove("is-pressed");

        root.classList.add("has-site-cursor");
        window.addEventListener("pointermove", onMove, { passive: true });
        document.addEventListener("pointerover", onOver, { passive: true });
        document.addEventListener("pointerleave", onLeave);
        window.addEventListener("pointerdown", onDown);
        window.addEventListener("pointerup", onUp);
        window.addEventListener("blur", onLeave);

        return () => {
            root.classList.remove("has-site-cursor");
            window.removeEventListener("pointermove", onMove);
            document.removeEventListener("pointerover", onOver);
            document.removeEventListener("pointerleave", onLeave);
            window.removeEventListener("pointerdown", onDown);
            window.removeEventListener("pointerup", onUp);
            window.removeEventListener("blur", onLeave);
            gsap.killTweensOf([cursor, fill, ring]);
        };
    }, []);

    const outer = RING_RADIUS + RING_WIDTH / 2;
    const inner = RING_RADIUS - RING_WIDTH / 2;

    // viewBox padded by 6 on every side so the Moon is never clipped as it goes round
    return (
        <div ref={cursorRef} className="site-cursor" aria-hidden="true">
            {/* inner wrapper carries the overall size (CSS); the outer one is moved by GSAP */}
            <div className="site-cursor__body">
                {/* ring + Moon scale together on hover/press; Earth stays the same size */}
                <div className="site-cursor__orbit">
                    <svg width="64" height="64" viewBox="-6 -6 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* ring band with a thin black edge inside and out, as in the design */}
                        <circle cx="26" cy="26" r={RING_RADIUS} stroke="#D9D9D9" strokeWidth={RING_WIDTH} />
                        <circle cx="26" cy="26" r={outer - 0.25} stroke="black" strokeWidth="0.5" />
                        <circle cx="26" cy="26" r={inner + 0.25} stroke="black" strokeWidth="0.5" />
                    </svg>

                    {/* Moon: a layer the size of the orbit box (its centre = Earth's centre) that CSS
                        spins clockwise, carrying the Moon round on the middle of the ring band */}
                    <div className="site-cursor__moon-track" style={{ "--moon-start": `${MOON_START}deg` }}>
                        <svg width="64" height="64" viewBox="-6 -6 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx={26 + RING_RADIUS} cy="26" r="4.75" fill="white" stroke="black" strokeWidth="0.5" />
                        </svg>
                    </div>
                </div>

                <div className="site-cursor__earth">
                    <svg width="24" height="24" viewBox="14 14 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="26" cy="26" r="11.75" fill="white" stroke="black" strokeWidth="0.5" />
                    </svg>
                    <span className="site-cursor__wave-fill" />
                    <span className="site-cursor__wave-ring" />
                </div>
            </div>
        </div>
    );
}
