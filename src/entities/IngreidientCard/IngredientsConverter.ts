import {IngredientsConverterFunc} from "@/entities/IngreidientCard/types";


export const ingredientsConverter: IngredientsConverterFunc = (ingredientsToConvert) => {
    return ingredientsToConvert?.map((ingredient: any) => (
        {
            id: ingredient.id,
            name: ingredient.attributes.name,
            description: ingredient.attributes.description,
            price: ingredient.attributes.price,
            images: ingredient.attributes.images,
        }
    ));
}