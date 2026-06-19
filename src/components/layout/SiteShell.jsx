"use client";

import GlobalLoader from "./GlobalLoader";
import SiteNav from "./SiteNav";

export default function SiteShell() {
    return (
        <>
            <GlobalLoader />
            <SiteNav />
        </>
    );
}