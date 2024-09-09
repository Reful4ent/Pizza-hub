

export type CategoryConverterFunc = (categoryToConvert: any) => CategoryItem;

export type CategoryItem = {
    id: number;
    name: string;
}



export type CategoriesListProps = {
    categories: CategoryItem[] | null;
    onClick: (id: number) => void;
}