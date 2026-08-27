import { type CSSProperties } from "react";
import "./gallery.css";
export type GalleryProps = {
    speed?: number;
    scale?: number;
    opacity?: number;
    hue?: number;
    saturation?: number;
    brightness?: number;
    className?: string;
    style?: CSSProperties;
};
export declare const GALLERY_DEFAULTS: {
    readonly speed: 1;
    readonly scale: 1;
    readonly opacity: 1;
    readonly hue: 0;
    readonly saturation: 1;
    readonly brightness: 1;
};
export declare function Gallery({ speed, scale, opacity, hue, saturation, brightness, className, style, }: GalleryProps): import("react").JSX.Element;
//# sourceMappingURL=Gallery.d.ts.map