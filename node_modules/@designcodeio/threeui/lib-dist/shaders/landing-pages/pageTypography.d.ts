export type PageFont = {
    value: string;
    label: string;
    stack: string;
    /** Google Fonts css2 family spec. Absent for a face the page already carries. */
    google?: string;
};
/** The three shared alternatives, offered by every page in this family. */
export declare const INSTRUMENT_SERIF: PageFont;
export declare const NEWSREADER: PageFont;
export declare const GEIST: PageFont;
export type PageTypographyProps = {
    headingFont?: string;
    bodyFont?: string;
    headingWeight?: string;
    bodyWeight?: string;
    primaryColor?: string;
    headingSize?: number;
    bodySize?: number;
    headingLetterSpacing?: number;
};
/** Resolved, clamped values plus the colour helpers a recipe writes its CSS with. */
export type PageTypography = {
    heading: string;
    body: string;
    headingWeight: string;
    bodyWeight: string;
    primary: string;
    headingSize: number;
    bodySize: number;
    headingLetterSpacing: number;
    /**
     * Move one of the page's authored colours by the same shift the primary
     * took. Keeps a palette's internal relationships — a lighter tint stays
     * the lighter tint — instead of flattening every accent onto one hex.
     */
    retone: (hex: string) => string;
    /** The same shift applied to an authored `rgb()` / `rgba()` string, alpha kept. */
    retoneRgba: (color: string) => string;
    /**
     * A filter that carries an authored colour onto the primary, for the parts
     * of a page painted in WebGL where no CSS variable can reach.
     * Returns "none" while the primary is untouched.
     */
    filter: (baseHex?: string) => string;
};
export type PageInlineStyleOverride = {
    selector: string;
    styles: Readonly<Record<string, string>>;
};
export type PageTypographyRecipe = {
    headingFonts: readonly PageFont[];
    bodyFonts: readonly PageFont[];
    /** Offered weights, in slider order, and the one the page is authored at. */
    headingWeights: readonly string[];
    headingWeight: string;
    bodyWeights: readonly string[];
    bodyWeight: string;
    /** The page's authored primary, and the base every retone and filter is measured from. */
    primaryColor: `#${string}`;
    /** [min, default, max] */
    headingSize: readonly [number, number, number];
    bodySize: readonly [number, number, number];
    headingLetterSpacing: readonly [number, number, number];
    css: (type: PageTypography) => string;
    inlineStyles?: (type: PageTypography) => readonly PageInlineStyleOverride[];
};
export type LandingPageCustomization = {
    css: string;
    /** Set only when a chosen face has to be fetched. */
    fontHref?: string;
    /**
     * Used only by preserved pages whose authored typography lives in element
     * style attributes. Appended CSS cannot outrank those attributes without
     * priority overrides, so these values are applied to the loaded DOM while the
     * packaged HTML file itself remains byte-exact.
     */
    inlineStyles?: readonly PageInlineStyleOverride[];
};
/**
 * Peel the eight control props off a page's props so the rest can go straight
 * to the frame. Keeps each page component down to the two lines that differ.
 */
export declare function splitTypographyProps<T extends PageTypographyProps>(props: T): readonly [PageTypographyProps, Omit<T, keyof PageTypographyProps>];
export declare function usePageTypography(recipe: PageTypographyRecipe, props: PageTypographyProps): LandingPageCustomization;
/**
 * Opaque srcDoc frames cannot expose contentDocument to React. This bridge is
 * appended only to the derived srcDoc string and applies the same live style
 * contract from inside the sandbox, leaving the packaged HTML file untouched.
 */
export declare const PAGE_CUSTOMIZATION_BRIDGE = "<script>\nwindow.addEventListener(\"message\", function (event) {\n  var detail = event.data;\n  if (!detail || detail.type !== \"threeui-page-customization\") return;\n  var head = document.head;\n  if (!head) return;\n\n  var link = document.getElementById(\"threeui-page-typography-fonts\");\n  if (detail.fontHref) {\n    if (!link) {\n      link = document.createElement(\"link\");\n      link.id = \"threeui-page-typography-fonts\";\n      link.rel = \"stylesheet\";\n      head.appendChild(link);\n    }\n    if (link.getAttribute(\"href\") !== detail.fontHref) link.href = detail.fontHref;\n  } else if (link) {\n    link.remove();\n  }\n\n  var style = document.getElementById(\"threeui-page-typography\");\n  if (!detail.css) {\n    if (style) style.remove();\n    return;\n  }\n  if (!style) {\n    style = document.createElement(\"style\");\n    style.id = \"threeui-page-typography\";\n  }\n  if (style.textContent !== detail.css) style.textContent = detail.css;\n  head.appendChild(style);\n});\n</script>";
export declare function postPageCustomization(frame: HTMLIFrameElement | null, customization?: LandingPageCustomization): void;
/**
 * Appended to the frame's own head rather than written into the document, so
 * the packaged file stays byte-exact. Re-appending on every update keeps the
 * sheet last in the head, which is what lets it win against the page's own
 * rules at equal specificity without a single !important.
 */
export declare function applyPageCustomization(frame: HTMLIFrameElement | null, customization?: LandingPageCustomization): void;
//# sourceMappingURL=pageTypography.d.ts.map