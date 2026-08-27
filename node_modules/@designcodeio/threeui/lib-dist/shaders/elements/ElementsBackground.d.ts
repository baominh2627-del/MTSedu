import { type CSSProperties } from "react";
export declare const ELEMENT_VARIANTS: readonly ["water", "lightning", "fire"];
export type ElementVariant = (typeof ELEMENT_VARIANTS)[number];
export type ElementsBackgroundProps = {
    variant?: ElementVariant;
    speed?: number;
    size?: number;
    particleAmount?: number;
    opacity?: number;
    hue?: number;
    saturation?: number;
    brightness?: number;
    className?: string;
    style?: CSSProperties;
};
export declare const ELEMENTS_DEFAULTS: {
    readonly variant: ElementVariant;
    readonly speed: 1;
    readonly size: 1;
    readonly particleAmount: 1;
    readonly opacity: 1;
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
export declare function ElementsBackground({ variant, speed, size, particleAmount, opacity, hue, saturation, brightness, className, style, }: ElementsBackgroundProps): import("react").JSX.Element;
//# sourceMappingURL=ElementsBackground.d.ts.map