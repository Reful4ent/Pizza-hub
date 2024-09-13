import {FC} from "react";
import {IIngredientsList} from "@/widgets/IngredientsList/types";
import {IngredientCard} from "@/entities/Ingredient/IngreidientCard/ui/Ingridient";


export const IngredientsList: FC<IIngredientsList> = ({ingredients, onClick}) => {

    return (
        <>
            <div className="grid grid-cols-5">
                {
                    ingredients
                    &&
                    ingredients
                        .map((element, index) => (
                            <IngredientCard ingredientCard={element} key={index} onClick={onClick}/>
                        ))
                }
            </div>
        </>
    )
}