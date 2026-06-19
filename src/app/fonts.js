import localFont from "next/font/local";

export const newYork = localFont({
    src: "../assets/fonts/newYork/NewYork.otf",
    variable: "--font-new-york",
    display: "swap",
});



export const satoshi = localFont({
    src: [
        {
            path: "../assets/fonts/Satoshi/Satoshi-Light.otf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../assets/fonts/Satoshi/Satoshi-Regular.otf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../assets/fonts/Satoshi/Satoshi-Medium.otf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../assets/fonts/Satoshi/Satoshi-Bold.otf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../assets/fonts/Satoshi/Satoshi-Black.otf",
            weight: "900",
            style: "normal",
        },
    ],

    variable: "--font-satoshi",

    display: "swap",
});