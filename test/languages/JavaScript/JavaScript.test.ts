import { describe, it, expect } from "bun:test";
import { JavaScript, JavaScriptToken } from "@/languages/JavaScript";
import Flashlight, { type Token } from "@/Flashlight";
import { VSCode } from "@/styles";

describe("JavaScript Tokenizer Test", async () => {
    it("Common", async () => {
        const language = new JavaScript();
        const code = `function hello() {\n\tconst name = "World";\n\tconsole.log("Hello " + name);\n\treturn 42;\n}`;

        const tokens = language.tokenize(code);

        // Check overall token properties
        expect(tokens).toBeDefined();
        expect(tokens.length).toBeGreaterThan(0);

        // Create a map of expected tokens with their positions to verify ordering and completeness
        const expectedTokenSequence: JavaScriptToken[] = [
            { tokenType: "keyword", tokenValue: "function" },
            { tokenType: "whitespace", tokenValue: " " },
            { tokenType: "function", tokenValue: "hello" },
            { tokenType: "operator", tokenValue: "(" },
            { tokenType: "operator", tokenValue: ")" },
            { tokenType: "whitespace", tokenValue: " " },
            { tokenType: "operator", tokenValue: "{" },
            { tokenType: "whitespace", tokenValue: "\n\t" },
            { tokenType: "keyword", tokenValue: "const" },
            { tokenType: "whitespace", tokenValue: " " },
            { tokenType: "variable", tokenValue: "name" },
            { tokenType: "whitespace", tokenValue: " " },
            { tokenType: "operator", tokenValue: "=" },
            { tokenType: "whitespace", tokenValue: " " },
            { tokenType: "string", tokenValue: '"World"' },
            { tokenType: "operator", tokenValue: ";" },
            { tokenType: "whitespace", tokenValue: "\n\t" },
            { tokenType: "variable", tokenValue: "console" },
            { tokenType: "operator", tokenValue: "." },
            { tokenType: "function", tokenValue: "log" },
            { tokenType: "operator", tokenValue: "(" },
            { tokenType: "string", tokenValue: '"Hello "' },
            { tokenType: "whitespace", tokenValue: " " },
            { tokenType: "operator", tokenValue: "+" },
            { tokenType: "whitespace", tokenValue: " " },
            { tokenType: "variable", tokenValue: "name" },
            { tokenType: "operator", tokenValue: ")" },
            { tokenType: "operator", tokenValue: ";" },
            { tokenType: "whitespace", tokenValue: "\n\t" },
            { tokenType: "keyword", tokenValue: "return" },
            { tokenType: "whitespace", tokenValue: " " },
            { tokenType: "number", tokenValue: "42" },
            { tokenType: "operator", tokenValue: ";" },
            { tokenType: "whitespace", tokenValue: "\n" },
            { tokenType: "operator", tokenValue: "}" }
        ];

        // Verify exact token sequence and types
        expect(tokens.length).toBe(expectedTokenSequence.length);
        expect(tokens).toEqual(expectedTokenSequence);
    });

    it("Single Line Comments", async () => {
        const language = new JavaScript();

        const code = "// test comment";
        const tokens = language.tokenize(code);
        const expectedTokens: Token[] = [
            { tokenType: "comment", tokenValue: "// test comment" }
        ];
        expect(tokens.length).toBe(expectedTokens.length);

        expect(tokens).toEqual(expectedTokens);
    });

    it("Template Literals", async () => {
        const language = new JavaScript();

        // Test template literals
        const code = await Bun.file("./test/languages/JavaScript/resources/template_literals.js").text();
        const tokens = language.tokenize(code);

        let output = ""
        let stack = tokens.toReversed();
        while (stack.length > 0) {
            const cur = stack.pop();
            output += cur!.tokenValue;
            stack.push(...(cur?.childrenTokens?.toReversed() ?? []))
        }

        expect(output).toBe(code);

    })
});
