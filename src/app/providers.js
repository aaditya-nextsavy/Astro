"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { PopupProvider } from "@/components/Popup/PopupProvider";

export default function Providers({ children }) {
    return (
        <GoogleReCaptchaProvider
            reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
        >
            <PopupProvider>{children}</PopupProvider>
        </GoogleReCaptchaProvider>
    );
}
