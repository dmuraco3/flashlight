import { Language, Token } from "../Flashlight";

export enum JavaScriptTokenType {
    WhiteSpace,
    LineTerminator,
    Comment,
    Identifier,
    Keyword,
    StringLiteral,
    NumberLiteral,
    RegexLiteral,
    Operator,
}

export class JavaScriptToken implements Token {
    constructor(public tokenType: Token["tokenType"], public tokenValue: string) {

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

export class JavascriptLanguage implements Language {
    public name: string = "JavaScript";

    private tokenizer = new JavaScriptTokenizer();

    constructor() { }

    tokenize(code: string) {
        return this.tokenizer.tokenize(code);
    }

}

export class JavaScriptTokenizer {
    private state: JavaScriptTokenizerState = JavaScriptTokenizerState.Default;
    private tokens: JavaScriptToken[] = [];
    private currentToken: string = "";
    private readPosition: number = 0;
    private code: string = "";

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
            this.currentToken = "//";
        } else if (char === "/" && nextChar === "*") {
            this.state = JavaScriptTokenizerState.InComment;
            this.currentToken = "/*";
        } else if (char === "'") {
            this.state = JavaScriptTokenizerState.InString;
            this.currentToken = "'";
        } else if (char === '"') {
            this.state = JavaScriptTokenizerState.InString;
            this.currentToken = '"';
        } else if (char === "`") {
            this.state = JavaScriptTokenizerState.InTemplateLiteral;
            this.currentToken = "`";
        } else if (char.match(/[a-zA-Z_]/)) {
            this.handleIdentifier();
        } else if (char.match(/\d/)) {
            this.handleNumber();
        } else {
            this.tokens.push(new JavaScriptToken("operator", char));
        }
    }

    private handleStringState(char: string) {
        this.currentToken += char;
        if (char === this.currentToken[0]) {
            this.tokens.push(new JavaScriptToken("string", this.currentToken)); // TODO: add styles
            this.state = JavaScriptTokenizerState.Default;
            this.currentToken = "";
        }
    }

    private handleCommentState(char: string, nextChar: string) {
        this.currentToken += char;
        if (this.currentToken.startsWith("//") && char === "\n") {
            this.tokens.push(new JavaScriptToken("comment", this.currentToken)); // TODO: add styles
            this.state = JavaScriptTokenizerState.Default;
            this.currentToken = "";
        } else if (this.currentToken.startsWith("/*") && char === "*" && nextChar === "/") {
            this.currentToken += "/";
            this.tokens.push(new JavaScriptToken("comment", this.currentToken));
            this.state = JavaScriptTokenizerState.Default;
            this.currentToken = "";
        }
    }

    private handleRegexState(char: string) {
        this.currentToken += char;
        if (char === "/") {
            this.tokens.push(new JavaScriptToken("regex", this.currentToken));
            this.state = JavaScriptTokenizerState.Default;
            this.currentToken = "";
        }
    }

    private handleTemplateLiteralState(char: string) {
        this.currentToken += char;
        if (char === "`") {
            this.tokens.push(new JavaScriptToken("string", this.currentToken)); // TODO: add styles
            this.state = JavaScriptTokenizerState.Default;
            this.currentToken = "";
        }
    }

    private handleIdentifier() {
        let identifier = "";
        while (this.readPosition < this.code.length && this.code[this.readPosition].match(/[a-zA-Z_]/)) {
            identifier += this.code[this.readPosition++];
        }

        this.readPosition--;

        const type: Token["tokenType"] = identifier in JavaScriptReservedKeywords ? "keyword" : "variable";
        this.tokens.push(new JavaScriptToken(type, identifier)); // TODO: add styles
    }

    private handleNumber() {
        let number = "";
        while (this.readPosition < this.code.length && this.code[this.readPosition].match(/\d/)) {
            number += this.code[this.readPosition++];
        }
        this.readPosition--;
        this.tokens.push(new JavaScriptToken("number", number)); // TODO: add styles
    }

    private handleWhiteSpace() {
        let whitespace = "";
        while (this.readPosition < this.code.length && this.code[this.readPosition].match(/\s/)) {
            const curChar = this.code[this.readPosition++];
            if (curChar.match(/\n/)) {
                whitespace += "<br>";
            } else if (curChar.match(/[ ]/)) {
                whitespace += "&nbsp;"
            } else if (curChar.match(/\t/)) {
                whitespace += "&#9;"
            } else {
                whitespace += curChar
            }
        }
        this.readPosition--;
        this.tokens.push(new JavaScriptToken("symbol", whitespace))
    }
}