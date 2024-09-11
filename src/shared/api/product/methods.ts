import axios from "axios";
import {urlRoute} from "@/shared/api/route";
import {token} from "@/shared/api/token";


export const getProducts = async () => {
    try {
        const response = await axios.get(
            urlRoute +
            '/products?populate=*',
            {
                headers: {
                    'Authorization': `Bearer ` + token,
                }
            }
        )

        return response.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}

export const getCategories = async () => {
    try {
        const response = await axios.get(
            urlRoute +
            '/categories',
            {
                headers: {
                    'Authorization': `Bearer ` + token,
                }
            }
        )
        return response.data.data;
    } catch (error) {
        console.error(error);
        return null;
    }
}


export const getIngridients = async () => {
    try {
        const response = await axios.get(
            urlRoute +
            '/ingredients?populate=*',
            {
                headers: {
                    'Authorization': `Bearer ` + token,
                }
            }
        )
        return response.data.data;
    } catch (error){
        console.error(error);
        return null;
    }
}