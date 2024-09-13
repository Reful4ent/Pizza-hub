import {IngredientProps} from "@/entities/Ingredient/IngreidientCard/types";
import {IngredientListItem} from "@/pages/MenuProductPage/types";


export interface IIngredientsList {
    ingredients: IngredientProps[] | null,
    onClick?: (ingredient: IngredientProps) => void,
}


export interface IAddedIngredientsList {
    addedIngredients: IngredientListItem[];
    onClick: (ingredient: IngredientProps, plus: boolean) => void;
    onCloseClick: (ingredient: IngredientListItem) => void;
}