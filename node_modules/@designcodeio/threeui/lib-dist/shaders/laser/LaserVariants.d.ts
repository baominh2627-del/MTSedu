import { type CSSProperties } from "react";
export type ThreeUILaserVariant = "atmospheric-blade" | "vanishing-array" | "prism-aperture" | "halftone-relay";
export type LaserVariantsProps = {
    variant?: ThreeUILaserVariant;
    speed?: number;
    size?: number;
    length?: number;
    density?: number;
    opacity?: number;
    hue?: number;
    saturation?: number;
    brightness?: number;
    className?: string;
    style?: CSSProperties;
};
export declare const LASER_VARIANT_DEFAULTS: {
    readonly variant: ThreeUILaserVariant;
    readonly speed: 1;
    readonly size: 1;
    readonly length: 1;
    readonly density: 1;
    readonly opacity: 1;
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
export declare function LaserVariants({ className, style, ...props }: LaserVariantsProps): import("react").JSX.Element;
//# sourceMappingURL=LaserVariants.d.ts.map