export type StructureFlowOptions = {
    speed: number;
    pointSize: number;
    opacity: number;
    maskStart: number;
    maskSolid: number;
};
export declare const STRUCTURE_FLOW_DEFAULTS: StructureFlowOptions;
export declare function createStructureFlowRenderer(canvas: HTMLCanvasElement, getOptions: () => StructureFlowOptions): {
    resize(width: number, height: number): void;
    render(): void;
    dispose(): void;
};
//# sourceMappingURL=structureFlowRenderer.d.ts.map