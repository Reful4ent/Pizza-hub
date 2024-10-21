import {IngredientListItem, IngredientProps} from "@/entities/Ingredient/IngreidientCard/types";
import {CategoryItem} from "@/widgets/CategoriesList/types";
import {ProductListItem} from "@/app/context/ShopCartProvider/types";


export type ProductConverterFunc = (productToConvert: any) => ProductCardProps;

export interface IProduct {
    productCard: ProductCardProps | null | undefined,
}

export interface IFullProduct {
    productCard: ProductCardProps;
    ingredients: IngredientListItem[];
}

export interface ISmallProduct{
    productFromCart: ProductListItem;
    indexOfCart: number;
    onMinusClick: (indexOfCart: number) => void;
    onPlusClick: (indexOfCart: number) => void;
    onDeleteClick: (indexOfCart: number) => void;
}

export type PriceAttr = {
    id: number,
    price: number,
    name: string,
}

export type ImageAttr = {
    id: number,
    URL: string
}

export type ProductCardProps = {
    id: number;
    name: string;
    description: string;
    price: PriceAttr[],
    category: CategoryItem,
    images: string[];
    ingredients: IngredientListItem[] | null;
    addIngredient: boolean;
}


