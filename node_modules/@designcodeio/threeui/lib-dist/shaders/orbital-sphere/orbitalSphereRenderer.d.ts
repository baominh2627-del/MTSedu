export type OrbitalSphereOptions = {
    speed: number;
    particleSize: number;
    particleOpacity: number;
    orbitOpacity: number;
    scale: number;
    haloOpacity: number;
    hue: number;
};
export declare const ORBITAL_SPHERE_DEFAULTS: OrbitalSphereOptions;
export declare function createOrbitalSphereRenderer(canvas: HTMLCanvasElement, getOptions: () => OrbitalSphereOptions): {
    resize(width: number, height: number): void;
    render(): void;
    dispose(): void;
};
//# sourceMappingURL=orbitalSphereRenderer.d.ts.map