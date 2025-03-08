import { LanguageStyle } from "../Flashlight"

const AtomDark: LanguageStyle = {
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
    comment: { color: "#7C7C7C" }
};

export default AtomDark;