import type { Language, Token } from "../Flashlight";

export class HTMLToken implements Token {
    constructor(
        public tokenType: Token["tokenType"],
        public tokenValue: string,
        public parentToken?: HTMLToken,
        public childrenTokens?: HTMLToken[]
    ) { }
}

export enum HTMLTokenizerState {
    Default,        // Normal text content
    InTag,          // Inside a tag, e.g. <div>
    InTagName,      // Processing tag name
    InAttribute,    // Processing attribute name
    InAttributeValue, // Processing attribute value
    InComment,      // Inside <!-- comment -->
    InDoctype,      // Inside <!DOCTYPE>
    InCDATA,        // Inside <![CDATA[...]]>
    InScript,       // Inside <script> content
    InStyle         // Inside <style> content
}

export class HTML implements Language {
    public readonly name = "HTML";

    private tokenizer = new HTMLTokenizer();

    constructor() { }

    tokenize(code: string) {
        return this.tokenizer.tokenize(code);
    }
}

export class HTMLTokenizer {
    private state: HTMLTokenizerState = HTMLTokenizerState.Default;
    private tokens: HTMLToken[] = [];
    private buffer: string = "";
    private readPosition: number = 0;
    private code: string = "";
    private currentToken: HTMLToken | undefined = undefined;
    private tagName: string = "";
    private attributeName: string = "";
    private quoteType: string = "";

    tokenize(code: string) {
        this.code = code;
        this.tokens = [];
        this.buffer = "";
        this.readPosition = 0;
        this.currentToken = undefined;

        while (this.readPosition < this.code.length) {
            const char = this.code[this.readPosition];
            const nextChar = this.code[this.readPosition + 1] || "";

            switch (this.state) {
                case HTMLTokenizerState.Default:
                    this.handleDefaultState(char, nextChar);
                    break;

                case HTMLTokenizerState.InTag:
                    this.handleInTagState(char, nextChar);
                    break;

                case HTMLTokenizerState.InTagName:
                    this.handleInTagNameState(char);
                    break;

                case HTMLTokenizerState.InAttribute:
                    this.handleInAttributeState(char);
                    break;

                case HTMLTokenizerState.InAttributeValue:
                    this.handleInAttributeValueState(char);
                    break;

                case HTMLTokenizerState.InComment:
                    this.handleInCommentState(char, nextChar);
                    break;

                case HTMLTokenizerState.InDoctype:
                    this.handleInDoctypeState(char, nextChar);
                    break;

                case HTMLTokenizerState.InCDATA:
                    this.handleInCDATAState(char, nextChar);
                    break;

                case HTMLTokenizerState.InScript:
                    this.handleInScriptState(char, nextChar);
                    break;

                case HTMLTokenizerState.InStyle:
                    this.handleInStyleState(char, nextChar);
                    break;
            }

            this.readPosition++;
        }

        // Flush any remaining buffer
        if (this.buffer) {
            this.newToken("text", this.buffer);
            this.buffer = "";
        }

        return this.tokens;
    }

    private handleDefaultState(char: string, nextChar: string) {
        if (char === '<') {
            // Flush any text content before starting a tag
            if (this.buffer) {
                this.newToken("text", this.buffer);
                this.buffer = "";
            }

            this.buffer += char;

            if (nextChar === '!') {
                // Could be comment, DOCTYPE or CDATA
                if (this.code.substring(this.readPosition + 2, this.readPosition + 4) === '--') {
                    this.state = HTMLTokenizerState.InComment;
                } else if (this.code.substring(this.readPosition + 2, this.readPosition + 9).toUpperCase() === 'DOCTYPE') {
                    this.state = HTMLTokenizerState.InDoctype;
                } else if (this.code.substring(this.readPosition + 2, this.readPosition + 9) === '[CDATA[') {
                    this.state = HTMLTokenizerState.InCDATA;
                } else {
                    this.state = HTMLTokenizerState.InTag;
                }
            } else {
                this.state = HTMLTokenizerState.InTagName;
                this.tagName = "";
            }
        } else {
            this.buffer += char;
        }
    }

    private handleInTagState(char: string, nextChar: string) {
        this.buffer += char;
        if (char.match(/[a-zA-Z]/)) {
            this.state = HTMLTokenizerState.InAttribute;
            this.attributeName += char;
        } else if (char === '>') {
            this.newToken("tag", this.buffer);
            this.buffer = "";
            this.state = HTMLTokenizerState.Default;
        }
    }

    private handleInTagNameState(char: string) {
        if (char.match(/\s/)) {
            if (this.buffer) {
                this.newToken("tag", this.buffer);
                this.buffer = "";
            }
            this.state = HTMLTokenizerState.InTag;
            this.buffer += char;
        } else if (char === '>') {
            this.buffer += char;
            this.newToken("tag", this.buffer);
            this.buffer = "";
            this.state = HTMLTokenizerState.Default;

            // Check if we just closed a script or style tag
            if (this.tagName.toLowerCase() === "script") {
                this.state = HTMLTokenizerState.InScript;
            } else if (this.tagName.toLowerCase() === "style") {
                this.state = HTMLTokenizerState.InStyle;
            }
        } else if (char === '/') {
            this.buffer += char;
            // Self-closing tag will be handled in InTag state
        } else {
            this.buffer += char;
            this.tagName += char;
        }
    }

    private handleInAttributeState(char: string) {
        if (char.match(/\s/)) {
            if (this.buffer) {
                this.newToken("attributeName", this.buffer);
                this.buffer = "";
            }
            this.buffer += char;
        } else if (char === '=') {
            if (this.buffer) {
                this.newToken("attributeName", this.buffer);
                this.buffer = "";
            }
            this.newToken("operator", char);
            this.state = HTMLTokenizerState.InAttributeValue;
        } else if (char === '>') {
            if (this.buffer) {
                this.newToken("attributeName", this.buffer);
                this.buffer = "";
            }
            this.newToken("tag", ">");
            this.state = HTMLTokenizerState.Default;

            // Check if we just closed a script or style tag
            if (this.tagName.toLowerCase() === "script") {
                this.state = HTMLTokenizerState.InScript;
            } else if (this.tagName.toLowerCase() === "style") {
                this.state = HTMLTokenizerState.InStyle;
            }
        } else {
            this.buffer += char;
            this.attributeName += char;
        }
    }

    private handleInAttributeValueState(char: string) {
        if ((char === '"' || char === "'") && this.buffer === "") {
            // Start of quoted attribute value
            this.buffer = char;
            this.quoteType = char;
        } else if (char === this.quoteType) {
            // End of quoted attribute value
            this.buffer += char;
            this.newToken("attributeValue", this.buffer);
            this.buffer = "";
            this.quoteType = "";
            this.state = HTMLTokenizerState.InTag;
        } else if (!this.quoteType && (char.match(/\s/) || char === '>')) {
            // End of unquoted attribute value
            if (this.buffer) {
                this.newToken("text", this.buffer);
                this.buffer = "";
            }

            if (char === '>') {
                this.newToken("tag", ">");
                this.state = HTMLTokenizerState.Default;

                // Check if we just closed a script or style tag
                if (this.tagName.toLowerCase() === "script") {
                    this.state = HTMLTokenizerState.InScript;
                } else if (this.tagName.toLowerCase() === "style") {
                    this.state = HTMLTokenizerState.InStyle;
                }
            } else {
                this.buffer += char;
                this.state = HTMLTokenizerState.InTag;
            }
        } else {
            this.buffer += char;
        }
    }

    private handleInCommentState(char: string, nextChar: string) {
        this.buffer += char;

        if (char === '-' && nextChar === '-' && this.code[this.readPosition + 2] === '>') {
            this.buffer += nextChar + this.code[this.readPosition + 2];
            this.newToken("comment", this.buffer);
            this.buffer = "";
            this.state = HTMLTokenizerState.Default;
            this.readPosition += 2; // Skip the next two characters
        }
    }

    private handleInDoctypeState(char: string, nextChar: string) {
        this.buffer += char;

        if (char === '>') {
            this.newToken("doctype", this.buffer);
            this.buffer = "";
            this.state = HTMLTokenizerState.Default;
        }
    }

    private handleInCDATAState(char: string, nextChar: string) {
        this.buffer += char;

        if (char === ']' && nextChar === ']' && this.code[this.readPosition + 2] === '>') {
            this.buffer += nextChar + this.code[this.readPosition + 2];
            this.newToken("cdata", this.buffer);
            this.buffer = "";
            this.state = HTMLTokenizerState.Default;
            this.readPosition += 2; // Skip the next two characters
        }
    }

    private handleInScriptState(char: string, nextChar: string) {
        if (char === '<' && nextChar === '/' &&
            this.code.substring(this.readPosition + 2, this.readPosition + 8).toLowerCase() === 'script') {
            // Found end script tag
            if (this.buffer) {
                this.newToken("text", this.buffer);
                this.buffer = "";
            }
            this.buffer = "<";
            this.state = HTMLTokenizerState.InTag;
        } else {
            this.buffer += char;
        }
    }

    private handleInStyleState(char: string, nextChar: string) {
        if (char === '<' && nextChar === '/' &&
            this.code.substring(this.readPosition + 2, this.readPosition + 7).toLowerCase() === 'style') {
            // Found end style tag
            if (this.buffer) {
                this.newToken("text", this.buffer);
                this.buffer = "";
            }
            this.buffer = "<";
            this.state = HTMLTokenizerState.InTag;
        } else {
            this.buffer += char;
        }
    }

    private newToken(tokenType: Token["tokenType"], tokenValue: string) {
        const token = new HTMLToken(tokenType, tokenValue, this.currentToken);
        if (this.currentToken) {
            if (!this.currentToken.childrenTokens) this.currentToken.childrenTokens = [token];
            else this.currentToken.childrenTokens.push(token);
        } else {
            this.tokens.push(token);
        }
    }
}