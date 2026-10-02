// Soft oval mask (circular-mask.webp) stretched over the element's box.
// Used on the 476x463 frames (About timeline, Gallery, Services drawer).
// Applied inline so it never depends on globals.css.
export const STORY_MASK_STYLE = {
    WebkitMaskImage: "url(/assets/background/circular-mask.webp)",
    maskImage: "url(/assets/background/circular-mask.webp)",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    objectFit: "cover",
};

// mask-4.png (Gallery page, Home drawer).
export const MASK_4_STYLE = {
    ...STORY_MASK_STYLE,
    WebkitMaskImage: "url(/assets/background/mask-4.png)",
    maskImage: "url(/assets/background/mask-4.png)",
};

// Services page drawer mask.
export const MASK_2_STYLE = {
    ...STORY_MASK_STYLE,
    WebkitMaskImage: "url(/assets/background/mask-4.png)",
    maskImage: "url(/assets/background/mask-4.png)",
};
