import type { TokenType } from "@/Flashlight";

export * from "./AtomDark";

export type LanguageStyle = {
    tokenStyles: {
        [tokenType in Exclude<TokenType, "text">]: Partial<CSSStyleDeclaration>;
    };
    wrapperStyles: {
        [wrapperType in "pre" | "code"]: Partial<CSSStyleDeclaration>;
    };
};