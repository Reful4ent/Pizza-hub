import axios from "axios";
import {urlRoute} from "@/shared/api/route";
import {token} from "@/shared/api/token";
import {OrderType, ProductListItem} from "@/app/context/ShopCartProvider/types";

export const setProductFromCartPriceCalculate = async (product: ProductListItem) => {
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
        return result.data;
    } catch (error) {
        console.log(error);
    }
}


export const getCartPriceCalculate = async (shopCart: ProductListItem[]) => {
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
        return result.data;
    } catch (error) {
        console.log(error);
    }
}

export const createOrder = async (order: OrderType) => {
    try {
        await axios.get(
            urlRoute +
            '/products',
            {
                headers: {
                    'Authorization': `Bearer ` + token,
                }
            }
        )
    } catch (error) {
        console.log(error);
    }
}