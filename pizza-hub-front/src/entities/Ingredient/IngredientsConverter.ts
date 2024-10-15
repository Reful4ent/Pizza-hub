import {IngredientsConverterFunc} from "@/entities/Ingredient/IngreidientCard/types";


export const ingredientsConverter: IngredientsConverterFunc = (ingredientsToConvert) => {
    return ingredientsToConvert?.map((element: any) => (
        {
            ingredient: {
                id: element.id,
                name: element.attributes.name,
                description: element.attributes.description,
                price: element.attributes.price,
                image: element.attributes.image,
            },
            count: 1,
        }
    ));
}

export const filteredIngredientsConverter: IngredientsConverterFunc = (ingredientsToConvert) => {
    return ingredientsToConvert?.map((element: any) => (
        {
            ingredient: {
                id: element.id,
                name: element.name,
                description: element.description,
                price: element.price,
                image: element.image,
            },
            count: 1,
        }
    ));
}