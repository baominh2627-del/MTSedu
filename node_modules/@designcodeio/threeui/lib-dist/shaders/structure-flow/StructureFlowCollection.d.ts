import type { DotMatrixBackgroundProps } from "../dot-matrix/DotMatrixBackground";
import type { EmeraldHorizonBackgroundProps } from "../emerald-horizon/EmeraldHorizonBackground";
import type { NeuformBatchEffectProps } from "../neuform-isolated/NeuformBatchEffects";
import type { NeuformCraftEffectProps } from "../neuform-isolated/NeuformCraftEffects";
import type { NeuformIsolatedEffectProps } from "../neuform-isolated/NeuformIsolatedEffects";
import type { OrbitalSphereBackgroundProps } from "../orbital-sphere/OrbitalSphereBackground";
import type { StructureFlowBackgroundProps } from "./StructureFlowBackground";
export declare const STRUCTURE_FLOW_VARIANTS: readonly ["structure-flow", "emerald-horizon", "orbital-sphere", "dot-matrix", "expanse-field", "logic-core", "dimensional-field", "data-field", "topology-field", "nebula", "fluid-field", "ember-storm", "flux-vortex"];
export type StructureFlowVariant = (typeof STRUCTURE_FLOW_VARIANTS)[number];
type StructureVariantProps = StructureFlowBackgroundProps & {
    variant?: "structure-flow";
};
type EmeraldVariantProps = EmeraldHorizonBackgroundProps & {
    variant: "emerald-horizon";
};
type OrbitalVariantProps = OrbitalSphereBackgroundProps & {
    variant: "orbital-sphere";
};
type DotMatrixVariantProps = DotMatrixBackgroundProps & {
    variant: "dot-matrix";
};
type IsolatedVariantProps = NeuformIsolatedEffectProps & {
    variant: "expanse-field" | "logic-core" | "dimensional-field" | "data-field" | "topology-field";
};
type CraftVariantProps = NeuformCraftEffectProps & {
    variant: "nebula" | "fluid-field" | "ember-storm";
};
type FluxVariantProps = NeuformBatchEffectProps & {
    variant: "flux-vortex";
};
export type StructureFlowCollectionProps = StructureVariantProps | EmeraldVariantProps | OrbitalVariantProps | DotMatrixVariantProps | IsolatedVariantProps | CraftVariantProps | FluxVariantProps;
export declare function StructureFlowCollection(props: StructureFlowCollectionProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=StructureFlowCollection.d.ts.map