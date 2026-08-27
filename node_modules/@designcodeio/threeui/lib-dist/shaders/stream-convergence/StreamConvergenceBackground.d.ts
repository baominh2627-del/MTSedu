export type StreamConvergenceBackgroundProps = {
    speed?: number;
    fidelity?: number;
    scale?: number;
    brightness?: number;
    opacity?: number;
    hue?: number;
    saturation?: number;
    className?: string;
};
export declare const STREAM_CONVERGENCE_DEFAULTS: {
    readonly speed: 1;
    readonly fidelity: 0.5;
    readonly scale: 1;
    readonly brightness: 1;
    readonly opacity: 1;
    readonly hue: 0;
    readonly saturation: 1;
};
export declare function StreamConvergenceBackground({ className, ...props }: StreamConvergenceBackgroundProps): import("react").JSX.Element;
//# sourceMappingURL=StreamConvergenceBackground.d.ts.map