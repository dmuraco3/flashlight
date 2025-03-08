export interface Token {
    tokenType: typeof TOKEN_TYPES[number];
    tokenValue: string;
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
] as const;

export type TokenType = typeof TOKEN_TYPES[number];

export type LanguageStyle = {
    [tokenType in TokenType]: Partial<CSSStyleDeclaration>;
};

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

    private toStyledHTML(tokens: Token[]) {
        const output = tokens.map((token: Token) => {
            const styleString = parseCSSStyleDeclaration(this.style[token.tokenType])
            return `<span style="${styleString}">${token.tokenValue}</span>`;
        }).join("");
        const preStyles = parseCSSStyleDeclaration({ ...preCodeStyle, ...preStyle });
        const codeStyles = parseCSSStyleDeclaration(preCodeStyle);
        return `<pre style="${preStyles}"><code style="${codeStyles}">${output}</code></pre>`;
    }
}

function parseCSSStyleDeclaration(styles: Partial<CSSStyleDeclaration>) {
    return Object.entries(styles)
        .map(([key, value]) => `${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}: ${value}`)
        .join('; ');
}

const preCodeStyle: Partial<CSSStyleDeclaration> = {
    color: "#c5c8c6",
    background: "#1d1f21",
    textShadow: "0 1px rgba(0, 0, 0, 0.3)",
    fontFamily: "Inconsolate, Monaco, Consolas, 'Courier New', Courier, monospace",
    direction: "ltr",
    textAlign: "left",
    whiteSpace: "pre",
    wordSpacing: "normal",
    wordBreak: "normal",
    lineHeight: "1.5",
    tabSize: "4",
    hyphens: "none",
}

const preStyle: Partial<CSSStyleDeclaration> = {
    padding: "1em",
    margin: ".5em 0",
    overflow: "auto",
    borderRadius: "0.3em",
}