export declare const WARP_FIELD_VARIANTS: readonly ["streaks", "letters", "keycaps", "hyperspace"];
export type WarpFieldVariant = (typeof WARP_FIELD_VARIANTS)[number];
export type WarpFieldOptions = {
    variant: WarpFieldVariant;
    speed: number;
    streakOpacity: number;
    tileOpacity: number;
    fov: number;
    brightness: number;
    hue: number;
    saturation: number;
};
export declare const WARP_FIELD_DEFAULTS: WarpFieldOptions;
export declare function createWarpFieldRenderer(canvas: HTMLCanvasElement, getOptions: () => WarpFieldOptions): {
    resize(width: number, height: number): void;
    render(): void;
    dispose(): void;
};
//# sourceMappingURL=warpFieldRenderer.d.ts.map