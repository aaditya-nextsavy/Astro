"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { preload } from "react-dom";
import { STORY_MASK_STYLE } from "@/lib/maskStyles";

// Photos already loaded this session — these skip the loader
const loadedImages = new Set();
const listeners = new Set();

const markLoaded = (src) => {
    if (!src || loadedImages.has(src)) return;
    loadedImages.add(src);
    listeners.forEach((fn) => fn());
};

// Fetch drawer photos at high priority as soon as the page loads
// priority "low" for long lists (e.g. services) so they don't compete with the page itself
export function preloadDrawerImages(srcs, { priority = "high" } = {}) {
    srcs.forEach((src) => {
        preload(src, { as: "image", fetchPriority: priority });

        if (typeof window === "undefined" || loadedImages.has(src)) return;

        const img = new Image();
        img.fetchPriority = priority;
        img.onload = () => markLoaded(src);
        img.src = src;
    });
}

export default function AcharyaDrawer({
    isOpen,
    onClose,
    service,
    isLight = false,
    maskStyle = STORY_MASK_STYLE,
    forceMask = false, // mask every photo, not just `service.masked` ones
}) {

    const isMasked = forceMask || service?.masked;
    const [, rerender] = useState(0);

    useEffect(() => {
        const fn = () => rerender((n) => n + 1);
        listeners.add(fn);
        return () => listeners.delete(fn);
    }, []);

    const isImageLoaded = !!service?.image && loadedImages.has(service.image);

    // data links are already "/contact"; only prefix bare slugs ("contact")
    const rawLink = service?.link || "/contact";
    const href = /^(\/|https?:|mailto:|tel:)/.test(rawLink) ? rawLink : `/${rawLink}`;

    // Fade the body's top/bottom edges only where content is hidden behind them
    const bodyRef = useRef(null);
    const [fade, setFade] = useState({ top: false, bottom: false });

    const updateFade = useCallback(() => {
        const el = bodyRef.current;
        if (!el) return;
        const top = el.scrollTop > 1;
        const bottom = el.scrollTop + el.clientHeight < el.scrollHeight - 1;
        setFade((prev) => (prev.top === top && prev.bottom === bottom ? prev : { top, bottom }));
    }, []);

    useEffect(() => {
        const el = bodyRef.current;
        if (!el) return;
        const ro = new ResizeObserver(updateFade);
        ro.observe(el);
        return () => ro.disconnect();
    }, [updateFade]);

    // new content → back to the top
    useEffect(() => {
        if (bodyRef.current) bodyRef.current.scrollTop = 0;
        updateFade();
    }, [service, isOpen, updateFade]);

    useEffect(() => {
        if (!isOpen) return;

        // lock the page: native scroll + Lenis smooth scroll (only this drawer's body scrolls)
        document.body.style.overflow = "hidden";
        window.lenis?.stop();

        return () => {
            document.body.style.overflow = "";
            window.lenis?.start();
        };
    }, [isOpen]);


    return (
        <>
            <div
                data-lenis-prevent
                className={`acharyaDrawerOverlay ${isOpen
                    ? "acharyaDrawerOverlayOpen"
                    : ""
                    }`}
                onClick={onClose}
            />

            <aside
                data-lenis-prevent
                className={`acharyaDrawerPanel
    ${isOpen ? "acharyaDrawerPanelOpen" : ""}
    ${isLight ? "light" : ""}
  `}
            >
                <button
                    className={`acharyaDrawerClose  ${isLight ? "light" : ""}`}
                    onClick={onClose}
                >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.071 5.657L12.728 0L14.142 1.414L8.485 7.071L14.142 12.728L12.728 14.142L7.071 8.485L1.414 14.142L0 12.728L5.657 7.071L0 1.414L1.414 0.000999928L7.071 5.657Z" fill="currentColor" />
                    </svg>

                </button>

                <div className={`acharyaDrawerContent ${isLight ? "light" : ""} `}>


                    <div className="acharyaDrawerImage">
                        <div className="acharyaDrawerImageFrame">
                            {!isImageLoaded && (
                                <div className="acharyaDrawerImageLoader">
                                    <span />
                                </div>
                            )}

                            {/* key: fresh element per photo so the previous one never lingers */}
                            <img
                                key={service?.image}
                                ref={(el) => {
                                    // cached images can finish before onLoad is attached
                                    if (el?.complete && el.naturalWidth) markLoaded(service?.image);
                                }}
                                src={service?.image}
                                alt={service?.title}
                                className={isImageLoaded ? "loaded" : ""}
                                style={isMasked ? maskStyle : undefined}
                                onLoad={() => markLoaded(service?.image)}
                            />
                        </div>
                    </div>

                    <div
                        ref={bodyRef}
                        onScroll={updateFade}
                        className={`acharyaDrawerBody ${fade.top ? "fadeTop" : ""} ${fade.bottom ? "fadeBottom" : ""}`}
                    >
                        <h5>{service?.title}</h5>

                        <p>{service?.description}</p>

                        <p>
                            <strong>
                                {service?.highlight}
                            </strong>
                        </p>

                        <a className="acharyaDrawerContentBtn" href={href}>
                            Get in touch
                        </a>
                    </div>

                </div>



            </aside>
        </>
    );
}