export type LiquidFormBackgroundProps = {
    speed?: number;
    morph?: number;
    noiseScale?: number;
    mouseAmount?: number;
    metal?: number;
    camera?: number;
    tintHue?: number;
    tintAmount?: number;
    className?: string;
};
export declare const LIQUID_FORM_DEFAULTS: {
    readonly speed: 1;
    readonly morph: 1;
    readonly noiseScale: 1;
    readonly mouseAmount: 0.15;
    readonly metal: 1;
    readonly camera: 5.5;
    readonly tintHue: 220;
    readonly tintAmount: 0;
};
export declare function LiquidFormBackground({ className, ...props }: LiquidFormBackgroundProps): import("react").JSX.Element;
//# sourceMappingURL=LiquidFormBackground.d.ts.map