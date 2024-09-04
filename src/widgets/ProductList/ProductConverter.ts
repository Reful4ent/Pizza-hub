

export const productConverter = (productToConvert) => {
    return {
        name: productToConvert.attributes.name,
        description: productToConvert.attributes.description,
        price: productToConvert.attributes.price,
        images: productToConvert.attributes.images,
        ingredients: productToConvert.attributes.ingredients.data,
        category: productToConvert.attributes.category.data,
    };
}