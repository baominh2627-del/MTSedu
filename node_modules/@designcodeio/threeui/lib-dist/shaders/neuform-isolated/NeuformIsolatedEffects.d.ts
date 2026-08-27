import { type CSSProperties } from "react";
type EffectMode = "light" | "dark";
export type NeuformIsolatedEffectProps = {
    mode?: EffectMode;
    hue?: number;
    saturation?: number;
    brightness?: number;
    className?: string;
    style?: CSSProperties;
};
export declare const NEUFORM_ISOLATED_DEFAULTS: {
    readonly mode: "dark";
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
export declare const GALLERY_HEADING_VARIANTS: {
    readonly "rising-diagonal": {
        readonly title: "Twelve Works in Slow Orbit";
        readonly headline: readonly ["TWELVE WORKS", "IN SLOW ORBIT"];
        readonly headlineWidths: readonly [1846, 2000];
        readonly axis: 25.5;
        readonly phase: 93;
        readonly direction: 1;
        readonly field: "matte";
        readonly palette: readonly ["#e9e5dd", "#20232a", "#c25a43", "#2f5b4e", "#d6cfc2", "#3a4763", "#dda45c", "#14161a", "#a7b3a4", "#f3f1ec", "#5a6670", "#8c4b3f"];
        readonly ink: {
            readonly dark: readonly ["#8d949c", "#ffffff", "#20232a"];
            readonly light: readonly ["#6b7280", "#111827", "#e9e5dd"];
        };
        readonly type: {
            readonly font: "sans";
            readonly weight: "400";
            readonly headlineSize: 1.15;
            readonly tracking: 0.1;
        };
        readonly motion: {
            readonly spring: true;
            readonly ease: 0.42;
        };
    };
    readonly "falling-diagonal": {
        readonly title: "Signal Lost, Image Holding";
        readonly headline: readonly ["SIGNAL LOST", "IMAGE HOLDING"];
        readonly headlineWidths: readonly [1622, 1917];
        readonly axis: -25.5;
        readonly phase: 87;
        readonly direction: -1;
        readonly field: "glitch";
        readonly palette: readonly ["#0b0b12", "#ff2f6d", "#00e6ff", "#13f28a", "#f2f2f8", "#7a1bff", "#101018", "#ff7a1a", "#141a2e", "#e01f52", "#1a1a26", "#0ac2d8"];
        readonly ink: {
            readonly dark: readonly ["#ff2f6d", "#f2f2f8", "#0b0b12"];
            readonly light: readonly ["#c81049", "#111827", "#f2f2f8"];
        };
        readonly type: {
            readonly font: "sans";
            readonly weight: "700";
            readonly headlineSize: 1.2;
            readonly tracking: 0;
        };
        readonly motion: {
            readonly spring: false;
            readonly ease: 0.12;
        };
    };
    readonly "horizontal-sweep": {
        readonly title: "Prints from the Flat Files";
        readonly headline: readonly ["PRINTS FROM", "THE FLAT FILES"];
        readonly headlineWidths: readonly [1506, 1917];
        readonly axis: 0;
        readonly phase: 90;
        readonly direction: 1;
        readonly field: "riso";
        readonly palette: readonly ["#e0b64a", "#b1512a", "#6d7638", "#ecdfc2", "#2f6b66", "#8a3a2b", "#d69b3e", "#3c4630", "#c06e3a", "#e6d3a8", "#546d76", "#7a4726"];
        readonly ink: {
            readonly dark: readonly ["#e0b64a", "#f4e9d2", "#6d2a16"];
            readonly light: readonly ["#8a3a2b", "#2b2018", "#e0b64a"];
        };
        readonly type: {
            readonly font: "oldstyle";
            readonly weight: "700";
            readonly headlineSize: 1.2;
            readonly tracking: 0.03;
        };
        readonly motion: {
            readonly spring: false;
            readonly ease: 0.9;
        };
    };
    readonly "vertical-loop": {
        readonly title: "One Wall, Twelve Plates";
        readonly headline: readonly ["ONE WALL", "TWELVE PLATES"];
        readonly headlineWidths: readonly [1132, 1840];
        readonly axis: 90;
        readonly phase: 0;
        readonly direction: -1;
        readonly field: "halftone";
        readonly palette: readonly ["#12110f", "#f2efe8", "#1c1b18", "#e4e0d7", "#2b2a26", "#d6d1c6", "#0a0a09", "#faf8f3", "#1f1e1a", "#eae6dd", "#161513", "#c0402c"];
        readonly ink: {
            readonly dark: readonly ["#c0402c", "#f2efe8", "#12110f"];
            readonly light: readonly ["#c0402c", "#12110f", "#e4e0d7"];
        };
        readonly type: {
            readonly font: "didone";
            readonly weight: "400";
            readonly headlineSize: 1.25;
            readonly tracking: 0.06;
        };
        readonly motion: {
            readonly spring: false;
            readonly ease: 0.55;
        };
    };
};
export type GalleryHeadingVariant = keyof typeof GALLERY_HEADING_VARIANTS;
export declare const GALLERY_HEADING_FONTS: {
    readonly serif: "\"Times New Roman\",Times,\"Liberation Serif\",\"Nimbus Roman\",serif";
    readonly didone: "Didot,\"Bodoni 72\",\"Bodoni MT\",\"Playfair Display\",Georgia,serif";
    readonly oldstyle: "\"Iowan Old Style\",\"Palatino Linotype\",Palatino,\"Book Antiqua\",Georgia,serif";
    readonly sans: "\"Helvetica Neue\",Helvetica,\"Inter\",Arial,system-ui,sans-serif";
};
export type GalleryHeadingFont = keyof typeof GALLERY_HEADING_FONTS;
export declare const GALLERY_HEADING_WEIGHTS: readonly ["400", "700"];
export type GalleryHeadingWeight = (typeof GALLERY_HEADING_WEIGHTS)[number];
export declare const GALLERY_HEADING_DEFAULTS: {
    readonly variant: "rising-diagonal";
    readonly mode: "dark";
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
export declare const ExpanseField: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const StarPortal: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
declare const PERFORMANCE_GAUGE_VARIANTS: {
    readonly tachometer: {
        readonly title: "Tachometer diagnostic gauge";
        readonly source: string;
        readonly background: "#000000";
        readonly targets: readonly [{
            readonly selector: "#gauge-tachometer";
            readonly role: "visual";
            readonly fit: "contain-square";
        }];
    };
    readonly speedometer: {
        readonly title: "Speedometer diagnostic gauge";
        readonly source: string;
        readonly background: "#000000";
        readonly targets: readonly [{
            readonly selector: "#gauge-speedometer";
            readonly role: "visual";
            readonly fit: "contain-square";
        }];
    };
    readonly boost: {
        readonly title: "Turbo boost diagnostic gauge";
        readonly source: string;
        readonly background: "#000000";
        readonly targets: readonly [{
            readonly selector: "#gauge-boost";
            readonly role: "visual";
            readonly fit: "contain-square";
        }];
    };
    readonly power: {
        readonly title: "EV power diagnostic gauge";
        readonly source: string;
        readonly background: "#000000";
        readonly targets: readonly [{
            readonly selector: "#gauge-power";
            readonly role: "visual";
            readonly fit: "contain-square";
        }];
    };
};
export type PerformanceGaugesVariant = keyof typeof PERFORMANCE_GAUGE_VARIANTS;
export declare const PERFORMANCE_GAUGES_DEFAULTS: {
    readonly variant: "tachometer";
    readonly mode: "dark";
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
export declare function PerformanceGauges({ variant, ...props }: NeuformIsolatedEffectProps & {
    variant?: PerformanceGaugesVariant;
}): import("react").JSX.Element;
export declare const LogicCoreField: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const IgnitionButton: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const InductionButton: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const PlasmaButton: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const TactileButton: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const ThinkingButton: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
/** @deprecated Use ThinkingButton. */
export declare const UploadingButton: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const SlidingTextCta: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const FloatingDotsCta: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const LaunchButton: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const DotBorderButton: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const GradientCta: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const SpinningBorderButton: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const GlassmorphismCta: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const GenerateButton: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const GradientPillButton: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const GradientBeamCta: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const ThreeUIIntro: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const ParticleWordmark: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const AudioWordmark: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare function GalleryHeading({ variant, font, weight, headlineSize, ...props }: NeuformIsolatedEffectProps & {
    variant?: GalleryHeadingVariant;
    font?: GalleryHeadingFont;
    weight?: GalleryHeadingWeight;
    headlineSize?: number;
}): import("react").JSX.Element;
/** @deprecated Use GalleryHeading. */
export declare const GradientCollection: typeof GalleryHeading;
export declare const DimensionalField: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const CloudField: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const DataField: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const TopologyField: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export declare const VoidField: (props: NeuformIsolatedEffectProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=NeuformIsolatedEffects.d.ts.map