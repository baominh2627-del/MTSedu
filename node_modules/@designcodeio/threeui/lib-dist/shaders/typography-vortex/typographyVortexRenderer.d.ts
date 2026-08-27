export type TypographyVortexMode = "dark" | "light";
export type TypographyVortexOptions = {
    mode: TypographyVortexMode;
    phrase: string;
    speed: number;
    ringGrowth: number;
    opacity: number;
    dissolveRadius: number;
    particleAmount: number;
    suctionDuration: number;
};
export declare function createTypographyVortexRenderer(host: HTMLElement, canvas: HTMLCanvasElement, getOptions: () => TypographyVortexOptions): () => void;
//# sourceMappingURL=typographyVortexRenderer.d.ts.map