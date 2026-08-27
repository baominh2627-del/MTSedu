import type { NeuformIsolatedEffectProps } from "../neuform-isolated/NeuformIsolatedEffects";
export type ShaderButtonVariant = "star-portal" | "ignition-button" | "induction-button" | "plasma-button" | "tactile-button" | "thinking-button";
/** @deprecated Variant names that shipped before a rename. Use {@link ShaderButtonVariant}. */
export type LegacyShaderButtonVariant = "uploading-button";
export type ShaderButtonsProps = NeuformIsolatedEffectProps & {
    variant?: ShaderButtonVariant | LegacyShaderButtonVariant;
};
export declare function ShaderButtons({ variant, ...props }: ShaderButtonsProps): import("react").JSX.Element;
//# sourceMappingURL=ShaderButtons.d.ts.map