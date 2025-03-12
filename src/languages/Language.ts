import { type TokenType } from "@/Flashlight";

export type LanguageStyle = {
    tokenStyles: {
        [tokenType in TokenType]: Partial<CSSStyleDeclaration>;
    };
    wrapperStyles: {
        [wrapperType in "pre" | "code"]: Partial<CSSStyleDeclaration>;
    };
};