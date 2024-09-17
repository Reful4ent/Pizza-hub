import {FC, useEffect, useState} from "react";
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


//ToDo: Сделать запрос на сервер для подсчета товара
export const FullProductCard: FC<IFullProduct> = ({productCard, ingredients}) => {

    const [currentImg, setCurrentImg] = useState(productCard.images[0])
    const [currentPrice, setCurrentPrice] = useState<PriceAttr>(productCard.price[0])
    const [priceOfIngredients, setPriceOfIngredients] = useState(0);
    const [ingredientsList, setIngredientsList] = useState<IngredientListItem[]>([]);
    const [addedIngredients, setAddedIngredients] = useState<IngredientListItem[]>([]);


    const shopCart = useShopCart();

    const handleImageClick = (image: string) => {
        setCurrentImg(image);
    }

    const getProductPrice = async (ingredient: IngredientProps | null) => {
        const result = await axios.post(
            urlRoute +
            '/productCalculate',
            {
                product: productCard,
                ingredient: ingredient,
                addedIngredients: addedIngredients,
                currentPrice: currentPrice
            },
            {
                headers: {
                    'Authorization': `Bearer ` + token,
                }
            }
        )
    }


    const handleSizeClick = (index: number) => {
        if(currentPrice){
            setCurrentPrice({
                id:productCard.price[index].id,
                price: productCard.price[index].price,
                name: productCard.price[index].name,
            });
        }
    }

    const handleAddClick = () => {
        const tempProduct = structuredClone(productCard);

        addedIngredients.forEach((element) => {
            if(tempProduct.ingredients?.some(item => item.ingredient.id === element.ingredient.id)) {

                const ingredientKey = tempProduct.ingredients?.findIndex(item => item.ingredient.id === element.ingredient.id);

                for (let i = 0; i< element.count; i++ ) {
                    tempProduct.ingredients[ingredientKey].count++;
                }

            } else {
                tempProduct.ingredients?.push(element);
            }
        })

        shopCart?.addProductToCart(tempProduct, currentPrice);
    }


    const handleIngredientClick = async (ingredient: IngredientProps | null) => {
        await getProductPrice(ingredient);
        if(ingredient && !IsArrayContains(ingredient.id,addedIngredients)) {
            setAddedIngredients([...addedIngredients, {ingredient: ingredient,count: 1}])
            setPriceOfIngredients(prevPrice => prevPrice + ingredient.price);
        }
    }


    const handleCountEditClick = (ingredient: IngredientProps, plus: boolean) => {
        if(plus) {
            setAddedIngredients(addedIngredients.map((element) => (
                element.ingredient.id === ingredient.id ? {...element, count: element.count + 1} : element)
            ));
            setPriceOfIngredients(prevPrice => prevPrice + ingredient.price);
        } else {
            setAddedIngredients(
                addedIngredients
                    .map((element) => (
                        element.ingredient.id === ingredient.id ? {...element, count: element.count - 1} : element))
                    .filter((element) => (
                        element.count > 0 && element
                    ))
            );
            setPriceOfIngredients(prevPrice => prevPrice - ingredient.price);
        }
    }

    const handleIngredientCloseClick = (ingredientItem: IngredientListItem) => {
        setPriceOfIngredients(prevPrice => prevPrice - ingredientItem.count * ingredientItem.ingredient.price)
        setAddedIngredients(
            addedIngredients
                .filter((element) => (
                    element != ingredientItem
                ))
        );
    }

    useEffect(() => {
        setIngredientsList(ingredients)
    }, [ingredients]);

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
                    <p className="my-[2%]">Цена: {currentPrice.price}</p>
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
                            <IngredientsList ingredients={ingredientsList} onClick={ handleIngredientClick}/>
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