import {FC} from "react";
import {IAddedIngredientsList} from "@/widgets/IngredientsList/types";


export const AddedIngredientList: FC<IAddedIngredientsList> = ({addedIngredients, onClick, onCloseClick}) => {

    return (
        <>
            {
                addedIngredients
                    ?.map((element, index) => (
                        <div className="flex flex-row bg-purple-500" key={index}>
                            <p>{element.ingredient.name}</p>
                            <div className="flex flex-row self-end">
                                <button
                                    className="mx-[10px]"
                                    onClick={() => onClick(element.ingredient, false)}>-
                                </button>
                                <p className="mx-[10px]">{element.count}</p>
                                <button
                                    className="mx-[10px]"
                                    onClick={() => onClick(element.ingredient, true)}>+
                                </button>
                                <button className="mx-[10px]" onClick={() => onCloseClick(element)}>X</button>
                            </div>
                        </div>
                    ))
            }
        </>
    )
}


