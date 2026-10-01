"use client";

import { useCallback, useEffect, useRef, useState } from "react";

// Refetch when the drawer is reopened after this long
const STALE_MS = 15 * 60 * 1000;

const IST = "Asia/Kolkata";

// "06:27:14" → "6:27 AM"
const formatClock = (hms) => {
    if (!hms) return "—";
    const [h, m] = hms.split(":").map(Number);
    const hour = ((h % 24) + 11) % 12 + 1;
    return `${hour}:${String(m).padStart(2, "0")} ${h % 24 < 12 ? "AM" : "PM"}`;
};

// ISO end time → "7:38 AM", flagged when it runs past the panchang day
const formatEnds = (iso, panchangDate) => {
    if (!iso) return "—";
    const date = new Date(iso);
    const time = new Intl.DateTimeFormat("en-IN", {
        timeZone: IST,
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    }).format(date).toUpperCase();
    const day = new Intl.DateTimeFormat("en-CA", { timeZone: IST }).format(date);
    return day > panchangDate ? `${time} (next day)` : time;
};

const formatDate = (ymd) =>
    new Intl.DateTimeFormat("en-IN", {
        timeZone: IST,
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(`${ymd}T12:00:00+05:30`));

function Row({ label, value, note }) {
    return (
        <div className="divineTimeRow">
            <span className="divineTimeLabel">{label}</span>
            <span className="divineTimeValue">
                {value}
                {note && <small>{note}</small>}
            </span>
        </div>
    );
}

function Section({ title, children }) {
    return (
        <section className="divineTimeSection">
            <h6>{title}</h6>
            {children}
        </section>
    );
}

export default function DivineTimeDrawer({ isOpen, onClose, isLight = false }) {
    const [state, setState] = useState({ status: "idle", data: null, city: "", at: 0 });

    const load = useCallback(async () => {
        setState((prev) => ({ ...prev, status: "loading" }));
        try {
            const res = await fetch("/api/panchang");
            const json = await res.json();
            if (!res.ok || !json.success) throw new Error(json.message);
            setState({ status: "ready", data: json.data, city: json.city, at: Date.now() });
        } catch {
            setState((prev) => ({ ...prev, status: "error" }));
        }
    }, []);

    // fetch on first open, and again if what we have has gone stale (or failed)
    const stateRef = useRef(state);
    useEffect(() => {
        stateRef.current = state;
    }, [state]);

    useEffect(() => {
        if (!isOpen) return;
        const { status, at } = stateRef.current;
        if (status === "loading") return;
        if (status === "ready" && Date.now() - at < STALE_MS) return;
        load();
    }, [isOpen, load]);

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

    useEffect(() => {
        if (bodyRef.current) bodyRef.current.scrollTop = 0;
        updateFade();
    }, [state.status, isOpen, updateFade]);

    useEffect(() => {
        if (!isOpen) return;

        // lock the page: native scroll + Lenis smooth scroll (only this drawer's body scrolls)
        document.body.style.overflow = "hidden";
        window.lenis?.stop();

        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);

        return () => {
            document.body.style.overflow = "";
            window.lenis?.start();
            window.removeEventListener("keydown", onKey);
        };
    }, [isOpen, onClose]);

    const { data, city } = state;
    const now = data?.request_time_panchang;

    return (
        <>
            <div
                data-lenis-prevent
                className={`acharyaDrawerOverlay ${isOpen ? "acharyaDrawerOverlayOpen" : ""}`}
                onClick={onClose}
            />

            <aside
                data-lenis-prevent
                aria-hidden={!isOpen}
                className={`acharyaDrawerPanel ${isOpen ? "acharyaDrawerPanelOpen" : ""} ${isLight ? "light" : ""}`}
            >
                <button
                    className={`acharyaDrawerClose  ${isLight ? "light" : ""}`}
                    onClick={onClose}
                    aria-label="Close"
                >
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M7.071 5.657L12.728 0L14.142 1.414L8.485 7.071L14.142 12.728L12.728 14.142L7.071 8.485L1.414 14.142L0 12.728L5.657 7.071L0 1.414L1.414 0.000999928L7.071 5.657Z" fill="currentColor" />
                    </svg>
                </button>

                <div className={`acharyaDrawerContent divineTimeContent ${isLight ? "light" : ""}`}>
                    <header className="divineTimeHeader">
                        <h5>Divine Time</h5>
                        <p>
                            {data
                                ? `${data.weekday?.name}, ${formatDate(data.date)} · ${city}`
                                : "Today's Panchang"}
                        </p>
                    </header>

                    <div
                        ref={bodyRef}
                        onScroll={updateFade}
                        className={`acharyaDrawerBody divineTimeBody ${fade.top ? "fadeTop" : ""} ${fade.bottom ? "fadeBottom" : ""}`}
                    >
                        {!data && state.status !== "error" && (
                            <div className="divineTimeStatus">
                                <div className="acharyaDrawerImageLoader">
                                    <span />
                                </div>
                            </div>
                        )}

                        {!data && state.status === "error" && (
                            <div className="divineTimeStatus">
                                <p>We couldn&apos;t read the heavens just now.</p>
                                <button type="button" className="divineTimeRetry" onClick={load}>
                                    Try again
                                </button>
                            </div>
                        )}

                        {data && (
                            <>
                                {now && (
                                    <Section title="Right now">
                                        <Row label="Tithi" value={`${now.tithi?.paksha} ${now.tithi?.name}`} />
                                        <Row label="Nakshatra" value={now.nakshatra?.name} note={`Pada ${now.nakshatra?.pada} · Lord ${now.nakshatra?.lord}`} />
                                        <Row label="Yoga" value={now.yoga?.name} />
                                        <Row label="Karana" value={now.karana?.name} />
                                        <Row label="Moon sign" value={now.moon_sign?.name} />
                                        <Row label="Sun sign" value={now.sun_sign?.name} />
                                    </Section>
                                )}

                                <Section title="Sun">
                                    <Row label="Sunrise" value={formatClock(data.sunrise)} />
                                    <Row label="Sunset" value={formatClock(data.sunset)} />
                                </Section>

                                <Section title="Today's Panchang">
                                    <Row
                                        label="Tithi"
                                        value={`${data.tithi?.paksha} ${data.tithi?.name}`}
                                        note={`until ${formatEnds(data.tithi?.ends_at_iso, data.date)}`}
                                    />
                                    <Row
                                        label="Nakshatra"
                                        value={data.nakshatra?.name}
                                        note={`until ${formatEnds(data.nakshatra?.ends_at_iso, data.date)}`}
                                    />
                                    <Row
                                        label="Yoga"
                                        value={data.yoga?.name}
                                        note={`until ${formatEnds(data.yoga?.ends_at_iso, data.date)}`}
                                    />
                                    {data.karanas?.map((k, i) => (
                                        <Row
                                            key={`${k.number}-${i}`}
                                            label={i === 0 ? "Karana" : ""}
                                            value={k.name}
                                            note={`until ${formatEnds(k.ends_at_iso, data.date)}`}
                                        />
                                    ))}
                                </Section>

                                {data.rahu_kalam && (
                                    <Section title="Rahu Kalam">
                                        <Row
                                            label="Avoid new beginnings"
                                            value={`${formatClock(data.rahu_kalam.start)} – ${formatClock(data.rahu_kalam.end)}`}
                                        />
                                    </Section>
                                )}

                                {data.lunar_month && (
                                    <Section title="Hindu Calendar">
                                        <Row label="Lunar month" value={data.lunar_month.name} note={data.lunar_month.amanta ? "Amanta" : "Purnimanta"} />
                                        <Row label="Vikram Samvat" value={data.lunar_month.vikram_samvat} />
                                    </Section>
                                )}

                                <a className="acharyaDrawerContentBtn" href="/contact">
                                    Get in touch
                                </a>
                            </>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}
