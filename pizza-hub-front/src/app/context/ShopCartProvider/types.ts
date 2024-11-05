import {PriceAttr, ProductCardProps} from "@/entities/Product/ProductCard/types";
import {IngredientListItem} from "@/entities/Ingredient/IngreidientCard/types";

export interface IShopCart {
    shopCart: ProductListItem[];
    shopCartPrice: number;
    addProductToCart: (product: ProductCardProps, selectedSize: PriceAttr, addedIngredients: IngredientListItem[]) => void;
    removeProductFromCart: (indexOfCart: number) => void;
    plusProductFromCart: (indexOfCart: number) => void;
    minusProductFromCart: (indexOfCart: number) => void;
}


export type ProductListItem = ProductSmallListItem & {
    totalPrice: number;
    count: number;
}


export type ProductSmallListItem = {
    product: ProductCardProps;
    currentSize: PriceAttr;
    addedIngredients: IngredientListItem[];
}

export type OrderType = {
    shopCart: ProductListItem[];
    surname: string;
    name: string;
    phoneNumber: string;
}