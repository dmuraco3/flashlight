import Flashlight from "@/Flashlight";
import { HTML } from "@/languages/HTML";
import { describe, it, expect } from "bun:test";

describe("HTML Tokenizer Test", () => {
    it("Common", async () => {
        const code = await Bun.file("test/languages/HTML/html_test_1.html").text();

        const html = new HTML();

        const tokens = html.tokenize(code);
    })
})

describe("HTML Highlighting Test", () => {
    it("main", async () => {
        const code = await Bun.file("test/languages/HTML/html_test_1.html").text();

        const flashlight = new Flashlight([HTML]);

        const highlightedCode = await flashlight.highlight(code, "HTML");

        const reconstruction = highlightedCode
            .replace(/<\/?span[^\n>]*>/g, "")
            .replace(/<\/?code[^\n>]*>/g, "")
            .replace(/<\/?pre[^\n>]*>/g, "")
            .replace(/&amp;/g, "&")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, "\"")
            .replace(/&#39;/g, "'");

        expect(reconstruction).toBe(code);

    })
})