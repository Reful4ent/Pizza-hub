import {createContext, useContext} from "react";
import {IShopCart} from "@/app/context/ShopCartProvider/types";

export const ShopCartContext = createContext<IShopCart | null>(null)

export function useShopCart() {
    return useContext(ShopCartContext)
}