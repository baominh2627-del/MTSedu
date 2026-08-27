export type EnergyOrbProps = {
    speed?: number;
    scale?: number;
    smokeScale?: number;
    smokeStrength?: number;
    smokeSpeed?: number;
    hue?: number;
    saturation?: number;
    glow?: number;
    starDensity?: number;
    starSpeed?: number;
    starSize?: number;
    brightness?: number;
    opacity?: number;
    className?: string;
};
export declare const ENERGY_ORB_DEFAULTS: {
    readonly speed: 1;
    readonly scale: 1;
    readonly smokeScale: 1;
    readonly smokeStrength: 1;
    readonly smokeSpeed: 1;
    readonly hue: 0;
    readonly saturation: 1;
    readonly glow: 1;
    readonly starDensity: 1;
    readonly starSpeed: 1;
    readonly starSize: 1;
    readonly brightness: 1;
    readonly opacity: 1;
};
export declare function EnergyOrb({ className, ...props }: EnergyOrbProps): import("react").JSX.Element;
//# sourceMappingURL=EnergyOrb.d.ts.map