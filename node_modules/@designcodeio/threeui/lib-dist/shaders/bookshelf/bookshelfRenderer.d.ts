export function createBookshelfRenderer(host: any, canvas: any, callbacks?: {}): {
    ready: Promise<void>;
    resize: () => void;
    open: () => void;
    openSelected: () => void;
    close: () => void;
    previousVolume: () => void;
    nextVolume: () => void;
    toggle: () => void;
    previousPage: () => void;
    nextPage: () => void;
    dispose: () => void;
};
//# sourceMappingURL=bookshelfRenderer.d.ts.map