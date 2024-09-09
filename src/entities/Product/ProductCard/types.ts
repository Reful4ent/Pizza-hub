import {IngridientProps} from "@/entities/Ingridient/types";
import {CategoryItem} from "@/widgets/CategoriesList/types";


export type ProductConverterFunc = (productToConvert: any) => ProductCardProps;

export interface IProduct {
    productCard: ProductCardProps | null | undefined,
}

export type ProductCardProps = {
    id: number;
    name: string;
    description: string;
    price: object,
    category: CategoryItem,
    images: string[];
    ingredients: IngridientProps[] | null;
}


