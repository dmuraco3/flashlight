import hljs from "highlight.js";
import javascript from "highlight.js/lib/languages/javascript";

import Prism from "prismjs";

import Flashlight from "flashlightjs";
import { JavaScript } from "flashlightjs/languages";
import { AtomDark } from "flashlightjs/styles";

function benchmarkHighlightJS(code: string) {
    hljs.registerLanguage("javascript", javascript);

    const start = performance.now();
    hljs.highlight(code, { language: "javascript" });
    const end = performance.now();

    console.log("Time to highlight code with highlight.js: " + (end - start) + "ms")
}

function benchmarkPrism(code: string) {
    const start = performance.now();
    Prism.highlight(code, Prism.languages.javascript, "javascript");
    const end = performance.now();

    console.log("Time to highlight code with prismjs: " + (end - start) + "ms");
}

function benchmarkFlashlight(code: string) {
    const flashlight = new Flashlight([JavaScript], AtomDark);

    const start = performance.now();
    flashlight.highlight(code, JavaScript);
    const end = performance.now();

    console.log("Time to highlight code with flashlightjs: " + (end - start) + "ms");
}

async function main() {
    const code = await Bun.file("./benchmark_code.js").text();

    benchmarkHighlightJS(code);
    benchmarkPrism(code);
    benchmarkFlashlight(code);
}

await main();