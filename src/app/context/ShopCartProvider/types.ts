import {PriceAttr, ProductCardProps} from "@/entities/Product/ProductCard/types";

export interface IShopCart {
    shopCart: ProductListItem[];
    addProductToCart: (product: ProductCardProps, selectedSize: PriceAttr) => void;
    removeProductFromCart: (product: ProductCardProps) => void;
}

export type ProductListItem = {
    product: ProductCardProps;
    currentSizeAndPrice: PriceAttr;
    count: number;
}