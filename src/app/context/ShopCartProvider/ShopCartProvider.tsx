import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {ShopCartContext} from "@/app/context/ShopCartProvider/context";
import {PriceAttr, ProductCardProps} from "@/entities/Product/ProductCard/types";
import {ProductListItem} from "@/app/context/ShopCartProvider/types";
import {Simulate} from "react-dom/test-utils";
import axios from "axios";
import {urlRoute} from "@/shared/api/route";
import {token} from "@/shared/api/token";
import {IngredientListItem} from "@/entities/Ingredient/IngreidientCard/types";

//ToDO: сделать запрос на сервер
export const ShopCartProvider: FC<PropsWithChildren> = ({children}) => {

    const [shopCart, setShopCart] = useState<ProductListItem[]>([]);


    const getCartPrice = useCallback( async () => {
        try {
            const result = await axios.post(
                urlRoute +
                '/cartCalculate',{
                    shopCart
                },
                {
                    headers: {
                        'Authorization': `Bearer ` + token,
                    }
                }
            )

            console.log(result.data)
        } catch (error) {
            console.log(error);
        }
    }, [shopCart])

    const addProductToCart = (product: ProductCardProps, currentSize: PriceAttr, addedIngredients: IngredientListItem[]) => {
        if(shopCart.some(element => element.product.id === product.id)
            &&
            IsDuplicate({product: product, currentSize: currentSize, addedIngredients: addedIngredients, count: 1}, shopCart)) {
            setShopCart(shopCart.map(element => {
                if(element.product.id === product.id
                    && element.currentSize.id === currentSize.id
                    && element.addedIngredients?.length === addedIngredients?.length) {

                    for (let j = 0; j < element.addedIngredients.length; j++) {
                        if(element.addedIngredients[j].ingredient.id !== addedIngredients[j].ingredient.id
                            || element.addedIngredients[j].count !== addedIngredients[j].count) {
                            return element;
                        }
                    }

                    element.count++;
                    return element;
                } else return element;
            }))
        } else {
            setShopCart([...shopCart,{product: product, currentSize: currentSize, addedIngredients: addedIngredients, count: 1}]);
        }
    }

    const removeProductFromCart = (product: ProductCardProps) => {

    }

    const value = {
        shopCart,
        addProductToCart,
        removeProductFromCart,
    }

    useEffect(() => {
        getCartPrice().catch(console.error);
    }, [getCartPrice]);

    return(
        <>
            <ShopCartContext.Provider value={value}>
                {children}
            </ShopCartContext.Provider>
        </>
    )
}


const IsDuplicate = (product: ProductListItem, productsFromCart: ProductListItem[]) => {
    for (let i = 0; i < productsFromCart.length; i++) {
        if(productsFromCart[i].product.id !== product.product.id){
            continue;
        }

        if(productsFromCart[i].addedIngredients && product.addedIngredients
            && productsFromCart[i].addedIngredients.length === product.addedIngredients.length) {

            productsFromCart[i].addedIngredients.sort((a, b) => a.ingredient.id - b.ingredient.id );
            product.addedIngredients.sort((a, b) => a.ingredient.id - b.ingredient.id );

            let result = true;
            for (let j = 0; j < productsFromCart[i].addedIngredients.length; j++) {
                if(productsFromCart[i].addedIngredients[j].ingredient.id !== product.addedIngredients[j].ingredient.id
                    || productsFromCart[i].addedIngredients[j].count !== product.addedIngredients[j].count) {
                    result = false;
                }
            }

            if(result && productsFromCart[i].currentSize.id == product.currentSize.id) {
                return true;
            }
        }
    }
    return false;
}
