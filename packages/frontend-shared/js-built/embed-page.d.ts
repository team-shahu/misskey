export declare const embeddableEntities: readonly ["notes", "user-timeline", "clips", "tags"];
export type EmbeddableEntity = typeof embeddableEntities[number];
export declare const embedRouteWithScrollbar: EmbeddableEntity[];
export type EmbedParams = {
    maxHeight?: number;
    colorMode?: 'light' | 'dark';
    rounded?: boolean;
    border?: boolean;
    autoload?: boolean;
    header?: boolean;
};
export type ParsedEmbedParams = Required<Omit<EmbedParams, 'maxHeight' | 'colorMode'>> & Pick<EmbedParams, 'maxHeight' | 'colorMode'>;
export declare const defaultEmbedParams: {
    readonly maxHeight: undefined;
    readonly colorMode: undefined;
    readonly rounded: true;
    readonly border: true;
    readonly autoload: false;
    readonly header: true;
};
export declare function parseEmbedParams(searchParams: URLSearchParams | string): ParsedEmbedParams;
//# sourceMappingURL=embed-page.d.ts.map