import { NextResponse } from "next/server";

const PANCHANG_URL = "https://api.freeastroapi.com/api/v2/vedic/panchang";

// Office in Thaltej, Ahmedabad — the panchang is calculated for this place
const LOCATION = {
    city: "Ahmedabad",
    lat: 23.0504,
    lng: 72.5175,
    tz_str: "Asia/Kolkata",
};

// One upstream call per 30 min at most; the "right now" values barely move inside that
const CACHE_MS = 30 * 60 * 1000;
let cache = null; // { at, data }
let inflight = null;

// Current date/time parts in IST, whatever timezone the server runs in
const nowInIST = () => {
    const parts = Object.fromEntries(
        new Intl.DateTimeFormat("en-GB", {
            timeZone: LOCATION.tz_str,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            hourCycle: "h23",
        })
            .formatToParts(new Date())
            .map(({ type, value }) => [type, Number(value)])
    );

    return {
        year: parts.year,
        month: parts.month,
        day: parts.day,
        hour: parts.hour,
        minute: parts.minute,
    };
};

const fetchPanchang = async (apiKey) => {
    const res = await fetch(PANCHANG_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey,
        },
        body: JSON.stringify({
            ...nowInIST(),
            ...LOCATION,
            ayanamsha: "lahiri",
            node_type: "mean",
            lang: "en",
        }),
        cache: "no-store",
    });

    if (!res.ok) {
        const detail = await res.text().catch(() => "");
        throw new Error(`Panchang API ${res.status}: ${detail.slice(0, 200)}`);
    }

    return res.json();
};

export async function GET() {
    const apiKey = process.env.FREE_ASTRO_API_KEY;

    if (!apiKey) {
        return NextResponse.json(
            { success: false, message: "Panchang is not configured." },
            { status: 500 }
        );
    }

    if (cache && Date.now() - cache.at < CACHE_MS) {
        return NextResponse.json({ success: true, city: LOCATION.city, data: cache.data });
    }

    try {
        // share one upstream request between visitors who open the drawer at the same time
        inflight ??= fetchPanchang(apiKey).finally(() => {
            inflight = null;
        });
        const data = await inflight;
        cache = { at: Date.now(), data };

        return NextResponse.json({ success: true, city: LOCATION.city, data });
    } catch (err) {
        console.error(err);

        // stale data beats an empty drawer
        if (cache) {
            return NextResponse.json({ success: true, city: LOCATION.city, data: cache.data });
        }

        return NextResponse.json(
            { success: false, message: "Could not load today's panchang." },
            { status: 502 }
        );
    }
}
