import {IngridientProps} from "@/entities/Ingridient/types";

export interface IProduct {
    productCard: ProductCardProps | null | undefined,
}

export type ProductCardProps = {
    name: string;
    description: string;
    price: number,
    imageUrl: string | null;
    ingredients: IngridientProps[] | null;
}