
import {token} from "@/shared/api/token";
import {urlRoute} from "@/shared/api/route";
import axios from "axios"


export const getConfig = async ()=> {
    try {
        const response = await axios.get(
            urlRoute +
            '/api' +
            '/config?populate=*',
            {
                headers:{
                    'Authorization': `Bearer ` + token,
                }
            }
        );

        return response.data.data.attributes;
    } catch (error) {
        console.log(error);
        return null;
    }
}