import {FC} from "react";
import {IIngredientsList} from "@/widgets/IngredientsList/types";
import {IngredientCard} from "@/entities/IngreidientCard/ui/Ingridient";


export const IngrediensList: FC<IIngredientsList> = ({ingredients}) => {

    return (
        <>
            <div className="grid grid-cols-5">
                {
                    ingredients
                        .map((element, index) => (
                            <IngredientCard ingredientCard={element} key={index}/>
                        ))
                }
            </div>
        </>
    )
}