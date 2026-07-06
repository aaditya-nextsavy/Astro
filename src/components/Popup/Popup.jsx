"use client";

import { createPortal } from "react-dom";

export default function Popup({
    open,
    title,
    message,
    type,
    onClose,
}) {
    if (!open || typeof document === "undefined") return null;

    return createPortal(
        <div
            className="footerpopup popup-overlay fixed inset-0 z-[10050] flex items-center justify-center bg-black/40 backdrop-blur-md px-6"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
            aria-label={title || "Notification"}
        >
            <div
                className="popup-card glass-effect-card relative w-[90%] max-w-[600px] rounded-[28px] text-center p-14"
                onClick={(e) => e.stopPropagation()}
            >
                <h3 className="mb-3 text-3xl font-semibold text-white">
                    {title}
                </h3>

                <p className="mb-8 text-white/70 leading-7">
                    {message}
                </p>

                <button
                    onClick={onClose}
                    className="footer-btn"
                >
                    {type === "success" ? "Done" : "Try Again"}
                </button>
            </div>
        </div>,
        document.body
    );
}
