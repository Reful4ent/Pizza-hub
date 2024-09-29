import {FC, useMemo} from "react";
import {ISmallProduct} from "@/entities/Product/ProductCard/types";
import {Button} from "@/shared/ui/Button";


export const SmallProductCard: FC<ISmallProduct> = ({productFromCart, indexOfCart,onMinusClick,onPlusClick, onDeleteClick}) => {


    const addedIngredients = useMemo(() => {

        const addedIngredientsNames = productFromCart.addedIngredients.map(
            ingredientName => ` ${ingredientName.ingredient.name},`
        )

        if(addedIngredientsNames.length > 0) {
            addedIngredientsNames[addedIngredientsNames.length-1] = addedIngredientsNames[addedIngredientsNames.length-1].replace(',','');
        }

        return (
            <>
                <p>{addedIngredientsNames}</p>
            </>
        )
    },[productFromCart.addedIngredients])



    return (
        <>
            <div className="w-[100%] bg-amber-400 border-b border-gray-300">
                <div className="flex flex-row">
                    <img className="w-[25%]" src={productFromCart.product.images[0]} alt={"img"}/>
                    <div className="flex flex-col w-[70%] bg-violet-500">
                        <p>{productFromCart.product.name}</p>
                        <p className="">{productFromCart.currentSize.name}</p>

                        {addedIngredients}
                    </div>
                    <div>
                        <Button onClick={() => onDeleteClick(indexOfCart)} children={"X"}/>
                    </div>
                </div>
                <div className="flex flex-row">
                    <p className="w-[75%]">{productFromCart.totalPrice} ₽</p>
                    <div className="bg-amber-500 flex flex-row content-between justify-between right-0 w-[20%]">
                        <Button className="relative pl-[5px]" onClick={() => onMinusClick(indexOfCart)} children={"-"}/>
                        <p>{productFromCart.count}</p>
                        <Button className="relative pr-[5px]" onClick={() => onPlusClick(indexOfCart)} children={"+"}/>
                    </div>
                </div>
            </div>
        </>
    )
}