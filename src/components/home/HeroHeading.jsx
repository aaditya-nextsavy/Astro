"use client";

import { Fragment, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

// hover: letters within RIPPLE_RADIUS px of the pointer rise, up to RIPPLE_LIFT px right under it
const RIPPLE_RADIUS = 90;
const RIPPLE_LIFT = 4;

// first letter of every word upper-case (CSS `capitalize` can't do it here: each letter
// is its own inline-block, so CSS would treat every letter as a word start)
const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

/**
 * Heading that sits "underwater":
 * - every letter floats on a slow wave (CSS, staggered per letter)
 * - letters near the pointer rise gently and settle as it moves on (GSAP quickTo)
 * Letters float on the outer span and ripple on the inner one, so the two never fight.
 *
 * `as` picks the tag; `lineClassName` renders each line as its own <span> (for headings
 * that lay lines out themselves), otherwise lines are separated with <br />.
 */
export default function HeroHeading({ lines, className = "", as: Tag = "h1", lineClassName }) {
    const headingRef = useRef(null);

    useEffect(() => {
        const heading = headingRef.current;
        if (!heading) return;
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        // touch has no hover; a tap ripple would fire on scroll too
        if (!window.matchMedia("(hover: hover)").matches) return;

        const letters = [...heading.querySelectorAll(".hero-letter__inner")];
        // one reusable tween per letter: every pointer move just retargets it, so nothing
        // stacks up or fights however fast the pointer travels
        const lifts = letters.map((letter) => gsap.quickTo(letter, "y", { duration: 0.25, ease: "power3.out" }));

        let centres = [];
        let frame = 0;
        let pointer = null;

        // letter centres, measured on entry (the float only moves them a pixel or two)
        const measure = () => {
            centres = letters.map((letter) => {
                const r = letter.getBoundingClientRect();
                return [r.left + r.width / 2, r.top + r.height / 2];
            });
        };

        const update = () => {
            frame = 0;
            // the pointer can already be over the heading on load, so a move may come before any enter
            if (pointer && centres.length !== letters.length) measure();
            letters.forEach((_, i) => {
                let lift = 0;
                if (pointer) {
                    const [cx, cy] = centres[i];
                    const dx = (pointer.x - cx) / RIPPLE_RADIUS;
                    const dy = (pointer.y - cy) / (RIPPLE_RADIUS * 1.5);
                    const d = Math.sqrt(dx * dx + dy * dy);
                    // smooth bell: full lift under the pointer, easing to 0 at the radius
                    if (d < 1) lift = -RIPPLE_LIFT * (0.5 + 0.5 * Math.cos(Math.PI * d));
                }
                lifts[i](lift);
            });
        };

        const schedule = () => {
            if (!frame) frame = requestAnimationFrame(update);
        };

        // re-measure on every entry: the page may have scrolled since the last hover
        const onEnter = () => measure();
        const onMove = (e) => {
            pointer = { x: e.clientX, y: e.clientY };
            schedule();
        };
        const onLeave = () => {
            pointer = null;
            schedule();
        };

        heading.addEventListener("pointerenter", onEnter);
        heading.addEventListener("pointermove", onMove);
        heading.addEventListener("pointerleave", onLeave);

        return () => {
            heading.removeEventListener("pointerenter", onEnter);
            heading.removeEventListener("pointermove", onMove);
            heading.removeEventListener("pointerleave", onLeave);
            cancelAnimationFrame(frame);
            gsap.killTweensOf(letters);
        };
    }, []);

    let letterIndex = 0;

    const renderLine = (line) =>
        line.split(" ").filter(Boolean).map((word, wordIndex, words) => (
            <Fragment key={wordIndex}>
                {/* words stay whole so a line never breaks mid-word */}
                <span className="hero-word" aria-hidden="true">
                    {[...capitalize(word)].map((char, charIndex) => {
                        const i = letterIndex++;
                        return (
                            <span key={charIndex} className="hero-letter" style={{ "--i": i }}>
                                <span className="hero-letter__inner">{char}</span>
                            </span>
                        );
                    })}
                </span>
                {wordIndex < words.length - 1 ? " " : ""}
            </Fragment>
        ));

    return (
        <Tag ref={headingRef} className={className} aria-label={lines.map((l) => l.split(" ").map(capitalize).join(" ")).join(" ")}>
            {lines.map((line, lineIndex) =>
                lineClassName !== undefined ? (
                    <span key={lineIndex} className={lineClassName}>
                        {renderLine(line)}
                    </span>
                ) : (
                    <Fragment key={lineIndex}>
                        {lineIndex > 0 && <br />}
                        {renderLine(line)}
                    </Fragment>
                )
            )}
        </Tag>
    );
}
