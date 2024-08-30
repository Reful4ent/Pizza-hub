import axios from "axios";
import {urlRoute} from "@/shared/api/route";
import {token} from "@/shared/api/token";


export const getPizzas = async () => {
    try {
        const response = await axios.get(
            urlRoute +
            '/api'+
            '/pizzas?populate=*',
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