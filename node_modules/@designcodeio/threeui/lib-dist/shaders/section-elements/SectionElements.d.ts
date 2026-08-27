import { type CSSProperties } from "react";
import "./section-elements.css";
export type SectionCompositionProps = {
    className?: string;
    style?: CSSProperties;
};
export declare function DarkGlassButton({ className, style, mode }: SectionCompositionProps & {
    mode?: "light" | "dark";
}): import("react").JSX.Element;
export declare function EditorialIntroSection({ className, style }: SectionCompositionProps): import("react").JSX.Element;
export declare function NewsletterFooterSection({ className, style }: SectionCompositionProps): import("react").JSX.Element;
//# sourceMappingURL=SectionElements.d.ts.map