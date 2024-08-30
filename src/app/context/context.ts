import { createContext, useContext} from "react";
import {IConfigContextValue} from "@/app/context/types";


export const ConfigContext = createContext<IConfigContextValue | null>(null);


export function useConfig() {
    return useContext(ConfigContext);
}