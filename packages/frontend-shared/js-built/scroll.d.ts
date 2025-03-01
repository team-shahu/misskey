type ScrollBehavior = 'auto' | 'smooth' | 'instant';
export declare function getScrollContainer(el: HTMLElement | null): HTMLElement | null;
export declare function getStickyTop(el: HTMLElement, container?: HTMLElement | null, top?: number): number;
export declare function getStickyBottom(el: HTMLElement, container?: HTMLElement | null, bottom?: number): number;
export declare function getScrollPosition(el: HTMLElement | null): number;
export declare function onScrollTop(el: HTMLElement, cb: (topVisible: boolean) => unknown, tolerance?: number, once?: boolean): (() => void) | null;
export declare function onScrollBottom(el: HTMLElement, cb: () => unknown, tolerance?: number, once?: boolean): (() => void) | null;
export declare function scroll(el: HTMLElement, options: ScrollToOptions | undefined): void;
export declare function scrollToTop(el: HTMLElement, options?: {
    behavior?: ScrollBehavior;
}): void;
export declare function scrollToBottom(el: HTMLElement, options?: ScrollToOptions, container?: HTMLElement | null): void;
export declare function isTopVisible(el: HTMLElement, tolerance?: number): boolean;
export declare function isBottomVisible(el: HTMLElement, tolerance?: number, container?: HTMLElement | null): boolean;
export declare function getBodyScrollHeight(): number;
export {};
//# sourceMappingURL=scroll.d.ts.map