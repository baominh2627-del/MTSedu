import type { ArticleHeadingsProps } from "./ArticleHeadings";
import type { NeuformCraftEffectProps } from "../neuform-isolated/NeuformCraftEffects";
import type { NeuformIsolatedEffectProps } from "../neuform-isolated/NeuformIsolatedEffects";
export type TextAnimationVariant = "article-headings" | "neon-sign" | "threeui-intro" | "particle-wordmark" | "audio-wordmark";
type ArticleHeadingsVariantProps = ArticleHeadingsProps & {
    variant?: "article-headings";
};
type NeonTypographyVariantProps = NeuformCraftEffectProps & {
    variant: "neon-sign";
};
type IsolatedTextVariantProps = NeuformIsolatedEffectProps & {
    variant: "threeui-intro" | "particle-wordmark" | "audio-wordmark";
};
export type TextAnimationCollectionProps = ArticleHeadingsVariantProps | NeonTypographyVariantProps | IsolatedTextVariantProps;
export declare function TextAnimationCollection(props: TextAnimationCollectionProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=TextAnimationCollection.d.ts.map