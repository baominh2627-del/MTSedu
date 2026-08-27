import { type CSSProperties } from "react";
export type SemanticBloomProps = {
    text?: string;
    mode?: "dark" | "light";
    size?: number;
    opacity?: number;
    className?: string;
    style?: CSSProperties;
};
export declare const SEMANTIC_BLOOM_DEFAULTS: {
    text: string;
    mode: "dark";
    size: number;
    opacity: number;
};
export declare function SemanticBloom({ text, mode, size, opacity, className, style, }: SemanticBloomProps): import("react").JSX.Element;
//# sourceMappingURL=SemanticBloom.d.ts.map