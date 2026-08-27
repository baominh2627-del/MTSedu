export type BellFieldBackgroundProps = {
    speed?: number;
    pointerAmount?: number;
    strikeDuration?: number;
    emberAmount?: number;
    brightness?: number;
    opacity?: number;
    hue?: number;
    saturation?: number;
    className?: string;
};
export declare const BELL_FIELD_DEFAULTS: {
    readonly speed: 1;
    readonly pointerAmount: 1;
    readonly strikeDuration: 2400;
    readonly emberAmount: 1;
    readonly brightness: 1;
    readonly opacity: 1;
    readonly hue: 0;
    readonly saturation: 1;
};
export declare function BellFieldBackground({ className, ...props }: BellFieldBackgroundProps): import("react").JSX.Element;
//# sourceMappingURL=BellFieldBackground.d.ts.map