import type { BellFieldBackgroundProps } from "../bell-field/BellFieldBackground";
import type { NeuformBatchEffectProps } from "../neuform-isolated/NeuformBatchEffects";
import type { NeuformIsolatedEffectProps } from "../neuform-isolated/NeuformIsolatedEffects";
import type { StreamConvergenceBackgroundProps } from "../stream-convergence/StreamConvergenceBackground";
export type PortalFieldVariant = "portal-field" | "flow-field" | "cloud-field" | "bell-field" | "stream-convergence";
type PortalVariantProps = NeuformBatchEffectProps & {
    variant?: "portal-field";
};
type FlowVariantProps = NeuformBatchEffectProps & {
    variant: "flow-field";
};
type CloudVariantProps = NeuformIsolatedEffectProps & {
    variant: "cloud-field";
};
type BellVariantProps = BellFieldBackgroundProps & {
    variant: "bell-field";
};
type StreamVariantProps = StreamConvergenceBackgroundProps & {
    variant: "stream-convergence";
};
export type PortalFieldCollectionProps = PortalVariantProps | FlowVariantProps | CloudVariantProps | BellVariantProps | StreamVariantProps;
export declare function PortalFieldCollection(props: PortalFieldCollectionProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=PortalFieldCollection.d.ts.map