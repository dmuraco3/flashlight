import type { LanguageStyle } from "./styles/index";
import AtomDark from "./styles/AtomDark";
import { JavaScript } from "./languages/JavaScript";

export interface Token {
    tokenType: (typeof TOKEN_TYPES)[number];
    tokenValue: string;
    parentToken?: Token;
    childrenTokens?: Token[];
}

export interface Language {
    readonly name: string;
    tokenize: (code: string) => Token[];
}

export const TOKEN_TYPES = [
    "text",
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
    "tag",
    "attributeName",
    "attributeValue",
    "prolog",
    "doctype",
    "cdata",
    "entity"
] as const;

export type TokenType = (typeof TOKEN_TYPES)[number];

/**
 * Options for syntax highlighting.
 * @interface HighlightOptions
 * @property {boolean} [returnTokens] - If true, returns tokens instead of HTML. Default is false.
 * @property {LanguageStyle} [style] - The style to use for highlighting. If not provided, the default style is used.
 */
type HighlightOptions = {
    returnTokens?: boolean,
    style?: LanguageStyle
}

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
export default class Flashlight {
    private languages: Language[];
    private defaultStyle: LanguageStyle;

    /**
     * Creates a new Flashlight instance.
     *
     * @param languageClasses - An array of Language class constructors to be instantiated.
     * @param style - The styling configuration for syntax highlighting.
     */
    public constructor(
        languageClasses: (new () => Language)[] = [JavaScript],
        defaultStyle: LanguageStyle = AtomDark
    ) {
        this.languages = languageClasses.map(
            (LanguageClass) => new LanguageClass()
        );
        this.defaultStyle = defaultStyle;
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
     * Highlights code using the specified language and options.
     * 
     * @param code - The source code to highlight
     * @param language - The constructor of the language to use for highlighting
     * @param options - Optional settings for the highlighting process
     * @param options.returnTokens - If true, returns tokens instead of HTML
     * @param options.style - A different style that you want to apply
     * @returns A Promise that resolves to either:
     *   - A string of styled HTML (default)
     *   - An array of Token objects (if options.returnTokens is true)
     * 
     * @throws Error if the specified language is not registered
     */
    public async highlight(
        code: string,
        language: new () => Language,
        options?: HighlightOptions,
    ): Promise<string | Token[]> {
        const wantedLanguage = this.languages.find((lang) => {
            if (lang.name == language.name) return lang;
        });
        if (!wantedLanguage)
            throw new Error(`ERROR: Unknown Language "${language}`);

        const tokens = wantedLanguage.tokenize(code);

        if (options?.returnTokens) {
            return this.flattenTokenTrees(tokens);
        }

        return this.toStyledHTML(tokens, options?.style ?? this.defaultStyle, wantedLanguage);
    }

    private async parseCSSStyleDeclaration(
        styles: Partial<CSSStyleDeclaration>
    ): Promise<string> {
        return Object.entries(styles)
            .map(
                ([key, value]) =>
                    `${key.replace(
                        /[A-Z]/g,
                        (m) => `-${m.toLowerCase()}`
                    )}: ${value}`
            )
            .join("; ");
    }

    private async flattenTokenTrees(tokens: Token[]): Promise<Token[]> {
        let output: Token[] = [];
        let stack = tokens.toReversed();
        while (stack.length > 0) {
            const cur = stack.pop();
            if (cur) {
                output.push({
                    tokenType: cur.tokenType,
                    tokenValue: cur.tokenValue,
                    childrenTokens: undefined,
                    parentToken: undefined,
                });
                stack.push(...(cur?.childrenTokens?.toReversed() ?? []))
            } else { break; }
        }
        return output;
    }

    private escapeCharacters(value: string): string {
        return value
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    private async toStyledHTML(
        tokens: Token[],
        style: LanguageStyle,
        language: Language
    ): Promise<string> {
        tokens = await this.flattenTokenTrees(tokens);

        const output = (
            await Promise.all(
                tokens.map(
                    async (token: Token) => {
                        if (token.tokenType === "text") {
                            if (language.name === "HTML") {
                                return `${this.escapeCharacters(token.tokenValue)}`;
                            } else {
                                return `<span>${this.escapeCharacters(token.tokenValue)}</span>`
                            }
                        } else {
                            return `<span style="${await this.parseCSSStyleDeclaration(
                                style.tokenStyles[token.tokenType]
                            )}">${this.escapeCharacters(token.tokenValue)}</span>`
                        }
                    }
                )
            )
        ).join("");
        const preStyles = await this.parseCSSStyleDeclaration(
            style.wrapperStyles.pre
        );
        const codeStyles = await this.parseCSSStyleDeclaration(
            style.wrapperStyles.code
        );
        return `<pre style="${preStyles}"><code style="${codeStyles}">${output}</code></pre>`;
    }
}
