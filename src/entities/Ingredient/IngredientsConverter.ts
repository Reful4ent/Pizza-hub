import {IngredientsConverterFunc} from "@/entities/Ingredient/IngreidientCard/types";


export const ingredientsConverter: IngredientsConverterFunc = (ingredientsToConvert) => {
    return ingredientsToConvert?.map((ingredient: any) => (
        {
            id: ingredient.id,
            name: ingredient.attributes.name,
            description: ingredient.attributes.description,
            price: ingredient.attributes.price,
            image: ingredient.attributes.image,
        }
    ));
}