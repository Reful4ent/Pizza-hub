import {PriceAttr, ProductCardProps} from "@/entities/Product/ProductCard/types";
import {IngredientListItem} from "@/entities/Ingredient/IngreidientCard/types";

export interface IShopCart {
    shopCart: ProductListItem[];
    addProductToCart: (product: ProductCardProps, selectedSize: PriceAttr, addedIngredients: IngredientListItem[]) => void;
    removeProductFromCart: (product: ProductCardProps) => void;
}

export type ProductListItem = {
    product: ProductCardProps;
    currentSize: PriceAttr;
    addedIngredients: IngredientListItem[];
    count: number;
}