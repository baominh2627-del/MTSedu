export type ArticleHeadingsProps = {
    mode?: "dark" | "light";
    duration?: number;
    stagger?: number;
    scrambleLength?: number;
    preserveChance?: number;
    tailChance?: number;
    className?: string;
};
export declare const ARTICLE_HEADINGS_DEFAULTS: {
    readonly mode: "dark";
    readonly duration: 560;
    readonly stagger: 140;
    readonly scrambleLength: 10;
    readonly preserveChance: 0.3;
    readonly tailChance: 0.18;
};
export declare function ArticleHeadings({ mode, className, ...props }: ArticleHeadingsProps): import("react").JSX.Element;
//# sourceMappingURL=ArticleHeadings.d.ts.map