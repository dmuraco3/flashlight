import type { LanguageStyle } from ".";

const VSCodeDark: LanguageStyle = {
    name: "VSCodeDark",
    tokenStyles: {
        string: { color: "#CE9178" },
        number: { color: "#B5CEA8" },
        boolean: { color: "#569CD6" },
        symbol: { color: "#DCDCAA" },
        function: { color: "#DCDCAA" },
        keyword: { color: "#569CD6" },
        builtin: { color: "#4EC9B0" },
        className: { color: "#4EC9B0" },
        char: { color: "#569CD6" },
        regex: { color: "#D16969" },
        url: { color: "#CE9178" },
        operator: { color: "#D4D4D4" },
        variable: { color: "#9CDCFE" },
        constant: { color: "#4FC1FF" },
        property: { color: "#9CDCFE" },
        punctation: { color: "#808080" },
        important: { fontStyle: "bold" },
        comment: { color: "#6A9955" },
        whitespace: {},
        tag: { color: "#569CD6" },
        attributeName: { color: "#9CDCFE" },
        attributeValue: { color: "#CE9178" },
        prolog: { color: "#808080" },
        doctype: { color: "#808080" },
        cdata: { color: "#808080" },
        entity: { color: "#569CD6" }
    },
    wrapperStyles: {
        code: {
            color: "#cccccc",
            background: "#1f1f1f",
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
            color: "#cccccc",
            background: "#1f1f1f",
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
}

export default VSCodeDark;