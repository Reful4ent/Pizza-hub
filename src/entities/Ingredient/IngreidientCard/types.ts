import {ProductCardProps} from "@/entities/Product/ProductCard/types";


export type IngredientsConverterFunc = (ingridientsToConvert: any) => IngredientProps[];

export interface IIngredient {
    ingredientCard: IngredientProps | null ,
    onClick?: (ingredient: IngredientProps) => void,
}

export type IngredientProps = {
    id: number
    name: string,
    price: number,
    description: string,
    image: string,
}
