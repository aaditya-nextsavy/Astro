"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { gsap } from "@/lib/gsap";

// same cream + curved edges as the home page's light takeover section
const ARC_PATH =
    "M0.371094 83.8028C0.371094 83.8028 396.871 7.98401 967.371 2.33315C1537.87 -3.31771 1924.87 64.792 1924.87 64.792";
const CURVE_PATH =
    "M969 2.33314C398.5 7.984 2 83.8028 2 83.8028V225.5H1926.5V64.792C1926.5 64.792 1539.5 -3.31772 969 2.33314Z";

// how long the new page has to settle (scroll reset, pins) before the panel lifts
const SETTLE_MS = 180;
// if the route never changes (error, offline) don't leave the screen covered
const MAX_WAIT_MS = 8000;

/**
 * Page transition: on an internal link click a cream panel rises from the bottom and
 * covers the screen, the route changes behind it, then the panel carries on up and off,
 * revealing the new page sitting still at its starting position.
 */
export default function PageTransition() {
    const router = useRouter();
    const pathname = usePathname();
    const panelRef = useRef(null);
    const busy = useRef(false);
    // resolves once the new route has rendered
    const arrived = useRef(null);

    // route changed → let the waiting transition know
    useEffect(() => {
        arrived.current?.();
        arrived.current = null;
    }, [pathname]);

    useEffect(() => {
        const panel = panelRef.current;
        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        // the curves stick out above/below the panel, so travel a full screen plus the biggest overhang
        const offscreen = () => {
            const box = panel.getBoundingClientRect();
            let overhang = 0;
            panel.querySelectorAll(":scope > svg").forEach((svg) => {
                const r = svg.getBoundingClientRect();
                overhang = Math.max(overhang, box.top - r.top, r.bottom - box.bottom);
            });
            return window.innerHeight + overhang + 4;
        };

        const waitForRoute = () =>
            new Promise((resolve) => {
                const timer = setTimeout(resolve, MAX_WAIT_MS);
                arrived.current = () => {
                    clearTimeout(timer);
                    resolve();
                };
            });

        // "#section" → that section, no hash → top of the page
        const scrollWithinPage = (hash) => {
            const id = decodeURIComponent(hash.replace("#", ""));
            const target = id ? document.getElementById(id) : 0;
            if (target === null) return;

            if (window.lenis) {
                window.lenis.scrollTo(target, { offset: target ? -60 : 0, duration: 1.6, force: true });
            } else if (target) {
                target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
            } else {
                window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
            }
        };

        const transitionTo = async (href) => {
            busy.current = true;
            window.lenis?.stop();
            router.prefetch(href);

            // 1. rise from the bottom and cover the screen
            gsap.set(panel, { y: offscreen(), visibility: "visible" });
            await gsap.to(panel, { y: 0, duration: 0.75, ease: "power3.inOut" });

            // 2. change page behind it
            const route = waitForRoute();
            router.push(href);
            await route;
            await new Promise((r) => setTimeout(r, SETTLE_MS));

            // 3. carry on up and away, uncovering the new page
            window.lenis?.start();
            await gsap.to(panel, { y: -offscreen(), duration: 0.75, ease: "power3.inOut" });
            gsap.set(panel, { visibility: "hidden" });
            busy.current = false;
        };

        // one listener for every internal link (<Link> and plain <a>), in the capture phase so
        // it runs before Next's Link — preventDefault here also stops Link's own navigation
        const onClick = (e) => {
            if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

            const link = e.target.closest?.("a[href]");
            if (!link || link.hasAttribute("download")) return;
            if (link.target && link.target !== "_self") return;

            const url = new URL(link.href, window.location.href);
            if (url.origin !== window.location.origin) return;
            // same page (e.g. Home or /#rudrakshaSection while already on "/"): no route change
            // happens, so Next won't move anything — scroll there ourselves, no cover
            if (url.pathname === window.location.pathname) {
                e.preventDefault();
                scrollWithinPage(url.hash);
                return;
            }

            e.preventDefault();
            if (busy.current) return;

            const href = url.pathname + url.search + url.hash;
            if (reduceMotion) {
                router.push(href);
                return;
            }
            transitionTo(href);
        };

        document.addEventListener("click", onClick, true);
        return () => document.removeEventListener("click", onClick, true);
    }, [router]);

    return (
        <div ref={panelRef} className="page-transition" aria-hidden="true">
            {/* before/after edges: the same arc line + dome pair (and classes) as the home takeover */}
            <svg className="light-background-content-top curve-1" width="1926" height="86" viewBox="0 0 1926 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={ARC_PATH} stroke="#F3E9D8" strokeWidth="4" />
            </svg>
            <svg className="light-background-content-top curve-2" width="1929" height="228" viewBox="0 0 1929 228" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={CURVE_PATH} fill="#F3E9D8" stroke="#F3E9D8" strokeWidth="4" />
            </svg>
            <svg className="light-background-content-bottom curve-1" width="1926" height="86" viewBox="0 0 1926 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={ARC_PATH} stroke="#F3E9D8" strokeWidth="4" />
            </svg>
            <svg className="light-background-content-bottom curve-2" width="1929" height="228" viewBox="0 0 1929 228" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d={CURVE_PATH} fill="#F3E9D8" stroke="#F3E9D8" strokeWidth="4" />
            </svg>

            {/* faint clouds, as in the image-zoom section */}
            <div className="page-transition__clouds">
                <img className="light-background-cloud cloud-1" src="/assets/background/white-bg-cloud-1.webp" alt="" />
                <img className="light-background-cloud cloud-2" src="/assets/background/white-bg-cloud-2.webp" alt="" />
                <img className="light-background-cloud cloud-3" src="/assets/background/white-bg-cloud-3.webp" alt="" />
            </div>
        </div>
    );
}
