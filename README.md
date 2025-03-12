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

Flashlight is a modern syntax highlighter fast, efficient, and lightweight.

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

const code = `const x = "Hello, World!";`;

console.log(highlighter.highlight(code, "javascript"));
/* ^ prints out (the following is prettified for readability):
<pre style="...">
    <code style="...">
        <span style="...">const</span>
        <span> </span>
        <span style="...">x</span>
        <span> </span>
        <span style="...">=</span>
        <span> </span>
        <span style="...">"Hello, World!"</span>
        <span style="...">;</span>
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
