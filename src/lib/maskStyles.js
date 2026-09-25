// Soft oval mask (circular-mask.png) stretched over the element's box.
// Used on the 476x463 frames (About timeline, Gallery, Services drawer).
// Applied inline so it never depends on globals.css.
export const STORY_MASK_STYLE = {
    WebkitMaskImage: "url(/assets/background/circular-mask.png)",
    maskImage: "url(/assets/background/circular-mask.png)",
    WebkitMaskSize: "100% 100%",
    maskSize: "100% 100%",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
    objectFit: "cover",
};
