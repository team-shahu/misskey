import type { ILocale, ParameterizedString } from '../../../locales/index.js';
type FlattenKeys<T extends ILocale, TPrediction> = keyof {
    [K in keyof T as T[K] extends ILocale ? FlattenKeys<T[K], TPrediction> extends infer C extends string ? `${K & string}.${C}` : never : T[K] extends TPrediction ? K : never]: T[K];
};
type ParametersOf<T extends ILocale, TKey extends FlattenKeys<T, ParameterizedString>> = TKey extends `${infer K}.${infer C}` ? ParametersOf<T[K], C> : TKey extends keyof T ? T[TKey] extends ParameterizedString<infer P> ? P : never : never;
type Tsx<T extends ILocale> = {
    readonly [K in keyof T as T[K] extends string ? never : K]: T[K] extends ParameterizedString<infer P> ? (arg: {
        readonly [_ in P]: string | number;
    }) => string : Tsx<T[K]>;
};
export declare class I18n<T extends ILocale> {
    locale: T;
    private tsxCache?;
    private devMode;
    constructor(locale: T, devMode?: boolean);
    get ts(): T;
    get tsx(): Tsx<T>;
    t<TKey extends FlattenKeys<T, string>>(key: TKey): string;
    t<TKey extends FlattenKeys<T, ParameterizedString>>(key: TKey, args: {
        readonly [_ in ParametersOf<T, TKey>]: string | number;
    }): string;
}
export {};
//# sourceMappingURL=i18n.d.ts.map