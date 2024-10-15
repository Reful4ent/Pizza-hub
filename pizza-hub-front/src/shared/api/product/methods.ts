import axios from "axios";
import {urlRoute} from "@/shared/api/route";
import {token} from "@/shared/api/token";
import {PriceAttr} from "@/entities/Product/ProductCard/types";
import {IngredientListItem} from "@/entities/Ingredient/IngreidientCard/types";


/*export const getProducts = async (page: number) => {
    try {
        const products = await axios.get(
            urlRoute +
            `/products?populate=*&sort=category.id:asc&pagination[page]=${page}&pagination[pageSize]=6`,
            {
                headers: {
                    'Authorization': `Bearer ` + token,
                }
            }
        )
        console.log(products);
        return {
            products: products.data.data,
            totalPages: products.data.meta.pagination.pageCount
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}*/

export const getCategories = async () => {
    try {
        const categories = await axios.get(
            urlRoute +
            '/categories',
            {
                headers: {
                    'Authorization': `Bearer ` + token,
                }
            }
        )
        return categories.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const getIngredients = async () => {
    try {
        const ingredients = await axios.get(
            urlRoute +
            '/ingredients?populate=*',
            {
                headers: {
                    'Authorization': `Bearer ` + token,
                }
            }
        )
        return ingredients.data.data;
    } catch (error){
        console.error(error);
        return null;
    }
}

export const getFilteredProducts = async (categoryId: number, searchQuery: string, pageNumber: string) => {
    try {
        const filteredProducts = await axios.post(
            urlRoute +
            '/getFilteredProductList',
            {
                categoryId: categoryId,
                searchQuery: searchQuery,
                pageNumber: pageNumber
            },
            {
                headers: {
                    'Authorization': `Bearer ` + token,
                }
            }
        )
        console.log(filteredProducts.data);
        return filteredProducts.data
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getProductPrice = async (productId: number, currentSize: PriceAttr, addedIngredients: IngredientListItem[]) => {
    try {
        const result = await axios.post(
            urlRoute +
            '/productCalculate',
            {
                productId: productId,
                addedIngredients: addedIngredients,
                currentSize: currentSize
            },
            {
                headers: {
                    'Authorization': `Bearer ` + token,
                }
            }
        )
        console.log(result.data)
        return result.data;
    } catch (error) {
        console.error(error);
    }
}