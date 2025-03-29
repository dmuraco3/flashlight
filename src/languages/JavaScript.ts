import type { Language, Token } from "../Flashlight";

export class JavaScriptToken implements Token {
    constructor(
        public tokenType: Token["tokenType"],
        public tokenValue: string,
        public parentToken?: JavaScriptToken,
        public childrenTokens?: JavaScriptToken[]
    ) {
    }

}

export enum JavaScriptTokenizerState {
    Default,           // Normal tokenization mode
    InString,          // Inside a string
    InComment,         // Inside a comment
    InRegex,           // Inside a regex literal
    InTemplateLiteral  // Inside a template literal (`backticks`)
}

export const JavaScriptReservedKeywords = <const>[
    'await', 'break', 'case', 'catch', 'class', 'const', 'continue', 'debugger',
    'default', 'delete', 'do', 'else', 'enum', 'export', 'extends', 'false',
    'finally', 'for', 'function', 'if', 'import', 'in', 'instanceof', 'new',
    'null', 'return', 'super', 'switch', 'this', 'throw', 'true', 'try',
    'typeof', 'var', 'void', 'while', 'with', 'yield'
];

export class JavaScript implements Language {
    public readonly languageName = "JavaScript";

    private tokenizer = new JavaScriptTokenizer();

    constructor() { }

    tokenize(code: string) {
        return this.tokenizer.tokenize(code);
    }

}

export class JavaScriptTokenizer {
    private state: JavaScriptTokenizerState = JavaScriptTokenizerState.Default;
    private tokens: JavaScriptToken[] = [];
    private buffer: string = "";
    private readPosition: number = 0;
    private code: string = "";
    private currentToken: JavaScriptToken | undefined = undefined;

    tokenize(code: string) {
        this.code = code;

        while (this.readPosition < this.code.length) {
            const char = this.code[this.readPosition];
            const nextChar = this.code[this.readPosition + 1] || "";

            switch (this.state) {
                case JavaScriptTokenizerState.Default:
                    this.handleDefaultState(char, nextChar);
                    break;

                case JavaScriptTokenizerState.InString:
                    this.handleStringState(char);
                    break;

                case JavaScriptTokenizerState.InComment:
                    this.handleCommentState(char, nextChar);
                    break;

                case JavaScriptTokenizerState.InRegex:
                    this.handleRegexState(char);
                    break;

                case JavaScriptTokenizerState.InTemplateLiteral:
                    this.handleTemplateLiteralState(char);
                    break;
            }

            this.readPosition++;
        }

        return this.tokens;
    }

    private handleDefaultState(char: string, nextChar: string) {
        if (char.match(/\s/)) {
            this.handleWhiteSpace();
        } else if (char === "/" && nextChar === "/") {
            this.state = JavaScriptTokenizerState.InComment;
            this.buffer = "//";
            this.readPosition++; // advance read position by one to account for extra char
        } else if (char === "/" && nextChar === "*") {
            this.state = JavaScriptTokenizerState.InComment;
            this.buffer = "/*";
            this.readPosition++; // advance read position by one to account for extra char
        } else if (char === "'") {
            this.state = JavaScriptTokenizerState.InString;
            this.buffer = "'";
        } else if (char === '"') {
            this.state = JavaScriptTokenizerState.InString;
            this.buffer = '"';
        } else if (char === "`") {
            this.state = JavaScriptTokenizerState.InTemplateLiteral;
            this.buffer += "`";
        } else if (char === "}" && this.currentToken) {
            this.newToken("symbol", char);
            this.state = JavaScriptTokenizerState.InTemplateLiteral;
        } else if (char.match(/[a-zA-Z_]/)) {
            this.handleIdentifier();
        } else if (char.match(/\d/)) {
            this.handleNumber();
        } else {
            this.newToken("operator", char);
        }
    }

    private handleStringState(char: string) {
        this.buffer += char;
        if (char === this.buffer[0]) {
            this.newToken("string", this.buffer);
            this.state = JavaScriptTokenizerState.Default;
            this.buffer = "";
        }
    }

    private handleCommentState(char: string, nextChar: string) {
        this.buffer += char;
        if (this.buffer.startsWith("//") && (char === "\n" || nextChar === "")) {
            this.newToken("comment", this.buffer)
            this.state = JavaScriptTokenizerState.Default;
            this.buffer = "";
        } else if (this.buffer.startsWith("/*") && char === "*" && nextChar === "/") {
            this.buffer += "/";
            this.newToken("comment", this.buffer);
            this.state = JavaScriptTokenizerState.Default;
            this.buffer = "";
        }
    }

    private handleRegexState(char: string) {
        this.buffer += char;
        if (char === "/") {
            this.newToken("regex", this.buffer);
            this.state = JavaScriptTokenizerState.Default;
            this.buffer = "";
        }
    }

    private handleTemplateLiteralState(char: string) {
        if (char == "$") {
            const lookahead = this.lookahead(1);
            if (lookahead == "{") {
                this.readPosition++;

                const token = new JavaScriptToken("string", this.buffer); // `Hello
                this.buffer = "";

                if (this.currentToken) {
                    token.parentToken = this.currentToken;
                    if (!this.currentToken.childrenTokens) this.currentToken.childrenTokens = [token]
                    else this.currentToken.childrenTokens.push(token)
                } else {
                    this.tokens.push(token)
                }
                this.currentToken = token;
                if (!this.currentToken.childrenTokens) this.currentToken.childrenTokens = [new JavaScriptToken("symbol", "${")];
                else this.currentToken.childrenTokens.push(new JavaScriptToken("symbol", "${"));
                this.state = JavaScriptTokenizerState.Default;

            } else {
                this.buffer += char;
            }
        } else if (char === "`") {
            this.buffer += char;
            const token = new JavaScriptToken("string", this.buffer);
            this.buffer = "";

            if (this.currentToken) {
                if (this.currentToken.parentToken) {
                    if (this.currentToken.parentToken.childrenTokens) this.currentToken.parentToken.childrenTokens.push(token);
                    else this.currentToken.parentToken.childrenTokens = [token]
                } else {
                    this.tokens.push(token);
                }

                this.currentToken = this.currentToken.parentToken;
            } else {
                this.newToken("string", this.buffer);
            }
            this.state = JavaScriptTokenizerState.Default;
            this.buffer = "";
        } else {
            this.buffer += char;
        }
    }

    private handleIdentifier() {
        let identifier = "";
        while (this.readPosition < this.code.length && this.code[this.readPosition].match(/[a-zA-Z_]/)) {
            identifier += this.code[this.readPosition++];
        }

        this.readPosition--;

        // Check for a parenthesis after the identifier without modifying readPosition
        let lookAheadPos = this.readPosition + 1;
        let isFunction = false;

        // Skip any whitespace
        while (lookAheadPos < this.code.length && this.code[lookAheadPos].match(/\s/)) {
            lookAheadPos++;
        }

        // Check if the next non-whitespace character is an opening parenthesis
        if (lookAheadPos < this.code.length && this.code[lookAheadPos] === '(') {
            isFunction = true;
        }

        const type: Token["tokenType"] = JavaScriptReservedKeywords.includes(identifier as any) ? "keyword" : isFunction ? "function" : "variable";
        this.newToken(type, identifier);
    }

    private handleNumber() {
        let number = "";
        while (this.readPosition < this.code.length && this.code[this.readPosition].match(/\d/)) {
            number += this.code[this.readPosition++];
        }
        this.readPosition--;
        this.newToken("number", number);
    }

    private handleWhiteSpace() {
        let whitespace = "";
        while (this.readPosition < this.code.length && this.code[this.readPosition].match(/\s/)) {
            whitespace += this.code[this.readPosition++];
        }
        this.readPosition--;
        this.newToken("whitespace", whitespace);
    }

    private lookahead(distance: number) {
        let buffer = "";
        for (let i = 1; i <= distance; i++) {
            buffer += this.code.charAt(this.readPosition + i);
        }
        return buffer;
    }

    private newToken(tokenType: Token["tokenType"], tokenValue: Token["tokenValue"]) {
        const token = new JavaScriptToken(tokenType, tokenValue, this.currentToken);
        if (this.currentToken) {
            if (!this.currentToken.childrenTokens) this.currentToken.childrenTokens = [token];
            else this.currentToken.childrenTokens.push(token);
        } else {
            this.tokens.push(token);
        }
    }
}