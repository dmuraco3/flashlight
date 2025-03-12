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

export class Flashlight {
    private languages: Language[];

    constructor(languageClasses: (new () => Language)[], public style: LanguageStyle) {
        this.languages = languageClasses.map(LanguageClass => new LanguageClass());
    }

    addLanguage<T>(language: Language): void {
        this.languages.push(language);
    }

    getLanguages(): Language[] {
        return this.languages;
    }

    highlight(code: string, language: Flashlight["languages"][number]["name"]) {
        const wantedLanguage = this.languages.find(lang => { if (lang.name === language) return lang });
        if (!wantedLanguage) throw new Error(`ERROR: Unknown Language "${language}`);

        const tokens = wantedLanguage.tokenize(code);

        return this.toStyledHTML(tokens);
    }

    private parseCSSStyleDeclaration(styles: Partial<CSSStyleDeclaration>) {
        return Object.entries(styles)
            .map(([key, value]) => `${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}: ${value}`)
            .join('; ');
    }

    private flattenTokenTrees(tokens: Token[]): Token[] {
        let output: Token[] = []
        tokens.forEach(token => {
            const newToken: Token = { ...token, parentToken: undefined, childrenTokens: undefined };
            output.push(newToken);
            if (token.childrenTokens) output.push(...this.flattenTokenTrees(token.childrenTokens))
        })
        return output;
    }

    private toStyledHTML(tokens: Token[]) {
        tokens = this.flattenTokenTrees(tokens);
        const output = tokens.map((token: Token) => `<span style="${this.parseCSSStyleDeclaration(this.style.tokenStyles[token.tokenType])}">${token.tokenValue}</span>`).join("");
        const preStyles = this.parseCSSStyleDeclaration(this.style.wrapperStyles.pre);
        const codeStyles = this.parseCSSStyleDeclaration(this.style.wrapperStyles.code);
        return `<pre style="${preStyles}"><code style="${codeStyles}">${output}</code></pre>`;
    }
}
