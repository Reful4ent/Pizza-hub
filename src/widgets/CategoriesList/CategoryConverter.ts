import {CategoryConverterFunc} from "@/widgets/CategoriesList/types";


export const categoryConverter: CategoryConverterFunc = (categoryToConvert) => {
    return {
        id: categoryToConvert.id,
        name: categoryToConvert?.attributes?.name,
    }
}

export const filteredCategoryConverter: CategoryConverterFunc = (categoryToConvert) => {
    return {
        id: categoryToConvert.id,
        name: categoryToConvert?.name,
    }
}