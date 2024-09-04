import {CategoryConverterFunc} from "@/features/CategoriesList/types";


export const categoryConverter: CategoryConverterFunc = (categoryToConvert) => {
    return {
        id: categoryToConvert.id,
        name: categoryToConvert?.attributes?.name,
    }
}