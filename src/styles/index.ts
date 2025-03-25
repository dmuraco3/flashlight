import type { TokenType } from "../Flashlight";

import VSCode from "./VSCode";
import VSCodeDark from "./VSCodeDark";
import AtomDark from "./AtomDark";
export { VSCode, VSCodeDark, AtomDark };

export type LanguageStyle = {
    name: string,
    tokenStyles: {
        [tokenType in Exclude<TokenType, "text">]: Partial<CSSStyleDeclaration>;
    };
    wrapperStyles: {
        [wrapperType in "pre" | "code"]: Partial<CSSStyleDeclaration>;
    };
};