export type RibbonFieldBackgroundProps = {
    speed?: number;
    pointerAmount?: number;
    smoothing?: number;
    brightness?: number;
    opacity?: number;
    hue?: number;
    saturation?: number;
    className?: string;
};
export declare const RIBBON_FIELD_DEFAULTS: {
    readonly speed: 1;
    readonly pointerAmount: 1;
    readonly smoothing: 0.035;
    readonly brightness: 1;
    readonly opacity: 1;
    readonly hue: 0;
    readonly saturation: 1;
};
export declare function RibbonFieldBackground({ className, ...props }: RibbonFieldBackgroundProps): import("react").JSX.Element;
//# sourceMappingURL=RibbonFieldBackground.d.ts.map