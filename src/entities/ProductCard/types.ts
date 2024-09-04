import {IngridientProps} from "@/entities/Ingridient/types";
import {CategoryItem} from "@/features/CategoriesList/types";

export interface IProduct {
    productCard: ProductCardProps | null | undefined,
}

export type ProductCardProps = {
    name: string;
    description: string;
    price: object,
    category: CategoryItem,
    images: string[];
    ingredients: IngridientProps[] | null;
}