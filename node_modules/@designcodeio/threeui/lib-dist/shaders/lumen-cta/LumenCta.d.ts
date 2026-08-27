import type { CSSProperties, MouseEventHandler } from "react";
import "./lumen-cta.css";
export type LumenCtaVariant = "primary" | "ghost";
export type LumenCtaMode = "light" | "dark";
export type LumenCtaProps = {
    variant?: LumenCtaVariant;
    mode?: LumenCtaMode;
    label?: string;
    ring?: boolean;
    hue?: number;
    saturation?: number;
    brightness?: number;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    style?: CSSProperties;
};
export declare const LUMEN_CTA_DEFAULTS: {
    readonly variant: "primary";
    readonly mode: "dark";
    readonly label: "Get your card";
    readonly ring: true;
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
export declare function LumenCta({ variant, mode, label, ring, hue, saturation, brightness, disabled, type, onClick, className, style, }: LumenCtaProps): import("react").JSX.Element;
//# sourceMappingURL=LumenCta.d.ts.map