import {IngridientsConverterFunc} from "@/entities/Ingridient/types";


export const ingridientsConverter: IngridientsConverterFunc = (ingridientsToConvert) => {
    return ingridientsToConvert?.map((ingridient: any) => (
        {
            id: ingridient.id,
            name: ingridient.attributes.name,
            description: ingridient.attributes.description,
            price: ingridient.attributes.price,
            images: ingridient.attributes.images,
        }
    ));
}