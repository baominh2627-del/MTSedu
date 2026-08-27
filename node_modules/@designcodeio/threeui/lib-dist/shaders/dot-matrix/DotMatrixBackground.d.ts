export type DotMatrixBackgroundProps = {
    speed?: number;
    gridScale?: number;
    mouseAmount?: number;
    pulseSpeed?: number;
    radius?: number;
    opacity?: number;
    hue?: number;
    className?: string;
};
export declare const DOT_MATRIX_DEFAULTS: {
    readonly speed: 1;
    readonly gridScale: 60;
    readonly mouseAmount: 0.04;
    readonly pulseSpeed: 0.4;
    readonly radius: 0.15;
    readonly opacity: 0.35;
    readonly hue: 0;
};
export declare function DotMatrixBackground({ className, ...props }: DotMatrixBackgroundProps): import("react").JSX.Element;
//# sourceMappingURL=DotMatrixBackground.d.ts.map