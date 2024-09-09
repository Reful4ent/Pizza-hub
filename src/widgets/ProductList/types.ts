import {ProductCardProps} from "@/entities/Product/ProductCard/types";


export interface IProductList{
    searchFilter: string,
    categoryId: number,
    list: ProductCardProps[] | null,
}