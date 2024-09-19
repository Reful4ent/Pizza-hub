import {FC, useCallback, useEffect, useState} from "react";
import {IFullProduct} from "@/entities/Product/ProductCard/types";
import {AddedIngredientList, IngredientsList} from "@/widgets/IngredientsList";
import {IngredientListItem} from "@/entities/Ingredient/IngreidientCard/types";
import {PriceAttr} from "@/entities/Product/ProductCard/types";
import {IngredientProps} from "@/entities/Ingredient/IngreidientCard/types";
import {Button} from "@/shared/ui/Button";
import {useShopCart} from "@/app/context/ShopCartProvider/context";
import axios from "axios";
import {urlRoute} from "@/shared/api/route";
import {token} from "@/shared/api/token";

const IsArrayContains = (id: number, arr: IngredientListItem[]) => {
    return arr.some((element) => element.ingredient.id === id);
}

export const FullProductCard: FC<IFullProduct> = ({productCard, ingredients}) => {

    const [currentImg, setCurrentImg] = useState(productCard.images[0])
    const [currentSize, setCurrentSize] = useState<PriceAttr>(productCard.price[0])
    const [currentPrice, setCurrentPrice] = useState(0);
    const [ingredientsList, setIngredientsList] = useState<IngredientListItem[]>([]);
    const [addedIngredients, setAddedIngredients] = useState<IngredientListItem[]>([]);


    const shopCart = useShopCart();

    const handleImageClick = (image: string) => {
        setCurrentImg(image);
    }

    const getProductPrice = useCallback(async () => {
        try {
            const result = await axios.post(
                urlRoute +
                '/productCalculate',
                {
                    productId: productCard.id,
                    addedIngredients: addedIngredients,
                    currentSize: currentSize
                },
                {
                    headers: {
                        'Authorization': `Bearer ` + token,
                    }
                }
            )
            setCurrentPrice(result.data);
        } catch (error) {
            console.error(error);
        }
    },[addedIngredients,currentSize,productCard.id])


    const handleSizeClick = async (index: number) => {
        if(currentSize){
            setCurrentSize({
                id:productCard.price[index].id,
                price: productCard.price[index].price,
                name: productCard.price[index].name,
            });
        }
    }

    const handleAddClick = () => {
        shopCart?.addProductToCart(productCard, currentSize, addedIngredients);
    }


    const handleIngredientClick = useCallback(async (ingredient: IngredientProps | null) => {
        if(ingredient && !IsArrayContains(ingredient.id,addedIngredients)) {
            setAddedIngredients([...addedIngredients, {ingredient: ingredient,count: 1}])
        }
    },[addedIngredients])


    const handleCountEditClick = async (ingredient: IngredientProps, plus: boolean) => {
        if(plus) {
            setAddedIngredients(addedIngredients.map((element) => (
                element.ingredient.id === ingredient.id ? {...element, count: element.count + 1} : element)
            ));
        } else {
            setAddedIngredients(addedIngredients
                .map((element) => (
                    element.ingredient.id === ingredient.id ? {...element, count: element.count - 1} : element))
                .filter((element) => (
                    element.count > 0 && element
                )));
        }
    }

    const handleIngredientCloseClick = (ingredientItem: IngredientListItem) => {
        setAddedIngredients(addedIngredients
            .filter((element) => (
                element != ingredientItem
            )));
    }

    useEffect( () => {
        getProductPrice().catch(console.error);
        if(ingredientsList.length === 0) {
            setIngredientsList(ingredients);
        }
    }, [getProductPrice,ingredientsList.length,ingredients]);

    return (
        <div className="flex flex-row justify-center items-center">
            <div className="w-[20%]">
                {productCard.images.map((image: string, index: number) => (
                    <img className="" key={index} src={image}
                         onClick={() => handleImageClick(image)} alt=""/>
                ))}
            </div>

            <div className="w-[30%]">
                <img className="" src={currentImg} alt={productCard.name}/>
            </div>

            <div className="flex flex-col">
                <p className="">{productCard.name}</p>
                <p className="">{productCard.description}</p>
                <p className="">{productCard.category.name}</p>
                <div>
                    <ul className="flex flex-row">
                        {productCard.price.map((element: any, index: number) => (
                            <li className="bg-amber-400 p-[10px] hover:bg-red-400" key={index}
                                onClick={() => handleSizeClick(index)}>{element.name}</li>
                        ))}
                    </ul>
                </div>

                <div>
                    <p className="my-[2%]">Цена: {currentPrice}</p>
                </div>


                {
                    (productCard.ingredients && productCard.ingredients.length !== 0)
                    &&
                    <div>
                        <p>Состав:</p>
                        <IngredientsList ingredients={productCard.ingredients}/>
                    </div>
                }

                {
                    productCard.addIngredient
                    &&
                    <div>
                        <div>
                            <p>Добавки:</p>
                            <IngredientsList ingredients={ingredientsList} onClick={handleIngredientClick}/>
                        </div>

                        <div>
                            <p>Список добавленных добавок:</p>
                            <AddedIngredientList addedIngredients={addedIngredients} onClick={handleCountEditClick}
                                                 onCloseClick={handleIngredientCloseClick}/>
                        </div>
                    </div>
                }

                <Button className="p-[10px] bg-red-300" onClick={handleAddClick}>Add</Button>
            </div>
        </div>
    )
}