import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {ShopCartContext} from "@/app/context/ShopCartProvider/context";
import {PriceAttr, ProductCardProps} from "@/entities/Product/ProductCard/types";
import {
    ProductListItem,
    ProductSmallListItem,
} from "@/app/context/ShopCartProvider/types";
import axios from "axios";
import {urlRoute} from "@/shared/api/route";
import {token} from "@/shared/api/token";
import {IngredientListItem} from "@/entities/Ingredient/IngreidientCard/types";

export const ShopCartProvider: FC<PropsWithChildren> = ({children}) => {

    const [shopCart, setShopCart] = useState<ProductListItem[]>([]);
    const [shopCartPrice, setShopCartPrice] = useState<number>(0);

    const setProductFromCartPrice = useCallback(async (product: ProductListItem) => {
        try {
            const result = await axios.post(
                urlRoute +
                '/productFromCartCalculate',{
                    productId: product.product.id,
                    addedIngredients: product.addedIngredients,
                    currentSize: product.currentSize,
                    count: product.count
                },
                {
                    headers: {
                        'Authorization': `Bearer ` + token,
                    }
                }
            )
            product.totalPrice = result.data;
        } catch (error) {
            console.log(error);
        }
    },[])

    const getCartPrice = useCallback(async () => {
        try {
            const result = await axios.post(
                urlRoute +
                '/cartCalculate', {
                    shopCart
                },
                {
                    headers: {
                        'Authorization': `Bearer ` + token,
                    }
                }
            )
            setShopCartPrice(result.data);
        } catch (error) {
            console.log(error);
        }
    }, [shopCart])


    const addProductToCart = useCallback(async (product: ProductCardProps, currentSize: PriceAttr, addedIngredients: IngredientListItem[]) => {
        if (shopCart.some(element => element.product.id === product.id)
            &&
            IsDuplicate({
                product: product,
                currentSize: currentSize,
                addedIngredients: addedIngredients,
            }, shopCart)) {

            setShopCart(shopCart.map(element => {

                if (element.product.id === product.id
                    && element.currentSize.id === currentSize.id
                    && element.addedIngredients?.length === addedIngredients?.length) {

                    for (let j = 0; j < element.addedIngredients.length; j++) {
                        if (element.addedIngredients[j].ingredient.id !== addedIngredients[j].ingredient.id
                            || element.addedIngredients[j].count !== addedIngredients[j].count) {
                            return element;
                        }
                    }

                    element.count++;
                    setProductFromCartPrice(element);
                    return element;

                } else return element;
            }))
        } else {
            const tempProduct = {
                product: product,
                currentSize: currentSize,
                addedIngredients: addedIngredients,
                count: 1,
                totalPrice: 0,
            }
            setProductFromCartPrice(tempProduct);
            setShopCart([...shopCart, tempProduct]);
        }
    },[setProductFromCartPrice,shopCart])

    const removeProductFromCart = useCallback((indexOfCart: number) => {
        setShopCart(
            shopCart.filter(
                (productFromCart, index) => index !== indexOfCart)
        );
    },[shopCart])

    const plusProductFromCart = useCallback(async (indexOfCart: number) => {
        setShopCart(
            shopCart.map(
                (productFromCart, index) => {
                    if(index === indexOfCart) {
                        productFromCart.count++;
                    }
                    setProductFromCartPrice(productFromCart);
                    return productFromCart;
                }
            )
        )
    },[setProductFromCartPrice,shopCart])


    const minusProductFromCart = useCallback( async (indexOfCart: number) => {
            setShopCart(
                shopCart
                    .map(
                        (productFromCart, index) => {
                            if(index === indexOfCart) {
                                productFromCart.count--;
                            }
                            setProductFromCartPrice(productFromCart);
                            return productFromCart;
                        }
                    )
                    .filter(productFromCart => productFromCart.count > 0)
            )
        }
    ,[setProductFromCartPrice,shopCart])

    const value = {
        shopCart,
        shopCartPrice,
        addProductToCart,
        removeProductFromCart,
        plusProductFromCart,
        minusProductFromCart
    }

    useEffect(() => {
        getCartPrice().catch();
    }, [getCartPrice]);

    return (
        <>
            <ShopCartContext.Provider value={value}>
                {children}
            </ShopCartContext.Provider>
        </>
    )
}


const IsDuplicate = (product: ProductSmallListItem, productsFromCart: ProductListItem[]) => {
    for (let i = 0; i < productsFromCart.length; i++) {
        if (productsFromCart[i].product.id !== product.product.id) {
            continue;
        }

        if (productsFromCart[i].addedIngredients && product.addedIngredients
            && productsFromCart[i].addedIngredients.length === product.addedIngredients.length) {

            productsFromCart[i].addedIngredients.sort((a, b) => a.ingredient.id - b.ingredient.id);
            product.addedIngredients.sort((a, b) => a.ingredient.id - b.ingredient.id);

            let result = true;
            for (let j = 0; j < productsFromCart[i].addedIngredients.length; j++) {
                if (productsFromCart[i].addedIngredients[j].ingredient.id !== product.addedIngredients[j].ingredient.id
                    || productsFromCart[i].addedIngredients[j].count !== product.addedIngredients[j].count) {
                    result = false;
                }
            }

            if (result && productsFromCart[i].currentSize.id == product.currentSize.id) {
                return true;
            }
        }
    }
    return false;
}
