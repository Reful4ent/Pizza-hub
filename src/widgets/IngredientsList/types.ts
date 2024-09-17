import {IngredientProps} from "@/entities/Ingredient/IngreidientCard/types";
import {IngredientListItem} from "@/entities/Ingredient/IngreidientCard/types";

export interface IIngredientsList {
    ingredients: IngredientListItem[] | null,
    onClick?: (ingredient: IngredientProps) => void,
}


export interface IAddedIngredientsList {
    addedIngredients: IngredientListItem[];
    onClick: (ingredient: IngredientProps, plus: boolean) => void;
    onCloseClick: (ingredient: IngredientListItem) => void;
}