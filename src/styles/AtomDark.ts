import type { LanguageStyle } from "@/languages/Language";

const AtomDark: LanguageStyle = {
    tokenStyles: {
        string: { color: "#A8FF60" },
        number: { color: "#FF73FD" },
        boolean: { color: "#99CC99" },
        symbol: { color: "#f92672" },
        function: { color: "#DAD085" },
        keyword: { color: "#96CBFE" },
        builtin: { color: "#A8FF60" },
        className: { color: "#FFFFB6", textDecoration: "underline" },
        char: { color: "#A8FF60" },
        regex: { color: "#E9C062" },
        url: { color: "#96CBFE" },
        operator: { color: "#EDEDED" },
        variable: { color: "#C6C5FE" },
        constant: { color: "#99CC99" },
        property: { color: "#96CBFE" },
        punctation: { color: "#c5c8c6" },
        important: { color: "#fd971f", fontWeight: "bold" },
        comment: { color: "#7C7C7C" },
        whitespace: {}
    },
    wrapperStyles: {
        code: {
            color: "#c5c8c6",
            background: "#1d1f21",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily: "Inconsolate, Monaco, Consolas, 'Courier New', Courier, monospace",
            direction: "ltr",
            textAlign: "left",
            whiteSpace: "pre",
            wordSpacing: "normal",
            wordBreak: "normal",
            lineHeight: "1.5",
            tabSize: "4",
            hyphens: "none",
        },
        pre: {
            color: "#c5c8c6",
            background: "#1d1f21",
            textShadow: "0 1px rgba(0, 0, 0, 0.3)",
            fontFamily: "Inconsolate, Monaco, Consolas, 'Courier New', Courier, monospace",
            direction: "ltr",
            textAlign: "left",
            whiteSpace: "pre",
            wordSpacing: "normal",
            wordBreak: "normal",
            lineHeight: "1.5",
            tabSize: "4",
            hyphens: "none",
            padding: "1em",
            margin: ".5em 0",
            overflow: "auto",
            borderRadius: "0.3em",
        }
    }
};

export default AtomDark;