import type { CondensationBackgroundProps } from "../condensation/CondensationBackground";
import type { ElementVariant, ElementsBackgroundProps } from "./ElementsBackground";
import type { GenerativeTreeProps } from "./GenerativeTree";
export type ElementsVariant = ElementVariant | "condensation" | "generative-tree";
type ElementVariantProps = Omit<ElementsBackgroundProps, "variant"> & {
    variant?: ElementVariant;
};
type CondensationVariantProps = CondensationBackgroundProps & {
    variant: "condensation";
};
type GenerativeTreeVariantProps = GenerativeTreeProps & {
    variant: "generative-tree";
};
export type ElementsCollectionProps = ElementVariantProps | CondensationVariantProps | GenerativeTreeVariantProps;
export declare function ElementsCollection(props: ElementsCollectionProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=ElementsCollection.d.ts.map