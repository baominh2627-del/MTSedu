import { type SectionCompositionProps } from "../section-elements/SectionElements";
import type { LumenCtaProps } from "../lumen-cta/LumenCta";
import type { NeuformIsolatedEffectProps } from "../neuform-isolated/NeuformIsolatedEffects";
export type RectangleButtonVariant = "dark-pill" | "launch-button" | "dot-border-button" | "floating-dots-cta" | "sliding-text-cta" | "gradient-beam-cta" | "gradient-pill-button" | "generate-button" | "glassmorphism-cta" | "spinning-border-button" | "gradient-cta" | "lumen-cta" | "lumen-cta-ghost" | "trochil-signal" | "attune-thermal" | "tideform-outline" | "understory-arrow-pill" | "meridian-keycap-primary" | "meridian-keycap-secondary" | "halvorsen-arrow-pill" | "aster-glass-access" | "aster-glass-arrow";
export type RectangleButtonsProps = SectionCompositionProps & NeuformIsolatedEffectProps & Omit<LumenCtaProps, "variant"> & {
    variant?: RectangleButtonVariant;
};
export declare function RectangleButtons({ variant, ...props }: RectangleButtonsProps): import("react").JSX.Element;
/** @deprecated Use RectangleButtons. */
export declare const DarkGlassButton: typeof RectangleButtons;
/** @deprecated Use RectangleButtonsProps. */
export type DarkGlassButtonProps = RectangleButtonsProps;
/** @deprecated Use RectangleButtonVariant. */
export type DarkGlassButtonVariant = RectangleButtonVariant;
//# sourceMappingURL=RectangleButtons.d.ts.map