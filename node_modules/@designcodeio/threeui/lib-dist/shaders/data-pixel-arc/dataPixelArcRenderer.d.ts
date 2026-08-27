export type DataPixelArcMode = "dark" | "light";
export type DataPixelArcOptions = {
    mode: DataPixelArcMode;
    speed: number;
    pixelSize: number;
    arcCenter: number;
    arcDrop: number;
    thickness: number;
    brightness: number;
    hue: number;
    saturation: number;
};
export declare const DATA_PIXEL_ARC_DEFAULTS: DataPixelArcOptions;
export declare function createDataPixelArcRenderer(canvas: HTMLCanvasElement, getOptions: () => DataPixelArcOptions): {
    resize: (nextWidth: number, nextHeight: number) => void;
    render: () => void;
} | null;
//# sourceMappingURL=dataPixelArcRenderer.d.ts.map