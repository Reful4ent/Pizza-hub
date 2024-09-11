import {FC, useCallback, useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {GoBackButton} from "@/features/GoBackButton";
import {IngredientProps} from "@/entities/IngreidientCard/types";
import {getIngridients} from "@/shared/api";
import {ingredientsConverter} from "@/entities/IngreidientCard/IngredientsConverter";
import {IngredientCard} from "@/entities/IngreidientCard/ui/Ingridient";

//:ToDo сделать чтобы кол-во добавок не уходило в минус + отрефакторить код и разнести на компоненты

export const MenuProductPage: FC = () => {
    const location = useLocation();
    const [currentImg, setCurrentImg] = useState(location.state.product.images[0])
    const [currentPrice, setCurrentPrice] = useState<PriceAttr | null>(null)
    const [priceOfIngedients, setPriceOfIngridients] = useState(0);
    const [ingredientsList,setIngredientsList] = useState<IngredientProps[]>([]);
    const [addedIngredients, setAddedIngredients] = useState<IngredientListCount[]>([]);

    const handleImageClick = (image: string) => {
        setCurrentImg(image);
        //console.log(location.state.product.price[0])
    }

    const handleSizeClick = (index: number) => {
        if(currentPrice){
            setCurrentPrice({
                id:location.state.product.price[index].id,
                price: location.state.product.price[index].price + priceOfIngedients,
                name: location.state.product.price[index].name,
            });
        }
        //location.state.product.price[index]
    }

    const handleAddClick = () => {
        console.log(location.state.product);
    }


    const handleIngredienClick = (ingredient: IngredientProps | null) => {
        if(ingredient) {
            if(!IsArrayContains(ingredient.id,addedIngredients)) {
                setAddedIngredients([...addedIngredients, {ingredient: ingredient,count: 1}])
                setPriceOfIngridients(prevPrice => prevPrice + ingredient.price);
                if(currentPrice) {
                    setCurrentPrice(
                        {
                            ...currentPrice,
                            price: currentPrice.price + ingredient.price,
                        }
                    )
                }
            }
        }
    }


    const handleCountEditClick = (ingredient: IngredientProps, plus: boolean) => {
        if(plus) {
            setAddedIngredients(addedIngredients.map((element) => (
              element.ingredient.id === ingredient.id ? {...element, count: element.count + 1} : element)
            ));
            setPriceOfIngridients(prevPrice => prevPrice + ingredient.price);
            if(currentPrice) {
                setCurrentPrice(
                    {
                        ...currentPrice,
                        price: currentPrice.price + ingredient.price,
                    }
                )
            }
            console.log(ingredient.price);
        } else {
            setAddedIngredients(addedIngredients.map((element) => (
                element.ingredient.id === ingredient.id ? {...element, count: element.count - 1} : element)
            ));
            setPriceOfIngridients(prevPrice => prevPrice - ingredient.price);
            if(currentPrice) {
                setCurrentPrice(
                    {
                        ...currentPrice,
                        price: currentPrice.price - ingredient.price,
                    }
                )
            }
        }
    }

    const fetchData = useCallback(async () => {
        const response = await getIngridients();
        setIngredientsList(ingredientsConverter(response));
    },[])

    useEffect(() => {
        fetchData();
        setCurrentPrice(location.state.product.price[0])
    }, [fetchData]);

    return (
        <>
            <div className="flex justify-center">
                <div className="flex flex-col items-center justify-center w-[80%]">
                    <GoBackButton/>
                    <div className="flex flex-row justify-center items-center">
                        <div className="w-[20%]">
                            {location.state.product.images.map((image: string, index: number) => (
                                <img className="" key={index} src={image}
                                     onClick={() => handleImageClick(image)} alt=""/>
                            ))}
                        </div>
                        <div className="w-[30%]">
                            <img className="" src={currentImg} alt={location.state.product.name}/>
                        </div>
                        <div className="flex flex-col">
                            <p className="">{location.state.product.name}</p>
                            <p className="">{location.state.product.description}</p>
                            <p className="">{location.state.product.category.name}</p>
                            <div>
                                <ul className="flex flex-row">
                                    {location.state.product.price.map((element: any, index: number) => (
                                        <li className="bg-amber-400 p-[10px] hover:bg-red-400" key={index} onClick={() => handleSizeClick(index)}>{element.name}</li>
                                    ))}
                                </ul>
                            </div>
                            <div>
                                <p className="my-[2%]">Цена: {currentPrice?.price}</p>
                            </div>
                            <div>
                                <p>Состав:</p>
                                <div className="grid grid-cols-5">
                                    {
                                        location.state.product.ingredients.map((element: any,index: number) => (
                                            <div key={index}>
                                                <img className="" src={element.images} alt={element.name}/>
                                                <p>{element.name}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            {
                                ingredientsList
                                &&
                                <div>
                                    <p>Добавки:</p>
                                    <div className="grid grid-cols-5">
                                        {
                                            ingredientsList
                                                .map((element, index) => (
                                                <IngredientCard ingredientCard={element} key={index} onClick={handleIngredienClick}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            }
                            <div>
                                <p>list:</p>
                                {
                                    addedIngredients
                                        ?.map((element, index) => (
                                            <div className="flex flex-row bg-purple-500" key={index}>
                                                <p>{element.ingredient.name}</p>
                                                <div className="flex flex-row self-end">
                                                    <button
                                                        className="mx-[10px]"
                                                        onClick={() => handleCountEditClick(element.ingredient, false)}>-
                                                    </button>
                                                    <p className="mx-[10px]">{element.count}</p>
                                                    <button
                                                        className="mx-[10px]"
                                                        onClick={() => handleCountEditClick(element.ingredient, true)}>+
                                                    </button>
                                                </div>
                                            </div>
                                        ))
                                }
                            </div>
                            <button className="p-[10px] bg-red-300" onClick={handleAddClick}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export type PriceAttr = {
    id: number,
    price: number,
    name: string,
}

export type IngredientListCount = {
    ingredient: IngredientProps,
    count: number,
}

const IsArrayContains = (id: number, arr: IngredientListCount[]) => {
    return arr.some((element) => element.ingredient.id === id);
}