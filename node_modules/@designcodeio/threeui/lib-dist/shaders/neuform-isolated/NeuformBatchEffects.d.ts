import { type CSSProperties } from "react";
type NeuformMode = "dark" | "light";
type NeuformModePreference = NeuformMode | "auto";
type BakeKnobs = {
    variant: string;
    size: number;
    gap: number;
    length: number;
    density: number;
    strokeWidth: number;
    mode: NeuformMode;
};
export type NeuformBatchEffectProps = {
    variant?: string;
    mode?: NeuformModePreference;
    speed?: number;
    size?: number;
    gap?: number;
    length?: number;
    density?: number;
    strokeWidth?: number;
    opacity?: number;
    hue?: number;
    saturation?: number;
    brightness?: number;
    className?: string;
    style?: CSSProperties;
};
export declare const NEUFORM_BATCH_DEFAULTS: {
    readonly mode: NeuformMode;
    readonly speed: 1;
    readonly size: 1;
    readonly gap: 2;
    readonly length: 1;
    readonly density: 1;
    readonly strokeWidth: 1;
    readonly opacity: 1;
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
declare function patchDiagnosticsPanel(source: string, { mode }: BakeKnobs): string;
export declare const ConstellationField: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const ParticleDrift: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const ParticleNetwork: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const FluxVortex: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const PortalField: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const FlowField: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const AmberHalftone: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
declare const DIAGNOSTICS_PANEL_VARIANTS: {
    readonly layers: {
        readonly title: "Layered Planes";
        readonly source: string;
        readonly supportsMode: true;
        readonly background: (mode: NeuformMode) => "#eef1f6" | "#020804";
        readonly targets: readonly [{
            readonly selector: "#main-container article:nth-of-type(1) .flex-grow";
            readonly role: "ui";
            readonly width: "360px";
        }];
        readonly focusCss: "\n[data-threeui-role=\"ui\"].flex-grow {\n  flex: none !important;\n  width: min(calc(100% - 32px), var(--threeui-target-width, 360px)) !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: calc(100% - 32px) !important;\n  aspect-ratio: 1 / 1 !important;\n  margin: 0 !important;\n  overflow: hidden !important;\n}\n[data-threeui-role=\"ui\"] > canvas {\n  position: absolute !important;\n  inset: 0 !important;\n  width: 100% !important;\n  height: 100% !important;\n}\n";
        readonly patch: typeof patchDiagnosticsPanel;
    };
    readonly nodes: {
        readonly title: "Node Cubes";
        readonly source: string;
        readonly supportsMode: true;
        readonly background: (mode: NeuformMode) => "#eef1f6" | "#020804";
        readonly targets: readonly [{
            readonly selector: "#main-container article:nth-of-type(2) .flex-grow";
            readonly role: "ui";
            readonly width: "360px";
        }];
        readonly focusCss: "\n[data-threeui-role=\"ui\"].flex-grow {\n  flex: none !important;\n  width: min(calc(100% - 32px), var(--threeui-target-width, 360px)) !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: calc(100% - 32px) !important;\n  aspect-ratio: 1 / 1 !important;\n  margin: 0 !important;\n  overflow: hidden !important;\n}\n[data-threeui-role=\"ui\"] > canvas {\n  position: absolute !important;\n  inset: 0 !important;\n  width: 100% !important;\n  height: 100% !important;\n}\n";
        readonly patch: typeof patchDiagnosticsPanel;
    };
    readonly flow: {
        readonly title: "Flowing Mesh";
        readonly source: string;
        readonly supportsMode: true;
        readonly background: (mode: NeuformMode) => "#eef1f6" | "#020804";
        readonly targets: readonly [{
            readonly selector: "#main-container article:nth-of-type(3) .flex-grow";
            readonly role: "ui";
            readonly width: "360px";
        }];
        readonly focusCss: "\n[data-threeui-role=\"ui\"].flex-grow {\n  flex: none !important;\n  width: min(calc(100% - 32px), var(--threeui-target-width, 360px)) !important;\n  height: auto !important;\n  min-height: 0 !important;\n  max-height: calc(100% - 32px) !important;\n  aspect-ratio: 1 / 1 !important;\n  margin: 0 !important;\n  overflow: hidden !important;\n}\n[data-threeui-role=\"ui\"] > canvas {\n  position: absolute !important;\n  inset: 0 !important;\n  width: 100% !important;\n  height: 100% !important;\n}\n";
        readonly patch: typeof patchDiagnosticsPanel;
    };
};
export type DiagnosticsPanelVariant = keyof typeof DIAGNOSTICS_PANEL_VARIANTS;
export declare const DIAGNOSTICS_PANEL_DEFAULTS: {
    readonly variant: "layers";
    readonly mode: NeuformMode;
    readonly speed: 1;
    readonly size: 1;
    readonly gap: 2;
    readonly length: 1;
    readonly density: 1;
    readonly strokeWidth: 1;
    readonly opacity: 1;
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
export declare function DiagnosticsPanel({ variant, ...props }: NeuformBatchEffectProps & {
    variant?: DiagnosticsPanelVariant;
}): import("react").JSX.Element;
export declare const SignalParticles: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const SkeuomorphicToggle: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const MatrixField: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const GatewayFlow: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const ConnectivityGraph: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const InterfaceLines: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const WireframeForms: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const DefenseLines: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const OverrideGrid: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export declare const TopoField: (props: NeuformBatchEffectProps) => import("react").JSX.Element;
export {};
//# sourceMappingURL=NeuformBatchEffects.d.ts.map