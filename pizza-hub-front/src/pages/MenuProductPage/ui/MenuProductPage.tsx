import {FC, useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {GoBackButton} from "@/features/GoBackButton";
import {IngredientListItem} from "@/entities/Ingredient/IngreidientCard/types";
import {getIngredients} from "@/shared/api";
import {ingredientsConverter} from "@/entities/Ingredient/IngredientsConverter";
import {FullProductCard} from "@/entities/Product/ProductCard";

//:ToDo сделать чтобы кол-во добавок не уходило в минус + отрефакторить код и разнести на компоненты



export const MenuProductPage: FC = () => {
    const location = useLocation();
    const [ingredients, setIngredients] = useState<IngredientListItem[]>([]);


    const fetchData = useCallback(async () => {
        const response = await getIngredients();
        setIngredients(ingredientsConverter(response));
    },[])

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col items-center justify-center w-[80%]">
                    <GoBackButton/>
                    <FullProductCard productCard={location.state.product} ingredients={ingredients}/>
                </div>
            </div>
        </>
    )
}