import {categoryConverter} from "@/widgets/CategoriesList/CategoryConverter";
import {ProductConverterFunc} from "@/entities/Product/ProductCard/types";
import {ingredientsConverter} from "@/entities/IngreidientCard/IngredientsConverter";

export const productConverter: ProductConverterFunc = (productToConvert) => {
    return {
        id: productToConvert.id,
        name: productToConvert.attributes.name,
        description: productToConvert.attributes.description,
        price: productToConvert.attributes.price,
        images: productToConvert.attributes.images,
        ingredients: ingredientsConverter(productToConvert.attributes.ingredients.data),
        category: categoryConverter(productToConvert.attributes.category.data),
    };
}