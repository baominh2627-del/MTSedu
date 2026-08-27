export type CondensationOptions = {
    speed: number;
    dropAmount: number;
    opacity: number;
};
export declare const CONDENSATION_DEFAULTS: CondensationOptions;
export declare function createCondensationRenderer(canvas: HTMLCanvasElement, getOptions: () => CondensationOptions): {
    resize: (cssWidth: number, cssHeight: number) => void;
    render(now: number): void;
    dispose(): void;
};
//# sourceMappingURL=condensationRenderer.d.ts.map