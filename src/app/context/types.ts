
export interface IContext {
    headerContext : {
        name: string;
        iconUrl: string | null;
    }
}

export interface IConfigContextValue {
    context: IContext | null;
}