import { type DataPixelArcCanvasProps } from "../data-pixel-arc/DataPixelArcCanvas";
import type { NeuformBatchEffectProps } from "../neuform-isolated/NeuformBatchEffects";
import { type PredictiveArcOptions } from "./predictiveArcRenderer";
export type PredictiveArcVariant = "predictive" | "data-pixel" | "signal-particles" | "override-grid";
type PredictiveVariantProps = Partial<PredictiveArcOptions> & {
    className?: string;
    variant?: "predictive";
};
type DataPixelVariantProps = DataPixelArcCanvasProps & {
    variant: "data-pixel";
};
type BatchVariantProps = Partial<NeuformBatchEffectProps> & {
    variant: "signal-particles" | "override-grid";
};
export type PredictiveArcCanvasProps = PredictiveVariantProps | DataPixelVariantProps | BatchVariantProps;
export declare function PredictiveArcCanvas(props: PredictiveArcCanvasProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=PredictiveArcCanvas.d.ts.map