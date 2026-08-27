export type TypographyVortexCanvasProps = {
    mode?: "dark" | "light";
    phrase?: string;
    speed?: number;
    ringGrowth?: number;
    opacity?: number;
    dissolveRadius?: number;
    particleAmount?: number;
    suctionDuration?: number;
    className?: string;
};
export declare const TYPOGRAPHY_VORTEX_DEFAULTS: {
    readonly mode: "dark";
    readonly phrase: "SABLE / SYSTEMS IN MOTION / ";
    readonly speed: 1;
    readonly ringGrowth: 1.21;
    readonly opacity: 1;
    readonly dissolveRadius: 1;
    readonly particleAmount: 1;
    readonly suctionDuration: 920;
};
export declare function TypographyVortexCanvas({ className, ...props }: TypographyVortexCanvasProps): import("react").JSX.Element;
//# sourceMappingURL=TypographyVortexCanvas.d.ts.map