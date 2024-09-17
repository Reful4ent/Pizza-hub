import {memo, useEffect, useState} from "react";
import {IIngredient, IngredientProps} from "@/entities/Ingredient/IngreidientCard/types";


export const IngredientCard = memo<IIngredient>(({ingredientCard, onClick}) => {
    const [ingredient, setIngredient] = useState<IngredientProps | null>(null);

    useEffect(() => {
        if(ingredientCard) {
            setIngredient(ingredientCard);
        }
    }, [ingredientCard]);

    return (
        <>
            {
                ingredient
                &&
                <div onClick={() => onClick?.(ingredient)}>
                    <img src={ingredient?.image} alt={ingredient?.name}/>
                    <p>{ingredient?.name}</p>
                    <p>{ingredient?.price}</p>
                </div>
            }
        </>
    )
})