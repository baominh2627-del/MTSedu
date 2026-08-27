import { type CSSProperties } from "react";
export type TextPathStudyProps = {
    mode?: "dark" | "light";
    scale?: number;
    opacity?: number;
    hue?: number;
    saturation?: number;
    brightness?: number;
    className?: string;
    style?: CSSProperties;
};
export type TextPathStudiesVariant = "globe-study" | "outline-typeflow" | "morphing-glyph-cloud" | "cloth-study" | "ripple-study" | "ball-study";
export type TextPathStudiesProps = TextPathStudyProps & {
    variant?: TextPathStudiesVariant;
};
export declare const TEXT_PATH_STUDY_DEFAULTS: {
    readonly mode: "dark";
    readonly scale: 1;
    readonly opacity: 1;
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
export declare function TextPathStudies({ variant, ...props }?: TextPathStudiesProps): import("react").JSX.Element;
export declare function GlobeStudy(props?: TextPathStudyProps): import("react").JSX.Element;
export declare function OutlineTypeflow(props?: TextPathStudyProps): import("react").JSX.Element;
export declare function MorphingGlyphCloud(props?: TextPathStudyProps): import("react").JSX.Element;
export declare function ClothStudy(props?: TextPathStudyProps): import("react").JSX.Element;
export declare function RippleStudy(props?: TextPathStudyProps): import("react").JSX.Element;
export declare function BallStudy(props?: TextPathStudyProps): import("react").JSX.Element;
//# sourceMappingURL=TextPathStudies.d.ts.map