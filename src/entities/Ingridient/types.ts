

export type IngridientsConverterFunc = (ingridientsToConvert: any) => IngridientProps[];

export type IngridientProps = {
    id: number
    name: string,
    price: number,
    description: string,
    imageUrl: string | null,
}