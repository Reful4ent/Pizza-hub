

export const productConverter = (productToConvert) => {
    return {
        name: productToConvert.attributes.name,
        description: productToConvert.attributes.description,
        price: productToConvert.attributes.price,
        imageUrl: productToConvert.attributes.images.data[0].attributes.url,
        ingredients: null
    };
}