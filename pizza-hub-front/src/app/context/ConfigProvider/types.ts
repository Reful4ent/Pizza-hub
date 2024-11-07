
export interface IContext {
    headerContext : {
        name: string;
        iconUrl: string | null;
        phoneNumber: string | null;
    },
    standardProductCardContext: {
        productStandardButtonType: "link" | "text" | "default" | "primary" | "dashed" | undefined,
        colorStandardProductButton: string,
        colorHoverStandardProductButton: string,
        colorBoxShadowStandardProductButton: string,
    }
}

export interface IConfigContextValue {
    context: IContext | null;
}