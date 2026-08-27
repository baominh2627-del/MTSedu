import { type CSSProperties } from "react";
export type CharacterCarouselVariant = "filmstrip" | "wave";
export type CharacterCarouselProps = {
    variant?: CharacterCarouselVariant;
    speed?: number;
    scale?: number;
    opacity?: number;
    hue?: number;
    saturation?: number;
    brightness?: number;
    className?: string;
    style?: CSSProperties;
};
export declare const CHARACTER_CAROUSEL_DEFAULTS: {
    readonly variant: "filmstrip";
    readonly speed: 1;
    readonly scale: 1;
    readonly opacity: 1;
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
export declare function CharacterCarousel({ variant, speed, scale, opacity, hue, saturation, brightness, className, style, }: CharacterCarouselProps): import("react").JSX.Element;
export declare function CharacterFilmstrip(props: Omit<CharacterCarouselProps, "variant">): import("react").JSX.Element;
export declare function CharacterWave(props: Omit<CharacterCarouselProps, "variant">): import("react").JSX.Element;
//# sourceMappingURL=CharacterCarousel.d.ts.map