import type { Language, Token } from "../Flashlight";

export enum PythonTokenType {
    WhiteSpace,
    LineTerminator,
    Comment,
    Identifier,
    Keyword,
    StringLiteral,
    NumberLiteral,
    Operator,
    Decorator,
    Indent,
    Dedent
}

export class PythonToken implements Token {
    constructor(public tokenType: Token["tokenType"], public tokenValue: string) {

    }
}

export enum PythonTokenizerState {
    Default,           // Normal tokenization mode
    InString,         // Inside a string
    InComment,       // Inside a comment
    InMultilineString  // Inside a multiline string (triple quotes)
}

export const PythonReservedKeywords = <const>[
    'False', 'None', 'True', 'and', 'as', 'assert', 'async', 'await',
    'break', 'class', 'continue', 'def', 'del', 'elif', 'else', 'except',
    'finally', 'for', 'from', 'global', 'if', 'import', 'in', 'is',
    'lambda', 'nonlocal', 'not', 'or', 'pass', 'raise', 'return',
    'try', 'while', 'with', 'yield'
];

export class Python implements Language {
    public readonly languageName = "Python";

    private tokenizer = new PythonTokenizer();

    constructor() { }

    tokenize(code: string) {
        return this.tokenizer.tokenize(code);
    }
}

export class PythonTokenizer {
    private state: PythonTokenizerState = PythonTokenizerState.Default;
    private tokens: PythonToken[] = [];
    private currentToken: string = "";
    private readPosition: number = 0;
    private code: string = "";
    private stringDelimiter: string = "";

    tokenize(code: string) {
        this.code = code;
        this.tokens = [];
        this.readPosition = 0;

        while (this.readPosition < this.code.length) {
            const char = this.code[this.readPosition];
            const nextChar = this.code[this.readPosition + 1] || "";
            const nextNextChar = this.code[this.readPosition + 2] || "";

            switch (this.state) {
                case PythonTokenizerState.Default:
                    this.handleDefaultState(char, nextChar, nextNextChar);
                    break;

                case PythonTokenizerState.InString:
                    this.handleStringState(char, nextChar, nextNextChar);
                    break;

                case PythonTokenizerState.InComment:
                    this.handleCommentState(char);
                    break;

                case PythonTokenizerState.InMultilineString:
                    this.handleMultilineStringState(char, nextChar, nextNextChar);
                    break;
            }

            this.readPosition++;
        }

        // Handle any remaining tokens
        if (this.currentToken.length > 0) {
            if (this.state === PythonTokenizerState.InComment) {
                this.tokens.push(new PythonToken("comment", this.currentToken));
            }
        }

        return this.tokens;
    }

    private handleDefaultState(char: string, nextChar: string, nextNextChar: string) {
        if (char.match(/\s/)) {
            this.handleWhiteSpace();
        } else if (char === "#") {
            this.state = PythonTokenizerState.InComment;
            this.currentToken = "#";
        } else if ((char === "'" && nextChar === "'" && nextNextChar === "'") ||
            (char === '"' && nextChar === '"' && nextNextChar === '"')) {
            this.state = PythonTokenizerState.InMultilineString;
            this.stringDelimiter = char;
            this.currentToken = char + char + char;
            this.readPosition += 2; // Skip the next two characters
        } else if (char === "'" || char === '"') {
            this.state = PythonTokenizerState.InString;
            this.stringDelimiter = char;
            this.currentToken = char;
        } else if (char === "@" && nextChar.match(/[a-zA-Z_]/)) {
            this.handleDecorator();
        } else if (char.match(/[a-zA-Z_]/)) {
            this.handleIdentifier();
        } else if (char.match(/\d/)) {
            this.handleNumber();
        } else {
            this.tokens.push(new PythonToken("operator", char));
        }
    }

    private handleStringState(char: string, nextChar: string, nextNextChar: string) {
        this.currentToken += char;

        if (char === this.stringDelimiter &&
            !(this.currentToken[this.currentToken.length - 2] === '\\')) {
            this.tokens.push(new PythonToken("string", this.currentToken));
            this.state = PythonTokenizerState.Default;
            this.currentToken = "";
        }
    }

    private handleCommentState(char: string) {
        if (char === "\n") {
            this.tokens.push(new PythonToken("comment", this.currentToken));
            this.state = PythonTokenizerState.Default;
            this.currentToken = "";
            // Handle the newline separately
            this.tokens.push(new PythonToken("symbol", "<br>"));
        } else {
            this.currentToken += char;
        }
    }

    private handleMultilineStringState(char: string, nextChar: string, nextNextChar: string) {
        this.currentToken += char;

        // Check for triple quotes to end the multiline string
        if (char === this.stringDelimiter &&
            nextChar === this.stringDelimiter &&
            nextNextChar === this.stringDelimiter) {
            this.currentToken += nextChar + nextNextChar;
            this.tokens.push(new PythonToken("string", this.currentToken));
            this.state = PythonTokenizerState.Default;
            this.currentToken = "";
            this.readPosition += 2; // Skip the next two characters
        }
    }

    private handleIdentifier() {
        let identifier = "";
        while (this.readPosition < this.code.length &&
            this.code[this.readPosition].match(/[a-zA-Z0-9_]/)) {
            identifier += this.code[this.readPosition++];
        }

        this.readPosition--;

        const tokenType = PythonReservedKeywords.includes(identifier as any) ?
            "keyword" : "variable";
        this.tokens.push(new PythonToken(tokenType, identifier));
    }

    private handleDecorator() {
        let decorator = "@";
        this.readPosition++; // Skip the @ symbol

        while (this.readPosition < this.code.length &&
            this.code[this.readPosition].match(/[a-zA-Z0-9_\.]/)) {
            decorator += this.code[this.readPosition++];
        }

        this.readPosition--;

        this.tokens.push(new PythonToken("symbol", decorator));
    }

    private handleNumber() {
        let number = "";
        let hasDecimal = false;

        while (this.readPosition < this.code.length) {
            const char = this.code[this.readPosition];

            if (char.match(/\d/)) {
                number += char;
                this.readPosition++;
            } else if (char === '.' && !hasDecimal) {
                number += char;
                hasDecimal = true;
                this.readPosition++;
            } else {
                break;
            }
        }

        this.readPosition--;
        this.tokens.push(new PythonToken("number", number));
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
        this.tokens.push(new PythonToken("symbol", whitespace))
    }
}