# 🔦 flashlight

---

Easy, efficient, and lightweight syntax highlighting.

## Contents

-   [Install](#install)
-   [Use](#use)
-   [Examples](#examples)
-   [Benchmarks](#benchmarks)
-   [Why another syntax highlighter?](#why-make-another-syntax-highlighter)
    <!-- * [When should I use this?](#when-should-i-use-this?) -->
    <!-- * [Playground](#playground) -->
-   [Supported Languages](#supported-languages)

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

## Create a New Default Flashlight Instance

```typescript
import { Flashlight } from "flashlightjs";

const flashlight = new Flashlight();
```

_`Note:`_ The default language is JavaScript, and the defult style is AtomDark.

## Create a New Flashlight Instance With a Different Language

```typescript
import { Flashlight, Python } from "flashlightjs";

const flashlight = new Flashlight([Python]);
```

## Create a new Flashlight Instance With a Different Style

```typescript
import { Flashlight, AtomDark } from "flashlightjs";

const flashlight = new Flashlight(undefined, AtomDark);
```

# Examples

## Highlight JavaScript Code With the Flashlight Class

```typescript
import { Flashlight, JavaScript, AtomDark } from "flashlightjs";
const code = `function greet(name) {
    return "Hello, " + name + "!";
}`;

const flashlight = new Flashlight([JavaScript], AtomDark);

const highlightedCode = flashlight.highlight(code, "JavaScript");
```

## Highlight Python Code With the Flashlight Class

```typescript
import { Flashlight, Python, AtomDark } from "flashlightjs";

const code = `def greet(name):
    return "Hello, " + name + "!"
`;

const flashlight = new Flashlight([Python], AtomDark);

const highlightedCode = flashlight.highlight(code, "Python");
```

# Benchmarks

## Performance Comparison

| Library      | Time (ms) |
| ------------ | --------- |
| highlight.js | 14.05     |
| prismjs      | 5.42      |
| flashlight   | 2.34      |

These benchmarks show flashlight is approximately 6x faster than highlight.js and 2x faster than prismjs when highlighting equivalent code samples.

# Why another syntax highlighter?

The main javascript syntax highlighting libraries (Prism, Highlight.js) are built using old standards, not readable, and generally take a less efficient approach to tokenizing code.

Flashlight aims to address these problems by doing the following:

-   Use modern javascript/typescript standards.
-   Create clean documentation for everything.
-   Prioritize expressive syntax.
-   Platform-independent code. Don't prioritize web over node.
-   Use state-machine tokenization over regex pattern matching [more info](https://en.wikipedia.org/wiki/Lexical_analysis#:~:text=Tokens%20are%20often%20defined%20by%20regular%20expressions%2C%20which%20are%20understood%20by%20a%20lexical%20analyzer%20generator%20such%20as%20lex%2C%20or%20handcoded%20equivalent%20finite%2Dstate%20automata.).

<!-- # When should I use this? -->

<!-- # Playground -->

# Supported Languages

-   [x] JavaScript
-   [x] Python
-   [x] HTML
-   [ ] TypeScript
-   [ ] CSS
-   [ ] JSX
-   [ ] TSX
-   [ ] Rust
