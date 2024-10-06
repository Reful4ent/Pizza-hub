import {categoryConverter, filteredCategoryConverter} from "@/widgets/CategoriesList/CategoryConverter";
import {ProductConverterFunc} from "@/entities/Product/ProductCard/types";
import {filteredIngredientsConverter, ingredientsConverter} from "@/entities/Ingredient/IngredientsConverter";

export const productConverter: ProductConverterFunc = (productToConvert) => {
    return {
        id: productToConvert.id,
        name: productToConvert.attributes.name,
        description: productToConvert.attributes.description,
        price: productToConvert.attributes.price,
        images: productToConvert.attributes.images,
        ingredients: ingredientsConverter(productToConvert.attributes.ingredients.data),
        category: categoryConverter(productToConvert.attributes.category.data),
        addIngredient: productToConvert.attributes.addIngredient,
    };
}

export const filteredProductConverter: ProductConverterFunc = (productToConvert) => {
    return {
        id: productToConvert.id,
        name: productToConvert.name,
        description: productToConvert.description,
        price: productToConvert.price,
        images: imagesConverter(productToConvert.images),
        ingredients: filteredIngredientsConverter(productToConvert.ingredients),
        category: filteredCategoryConverter(productToConvert.category),
        addIngredient: productToConvert.addIngredient,
    }
}

const imagesConverter = (imagesUrl: string) => {
    return imagesUrl.split(';');
}
