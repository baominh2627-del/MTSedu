import type { RibbonFieldBackgroundProps } from "../ribbon-field/RibbonFieldBackground";
import type { NeuformBatchEffectProps } from "../neuform-isolated/NeuformBatchEffects";
import type { NeuformCraftEffectProps } from "../neuform-isolated/NeuformCraftEffects";
import type { NeuformIsolatedEffectProps } from "../neuform-isolated/NeuformIsolatedEffects";
import { type PredictiveArcCanvasProps as PredictiveArcCoreProps, type PredictiveArcVariant as PredictiveArcCoreVariant } from "./PredictiveArcCanvas";
export type PredictiveArcVariant = PredictiveArcCoreVariant | "ribbon-field" | "void-field" | "halftone-flow" | "amber-halftone";
type RibbonFieldVariantProps = RibbonFieldBackgroundProps & {
    variant: "ribbon-field";
};
type VoidFieldVariantProps = NeuformIsolatedEffectProps & {
    variant: "void-field";
};
type HalftoneFlowVariantProps = NeuformCraftEffectProps & {
    variant: "halftone-flow";
};
type AmberHalftoneVariantProps = NeuformBatchEffectProps & {
    variant: "amber-halftone";
};
export type PredictiveArcCanvasProps = PredictiveArcCoreProps | RibbonFieldVariantProps | VoidFieldVariantProps | HalftoneFlowVariantProps | AmberHalftoneVariantProps;
export declare function PredictiveArcCanvas(props: PredictiveArcCanvasProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=PredictiveArcCollection.d.ts.map