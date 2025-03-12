type Token = { tokenType: string, tokenValue: string };

class JavaScriptTokenizer {
    private buffer: string = ''
    private readPosition: number = 0;
    private tokens: Token[] = [];

    constructor() { }


    tokenize(code: string) {
        while (this.readPosition < code.length - 1) {
            const currentChar = code.charAt(this.readPosition);
            this.buffer += currentChar;

            if (this.buffer == "var") {
                this.tokens.push({ tokenType: "keyword", tokenValue: this.buffer })
                this.buffer = "";
            } else if (this.buffer.match(/^"~(\n)"$/)) {

            }
        }
    }
}