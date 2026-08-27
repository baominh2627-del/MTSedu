import { type CSSProperties } from "react";
export type GenerativeTreeProps = {
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
export declare const GENERATIVE_TREE_DEFAULTS: {
    readonly speed: 1;
    readonly size: 1;
    readonly particleAmount: 1;
    readonly opacity: 1;
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
export declare function GenerativeTree({ speed, size, particleAmount, opacity, hue, saturation, brightness, className, style, }: GenerativeTreeProps): import("react").JSX.Element;
//# sourceMappingURL=GenerativeTree.d.ts.map