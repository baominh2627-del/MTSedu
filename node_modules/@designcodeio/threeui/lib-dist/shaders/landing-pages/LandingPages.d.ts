import { type CSSProperties } from "react";
import { type LandingPageCustomization, type PageTypographyProps } from "./pageTypography";
export type LandingPageFrameProps = {
    className?: string;
    sourceUrl: string;
    srcDoc?: string;
    style?: CSSProperties;
    title: string;
    customization?: LandingPageCustomization;
};
export type LandingPageProps = Omit<LandingPageFrameProps, "sourceUrl" | "title" | "customization">;
export declare function LandingPageFrame({ className, customization, sourceUrl, srcDoc, style, title }: LandingPageFrameProps): import("react").JSX.Element;
export declare function KageLandingPage(props: LandingPageProps & PageTypographyProps): import("react").JSX.Element;
export declare function CompleteShelfLandingPage(props: LandingPageProps & PageTypographyProps): import("react").JSX.Element;
export declare function BestsellersBookShowcase(props: LandingPageProps & PageTypographyProps): import("react").JSX.Element;
export declare function MengToSketchbookLandingPage(props: LandingPageProps): import("react").JSX.Element;
export declare function SylvaHero(props: LandingPageProps & PageTypographyProps): import("react").JSX.Element;
//# sourceMappingURL=LandingPages.d.ts.map