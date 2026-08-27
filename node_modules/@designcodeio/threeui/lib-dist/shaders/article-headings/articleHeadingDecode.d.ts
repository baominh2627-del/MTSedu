export declare const ARTICLE_HEADING_DECODE_POOL = "#%&@$/\\<>*+=~ABCDEFGHKMNPRSTUVWXYZ0123456789";
export type ArticleHeadingDecodeOptions = {
    duration: number;
    stagger: number;
    scrambleLength: number;
    preserveChance: number;
    tailChance: number;
};
export declare function startArticleHeadingDecode(root: HTMLElement, options: ArticleHeadingDecodeOptions): () => void;
//# sourceMappingURL=articleHeadingDecode.d.ts.map