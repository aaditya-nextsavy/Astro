"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Popup from "./Popup";

const PopupContext = createContext(null);

const initialPopupState = {
    open: false,
    type: "success",
    title: "",
    message: "",
};

export function PopupProvider({ children }) {
    const [popup, setPopup] = useState(initialPopupState);

    const showPopup = ({
        type = "success",
        title = "",
        message = "",
    }) => {
        setPopup({
            open: true,
            type,
            title,
            message,
        });
    };

    const hidePopup = () => {
        setPopup((prev) => ({
            ...prev,
            open: false,
        }));
    };

    useEffect(() => {
        if (!popup.open || popup.type !== "success") {
            return;
        }

        const timer = setTimeout(() => {
            hidePopup();
        }, 5500);

        return () => clearTimeout(timer);
    }, [popup.open, popup.type]);

    return (
        <PopupContext.Provider value={{ showPopup, hidePopup }}>
            {children}
            <Popup
                open={popup.open}
                title={popup.title}
                message={popup.message}
                type={popup.type}
                onClose={hidePopup}
            />
        </PopupContext.Provider>
    );
}

export function usePopup() {
    const context = useContext(PopupContext);

    if (!context) {
        throw new Error("usePopup must be used within a PopupProvider");
    }

    return context;
}
