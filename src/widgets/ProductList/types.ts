import {ProductCardProps} from "@/entities/ProductCard/types";


export interface IProductList{
    searchFilter: string,
    categoryId: number,
    list: ProductCardProps[] | null,
}