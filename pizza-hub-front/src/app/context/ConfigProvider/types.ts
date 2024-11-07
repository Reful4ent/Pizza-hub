
export interface IContext {
    headerContext : {
        name: string;
        iconUrl: string | null;
        contactPhoneNumber: string | null;
    },
    standardProductCardContext: {
        productStandardButtonType: "link" | "text" | "default" | "primary" | "dashed" | undefined,
        colorStandardProductButton: string,
        colorHoverStandardProductButton: string,
        colorBoxShadowStandardProductButton: string,
    },
    footerContext: {
        contactEmail: string;
    },
}

export interface IConfigContextValue {
    context: IContext | null;
}