import { type CSSProperties } from "react";
type EffectMode = "dark" | "light";
export type NeuformCraftEffectProps = {
    mode?: EffectMode;
    hue?: number;
    saturation?: number;
    brightness?: number;
    className?: string;
    style?: CSSProperties;
};
export declare const NEUFORM_CRAFT_DEFAULTS: {
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
export declare const NeonTypography: (props: NeuformCraftEffectProps) => import("react").JSX.Element;
export declare const WovenCloth: (props: NeuformCraftEffectProps) => import("react").JSX.Element;
export declare const NebulaBackground: (props: NeuformCraftEffectProps) => import("react").JSX.Element;
export declare const FluidFieldBackground: (props: NeuformCraftEffectProps) => import("react").JSX.Element;
export declare const HalftoneFlow: (props: NeuformCraftEffectProps) => import("react").JSX.Element;
export declare const EmberStorm: (props: NeuformCraftEffectProps) => import("react").JSX.Element;
export declare const EngravedCertificate: (props: NeuformCraftEffectProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=NeuformCraftEffects.d.ts.map