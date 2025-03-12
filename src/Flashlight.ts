import type { LanguageStyle } from "@/languages/Language";

export interface Token {
    tokenType: typeof TOKEN_TYPES[number];
    tokenValue: string;
    parentToken?: Token,
    childrenTokens?: Token[]
}

export interface Language {
    name: string;
    tokenize: (code: string) => Token[]
}

export const TOKEN_TYPES = [
    "keyword",
    "builtin",
    "className",
    "function",
    "boolean",
    "number",
    "string",
    "char",
    "symbol",
    "regex",
    "url",
    "operator",
    "variable",
    "constant",
    "property",
    "punctation",
    "important",
    "comment",
    "whitespace",
] as const;

export type TokenType = typeof TOKEN_TYPES[number];

/**
 * A class for syntax highlighting code.
 * 
 * The Flashlight class takes language classes and a style configuration,
 * and provides methods to highlight code in a given language.
 * 
 * @example
 * ```typescript
 * import {Flashlight, JavaScript, AtomDark} from "highlightjs";
 * const flashlight = new Flashlight([JavaScript], AtomDark);
 * const highlighted = await flashlight.highlight('const x = 5;', 'JavaScript');
 * ```
 */
export class Flashlight {
    private languages: Language[];

    /**
     * Creates a new Flashlight instance.
     * 
     * @param languageClasses - An array of Language class constructors to be instantiated.
     * @param style - The styling configuration for syntax highlighting.
     */
    public constructor(languageClasses: (new () => Language)[], public style: LanguageStyle) {
        this.languages = languageClasses.map(LanguageClass => new LanguageClass());
    }

    /**
     * Adds a new language to the Flashlight instance.
     * 
     * @param language - The Language instance to add to the available languages.
     * @returns void
     * 
     * @example
     * ```typescript
     * const myLanguage = new Python();
     * flashlight.addLanguage(myLanguage);
     * ```
     */
    public addLanguage(language: Language): void {
        this.languages.push(language);
    }

    /**
     * Returns a list of all languages loaded into flashlight.
     * 
     * @returns {Language[]} An array of Language objects that are currently loaded in the flashlight instance.
     */
    public getLanguages(): Language[] {
        return this.languages;
    }

    /**
     * Highlights the provided code using the specified language's syntax rules.
     * 
     * @param code - The source code string to highlight
     * @param language - The programming language name to use for highlighting
     * @returns A Promise that resolves to an HTML string with syntax highlighting applied
     * @throws {Error} If the specified language is not supported
     */
    public async highlight(code: string, language: Flashlight["languages"][number]["name"]): Promise<string> {
        const wantedLanguage = this.languages.find(lang => { if (lang.name === language) return lang });
        if (!wantedLanguage) throw new Error(`ERROR: Unknown Language "${language}`);

        const tokens = wantedLanguage.tokenize(code);

        return this.toStyledHTML(tokens);
    }

    private async parseCSSStyleDeclaration(styles: Partial<CSSStyleDeclaration>): Promise<string> {
        return Object.entries(styles)
            .map(([key, value]) => `${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}: ${value}`)
            .join('; ');
    }

    private async flattenTokenTrees(tokens: Token[]): Promise<Token[]> {
        let output: Token[] = []
        tokens.forEach(async token => {
            const newToken: Token = { ...token, parentToken: undefined, childrenTokens: undefined };
            output.push(newToken);
            if (token.childrenTokens) output.push(...(await this.flattenTokenTrees(token.childrenTokens)))
        })
        return output;
    }

    private async toStyledHTML(tokens: Token[]): Promise<string> {
        tokens = await this.flattenTokenTrees(tokens);
        const output = tokens.map((token: Token) => `<span style="${this.parseCSSStyleDeclaration(this.style.tokenStyles[token.tokenType])}">${token.tokenValue}</span>`).join("");
        const preStyles = this.parseCSSStyleDeclaration(this.style.wrapperStyles.pre);
        const codeStyles = this.parseCSSStyleDeclaration(this.style.wrapperStyles.code);
        return `<pre style="${preStyles}"><code style="${codeStyles}">${output}</code></pre>`;
    }
}
