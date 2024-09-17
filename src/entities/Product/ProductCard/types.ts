import {IngredientListItem, IngredientProps} from "@/entities/Ingredient/IngreidientCard/types";
import {CategoryItem} from "@/widgets/CategoriesList/types";


export type ProductConverterFunc = (productToConvert: any) => ProductCardProps;

export interface IProduct {
    productCard: ProductCardProps | null | undefined,
}

export interface IFullProduct {
    productCard: ProductCardProps;
    ingredients: IngredientListItem[];
}

export type PriceAttr = {
    id: number,
    price: number,
    name: string,
}


export type ProductCardProps = {
    id: number;
    name: string;
    description: string;
    price: PriceAttr[],
    category: CategoryItem,
    images: string[];
    ingredients: IngredientListItem[] | null;
    addIngredient: boolean;
}


