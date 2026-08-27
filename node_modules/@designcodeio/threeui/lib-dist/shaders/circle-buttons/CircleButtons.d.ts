import type { CSSProperties, MouseEventHandler } from "react";
import "./circle-buttons.css";
export type CircleButtonVariant = "play" | "plus" | "mail";
export type CircleButtonMode = "light" | "dark";
export type CircleButtonsProps = {
    variant?: CircleButtonVariant;
    mode?: CircleButtonMode;
    hue?: number;
    saturation?: number;
    brightness?: number;
    ariaLabel?: string;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    className?: string;
    style?: CSSProperties;
};
export declare const CIRCLE_BUTTON_DEFAULTS: {
    readonly variant: "play";
    readonly mode: "dark";
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
export declare function CircleButtons({ variant, mode, hue, saturation, brightness, ariaLabel, disabled, type, onClick, className, style, }: CircleButtonsProps): import("react").JSX.Element;
//# sourceMappingURL=CircleButtons.d.ts.map