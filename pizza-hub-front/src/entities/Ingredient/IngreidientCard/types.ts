

export type IngredientsConverterFunc = (ingredientsToConvert: any) => IngredientListItem[];

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

export type IngredientListItem = {
    ingredient: IngredientProps,
    count: number,
}
