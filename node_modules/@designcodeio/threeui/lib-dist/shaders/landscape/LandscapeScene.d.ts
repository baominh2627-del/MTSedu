export declare const LANDSCAPE_VARIANTS: readonly ["sunrise", "noon", "sunset", "night", "rain", "storm", "snow"];
export type LandscapeVariant = (typeof LANDSCAPE_VARIANTS)[number];
export type LandscapeSceneProps = {
    className?: string;
    sourceUrl?: string;
    variant?: LandscapeVariant;
};
export declare function LandscapeScene({ className, sourceUrl, variant, }: LandscapeSceneProps): import("react").JSX.Element;
//# sourceMappingURL=LandscapeScene.d.ts.map