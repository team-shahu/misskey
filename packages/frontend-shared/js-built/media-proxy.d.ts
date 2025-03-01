import * as Misskey from 'misskey-js';
export declare class MediaProxy {
    private serverMetadata;
    private url;
    constructor(serverMetadata: Misskey.entities.MetaDetailed, url: string);
    getProxiedImageUrl(imageUrl: string, type?: 'preview' | 'emoji' | 'avatar', mustOrigin?: boolean, noFallback?: boolean): string;
    getProxiedImageUrlNullable(imageUrl: string | null | undefined, type?: 'preview'): string | null;
    getStaticImageUrl(baseUrl: string): string;
}
//# sourceMappingURL=media-proxy.d.ts.map