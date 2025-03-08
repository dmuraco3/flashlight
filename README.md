# 🔦 flashlight

---

Easy, efficient, and lightweight syntax highlighting.

## Contents

-   [What is this?](#what-is-this)
    <!-- * [When should I use this?](#when-should-i-use-this?) -->
    <!-- * [Playground](#playground) -->
-   [Install](#install)
-   [Use](#use)
-   [Examples](#examples)
-   [Supported Languages](#supported-languages)

# What is this?

<!-- # When should I use this? -->

<!-- # Playground -->

# Install

**npm**:

```bash
npm i flashlight
```

**Bun**:

```bash
bun add flashlight
```

# Use

```typescript
import Flashlight, { JavaScript } from "flashlight";

const highlighter = new Flashlight([JavaScript]);

const code = `function main() {
    console.log("Hello, World!");
}`;

console.log(highlighter.highlight(code, "javascript"));
/* ^ prints out (the following is prettified for readability):
<pre class="flashlight">
    <code>
        <span class="js-keyword">function</span>
        <span class="js-func-id">main</span>
        <span class="js-lparen">(</span>
        <span class="js-rparen">)</span>
        <span class="js-lbrace">{</span>
        <br>
        <span class="js-var-id">console</span>
        <span class="js-func-id">log</span>
        <span class="js-lparen">(</span>
        <span class="js-string">"Hello, World!"</span>
        <span class="js-rparen">)</span>
        <span class="js-semi">;</span>
        <br>
        <span class="js-rbrace">}</span>
    </code>
</pre>
*/
```

# Supported Languages

-   [x] JavaScript
-   [x] Python
-   [ ] TypeScript
-   [ ] HTML
-   [ ] CSS
-   [ ] JSX
-   [ ] TSX
-   [ ] Rust
