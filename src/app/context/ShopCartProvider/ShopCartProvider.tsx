import {FC, PropsWithChildren, useState} from "react";
import {ShopCartContext} from "@/app/context/ShopCartProvider/context";
import {PriceAttr, ProductCardProps} from "@/entities/Product/ProductCard/types";
import {ProductListItem} from "@/app/context/ShopCartProvider/types";

//ToDO: сделать запрос на сервер
export const ShopCartProvider: FC<PropsWithChildren> = ({children}) => {

    const [shopCart, setShopCart] = useState<ProductListItem[]>([]);

    const addProductToCart = (product: ProductCardProps, currentSizeAndPrice: PriceAttr) => {
        if(shopCart.some(element => element.product.id === product.id)
            &&
            IsDuplicate({product: product, currentSizeAndPrice: currentSizeAndPrice, count: 1}, shopCart)) {
            setShopCart(shopCart.map(element => {
                if(element.product.id === product.id
                    && element.currentSizeAndPrice.name === currentSizeAndPrice.name
                    && element.product.ingredients?.length === product.ingredients?.length) {

                    for (let j = 0; j < element.product.ingredients?.length; j++) {
                        if(element.product.ingredients[j].ingredient.id !== product.ingredients[j].ingredient.id
                            || element.product.ingredients[j].count !== product.ingredients[j].count) {
                            return element;
                        }
                    }

                    element.count++;
                    return element;
                } else return element;
            }))
        } else {
            setShopCart([...shopCart,{product: product, currentSizeAndPrice: currentSizeAndPrice, count: 1}]);
        }
    }

    const removeProductFromCart = (product: ProductCardProps) => {

    }

    const value = {
        shopCart,
        addProductToCart,
        removeProductFromCart,
    }

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
        if(productsFromCart[i].product.ingredients && product.product.ingredients
            && productsFromCart[i].product.ingredients?.length === product.product.ingredients.length) {

            productsFromCart[i].product.ingredients?.sort((a, b) => a.ingredient.id - b.ingredient.id );
            product.product.ingredients?.sort((a, b) => a.ingredient.id - b.ingredient.id );

            let result = true;
            for (let j = 0; j < productsFromCart[i].product.ingredients?.length; j++) {
                if(productsFromCart[i].product.ingredients[j].ingredient.id !== product.product.ingredients[j].ingredient.id
                    || productsFromCart[i].product.ingredients[j].count !== product.product.ingredients[j].count) {
                    result = false;
                }
            }

            if(result && productsFromCart[i].currentSizeAndPrice.name == product.currentSizeAndPrice.name) {
                return true;
            }
        }
    }
    return false;
}
