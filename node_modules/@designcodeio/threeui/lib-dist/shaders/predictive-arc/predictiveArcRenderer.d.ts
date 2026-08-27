export type PredictiveArcMode = "dark" | "light";
export type PredictiveArcOptions = {
    mode: PredictiveArcMode;
    speed: number;
    spacing: number;
    dotSize: number;
    archHeight: number;
    thickness: number;
    brightness: number;
    hue: number;
    saturation: number;
};
export declare const PREDICTIVE_ARC_DEFAULTS: PredictiveArcOptions;
export declare function createPredictiveArcRenderer(canvas: HTMLCanvasElement, getOptions: () => PredictiveArcOptions): {
    resize: (nextWidth: number, nextHeight: number) => void;
    render: () => void;
} | null;
//# sourceMappingURL=predictiveArcRenderer.d.ts.map