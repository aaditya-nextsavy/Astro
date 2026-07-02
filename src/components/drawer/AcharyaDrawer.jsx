"use client";

import { useEffect } from "react";

export default function AcharyaDrawer({
    isOpen,
    onClose,
    service,
    isLight = false,
}) {

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


                    <img
                        src={service?.image}
                        alt={service?.title}
                    />
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



            </aside>
        </>
    );
}