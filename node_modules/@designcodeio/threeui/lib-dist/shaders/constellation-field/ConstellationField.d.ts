import { type NeuformBatchEffectProps } from "../neuform-isolated/NeuformBatchEffects";
export type ConstellationFieldVariant = "constellation-field" | "particle-drift" | "particle-network" | "gateway-flow" | "connectivity-graph" | "interface-lines" | "defense-lines" | "topo-field";
export type ConstellationFieldProps = NeuformBatchEffectProps & {
    variant?: ConstellationFieldVariant;
};
export declare function ConstellationField({ variant, ...props }: ConstellationFieldProps): import("react").JSX.Element;
//# sourceMappingURL=ConstellationField.d.ts.map