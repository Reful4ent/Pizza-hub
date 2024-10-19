export interface ICategory {
  id: number;
  name: string;
}

export interface IIngredient {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface IProduct {
  id: number;
  name: string;
  description: string;
  category: ICategory;
  price: priceType[];
  ingredients: IIngredient[];
  images: string[];
  addIngredient: boolean;
}

export type priceType = {
  id: number;
  name: string;
  price: number;
}