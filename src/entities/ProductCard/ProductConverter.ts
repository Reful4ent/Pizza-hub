import {categoryConverter} from "@/features/CategoriesList/CategoryConverter";
import {ProductConverterFunc} from "@/entities/ProductCard/types";
import {ingridientsConverter} from "@/entities/Ingridient/IngridientsConverter";

export const productConverter: ProductConverterFunc = (productToConvert) => {
    return {
        name: productToConvert.attributes.name,
        description: productToConvert.attributes.description,
        price: productToConvert.attributes.price,
        images: productToConvert.attributes.images,
        ingredients: ingridientsConverter(productToConvert.attributes.ingredients.data),
        category: categoryConverter(productToConvert.attributes.category.data),
    };
}