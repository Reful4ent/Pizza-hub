import {FC} from "react";
import {IAddedIngredientsList} from "@/widgets/IngredientsList/types";
import {Button} from "@/shared/ui/Button";


export const AddedIngredientList: FC<IAddedIngredientsList> = ({addedIngredients, onMinusClick, onPlusClick, onDeleteClick}) => {

    return (
        <>
            {
                addedIngredients
                    ?.map((element, index) => (
                        <div className="flex flex-row bg-purple-500" key={index}>
                            <p>{element.ingredient.name}</p>
                            <div className="flex flex-row self-end">
                                <Button
                                    className="mx-[10px]"
                                    onClick={() => onMinusClick(element.ingredient)}
                                    children={"-"}
                                />
                                <p className="mx-[10px]">{element.count}</p>
                                <Button
                                    className="mx-[10px]"
                                    onClick={() => onPlusClick(element.ingredient)}
                                    children={"+"}
                                />
                                <Button className="mx-[10px]" onClick={() => onDeleteClick(element)} children={"X"}/>
                            </div>
                        </div>
                    ))
            }
        </>
    )
}


