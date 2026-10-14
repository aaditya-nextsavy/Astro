"use client";

import { useEffect, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { FaChevronRight } from "react-icons/fa6";

const noopSubscribe = () => () => {};

const LINKS = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/gallery", label: "Gallery" },
    { href: "/#rudrakshaSection", label: "Rudraksha", scroll: false },
    { href: "/contact", label: "Contact" },
];

/**
 * Mobile header menu (opened from the burger button), shared by every page.
 * Rendered into <body> so no page wrapper (opacity / transform animations) can change
 * how its fixed position or background blur behave — it looks the same everywhere.
 */
export default function MobileMenu({ open, onClose }) {
    // portal target only exists in the browser: false on the server, true once hydrated
    const mounted = useSyncExternalStore(noopSubscribe, () => true, () => false);

    // lock the page behind the menu (body pinned in place, scroll position restored on close)
    useEffect(() => {
        if (!open) return;
        const scrollY = window.scrollY;
        const { style } = document.body;
        style.position = "fixed";
        style.top = `-${scrollY}px`;
        style.left = "0";
        style.right = "0";
        style.width = "100%";
        style.overflow = "hidden";
        return () => {
            style.position = "";
            style.top = "";
            style.left = "";
            style.right = "";
            style.width = "";
            style.overflow = "";
            window.scrollTo(0, scrollY);
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKeyDown = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open, onClose]);

    if (!mounted) return null;

    return createPortal(
        <div className={`mobile-drawer-menu ${open ? "open" : ""}`}>
            <div className="mobile-drawer-menu-backdrop" onClick={onClose} />

            <button
                type="button"
                className="mobile-drawer-menu-close"
                onClick={onClose}
                aria-label="Close menu"
                tabIndex={open ? 0 : -1}
            >
                <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M7.071 5.657L12.728 0L14.142 1.414L8.485 7.071L14.142 12.728L12.728 14.142L7.071 8.485L1.414 14.142L0 12.728L5.657 7.071L0 1.414L1.414 0.000999928L7.071 5.657Z" fill="currentColor" />
                </svg>
            </button>

            <div
                className="acharyaDrawerContent mobile-header-menu glass-effect-card"
                onClick={(e) => e.target.closest("a") && onClose()}
            >
                <div className="acharyaDrawerContent-bg-filter"></div>
                {LINKS.map(({ href, label, scroll }) => (
                    <Link key={label} href={href} scroll={scroll} tabIndex={open ? 0 : -1}>
                        <nav>{label}</nav>
                        <FaChevronRight />
                    </Link>
                ))}
            </div>
        </div>,
        document.body
    );
}
