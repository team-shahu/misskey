export declare const unicodeEmojiCategories: readonly ["face", "people", "animals_and_nature", "food_and_drink", "activity", "travel_and_places", "objects", "symbols", "flags"];
export type UnicodeEmojiDef = {
    name: string;
    char: string;
    category: typeof unicodeEmojiCategories[number];
};
export declare const emojilist: UnicodeEmojiDef[];
export declare const emojiCharByCategory: Map<string, string[]>;
export declare function getUnicodeEmoji(char: string): UnicodeEmojiDef | string;
export declare function getEmojiName(char: string): string;
export declare function colorizeEmoji(char: string): string;
export interface CustomEmojiFolderTree {
    value: string;
    category: string;
    children: CustomEmojiFolderTree[];
}
//# sourceMappingURL=emojilist.d.ts.map