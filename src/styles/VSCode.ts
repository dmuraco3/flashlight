import type { LanguageStyle } from '.';

const VSCode: LanguageStyle = {
    name: "VSCode",
    tokenStyles: {
        keyword: {
            color: '#569CD6'
        },
        builtin: {
            color: '#569CD6'
        },
        className: {
            color: '#4EC9B0'
        },
        function: {
            color: '#DCDCAA'
        },
        boolean: {
            color: '#569CD6'
        },
        number: {
            color: '#B5CEA8'
        },
        string: {
            color: '#CE9178'
        },
        char: {
            color: '#569CD6'
        },
        symbol: {
            color: '#D4D4D4'
        },
        regex: {
            color: '#D16969'
        },
        url: {
            color: '#4daafc',
            textDecoration: 'underline'
        },
        operator: {
            color: '#D4D4D4'
        },
        variable: {
            color: '#9CDCFE'
        },
        constant: {
            color: '#4FC1FF'
        },
        property: {
            color: '#9CDCFE'
        },
        punctation: {
            color: '#D4D4D4'
        },
        important: {
            color: '#569CD6',
            fontWeight: 'bold'
        },
        comment: {
            color: '#6A9955'
        },
        whitespace: {
            color: '#D4D4D4'
        },
        tag: {
            color: '#569CD6'
        },
        attributeName: {
            color: '#9CDCFE'
        },
        attributeValue: {
            color: '#CE9178'
        },
        prolog: {
            color: '#569CD6'
        },
        doctype: {
            color: '#569CD6'
        },
        cdata: {
            color: '#D4D4D4'
        },
        entity: {
            color: '#D7BA7D'
        }
    },
    wrapperStyles: {
        pre: {
            backgroundColor: '#1f1f1f',
            color: '#cccccc',
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
        },
        code: {
            fontSize: '14px',
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
        }
    }
};

export default VSCode;