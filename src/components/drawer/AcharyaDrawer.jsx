"use client";

import { useEffect, useState } from "react";
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
}) {

    const [, rerender] = useState(0);

    useEffect(() => {
        const fn = () => rerender((n) => n + 1);
        listeners.add(fn);
        return () => listeners.delete(fn);
    }, []);

    const isImageLoaded = !!service?.image && loadedImages.has(service.image);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);


    return (
        <>
            <div
                className={`acharyaDrawerOverlay ${isOpen
                    ? "acharyaDrawerOverlayOpen"
                    : ""
                    }`}
                onClick={onClose}
            />

            <aside
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
                        <div className={`acharyaDrawerImageFrame ${service?.masked ? "is-masked" : ""}`}>
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
                                style={service?.masked ? STORY_MASK_STYLE : undefined}
                                onLoad={() => markLoaded(service?.image)}
                            />
                        </div>
                    </div>

                    <div className="acharyaDrawerBody">
                        <h5>{service?.title}</h5>

                        <p>{service?.description}</p>

                        <p>
                            <strong>
                                {service?.highlight}
                            </strong>
                        </p>

                        <a className="acharyaDrawerContentBtn" href={`/${service?.link}`}>
                            Get in touch
                        </a>
                    </div>

                </div>



            </aside>
        </>
    );
}