import { type CSSProperties } from "react";
export declare const BRAND_ORB_VARIANTS: readonly ["claude", "openai", "codex", "cursor", "gemini", "figma", "framer", "react", "swift", "designcode", "aura", "dreamcut", "ui", "ux", "css", "ios", "neuform", "github", "x", "instagram", "threads", "linkedin", "email"];
export declare const BRAND_ORB_SIZES: readonly ["small", "medium"];
export type BrandOrbVariant = (typeof BRAND_ORB_VARIANTS)[number];
export type BrandOrbSize = (typeof BRAND_ORB_SIZES)[number];
export type BrandOrbMode = "auto" | "dark" | "light";
export type BrandOrbsProps = {
    variant?: BrandOrbVariant;
    size?: BrandOrbSize;
    mode?: BrandOrbMode;
    speed?: number;
    paused?: boolean;
    "aria-label"?: string;
    className?: string;
    style?: CSSProperties;
};
export declare const BRAND_ORBS_DEFAULTS: {
    readonly variant: BrandOrbVariant;
    readonly size: BrandOrbSize;
    readonly mode: BrandOrbMode;
    readonly speed: 1;
    readonly paused: false;
};
export declare function BrandOrbs({ variant, size, mode, speed, paused, "aria-label": ariaLabel, className, style, }: BrandOrbsProps): import("react").JSX.Element;
//# sourceMappingURL=BrandOrbs.d.ts.map