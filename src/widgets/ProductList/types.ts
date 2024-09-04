import {ProductCardProps} from "@/entities/ProductCard/types";


export interface IProductList{
    categoryId: number,
    list: ProductCardProps[] | null,
}