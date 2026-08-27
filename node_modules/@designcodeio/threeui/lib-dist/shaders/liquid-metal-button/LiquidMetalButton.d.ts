export type LiquidMetalButtonVariant = "pill" | "circle" | "play";
export type LiquidMetalButtonProps = {
    variant?: LiquidMetalButtonVariant;
    className?: string;
    rendering?: "colored" | "monotone";
    diameter?: number;
    strokeWidth?: number;
    text?: string;
    embedded?: boolean;
    onClick?: () => void;
};
export declare function LiquidMetalButton({ className, variant, rendering, diameter, strokeWidth, text, embedded, onClick, }: LiquidMetalButtonProps): import("react").JSX.Element;
//# sourceMappingURL=LiquidMetalButton.d.ts.map