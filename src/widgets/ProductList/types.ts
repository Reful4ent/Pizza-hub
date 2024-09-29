import {ProductCardProps} from "@/entities/Product/ProductCard/types";


export interface IProductList{
    searchFilter: string,
    categoryId: number,
    productList: ProductCardProps[] | null,
}