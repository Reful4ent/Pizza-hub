import {FC, useMemo} from "react";
import {IProductList} from "@/widgets/ProductList/types";
import {ProductCard} from "@/entities/Product/ProductCard";


export const ProductList: FC<IProductList> = ({searchFilter ,categoryId, productList}) =>{
    const products = useMemo(() => {
        let tempProductList;

        if (categoryId === 0) {
            tempProductList = productList;
        } else {
            tempProductList = productList?.filter(
                (product) => product?.category?.id === categoryId,
            );
        }

        if(searchFilter.length > 0){
            tempProductList = productList?.filter(
                (product) => product?.name.toLowerCase().includes(searchFilter)
                || product?.description?.includes(searchFilter)
                || IsIngredientContainsFilter(searchFilter, product?.ingredients)
            )
        }

        return tempProductList?.map ((element,index) => (
            <li className="m-[20px]" key={index}>
                <ProductCard productCard={element}/>
            </li>
        ))
    }, [categoryId,productList,searchFilter])

    return (
        <>
            <div className="col-start-2 col-span-3 mt-[25px] flex items-center justify-center ">
            <ul className="relative grid 2xl:grid-cols-3 xl:grid-cols-2 ">
                    {products}
                </ul>
            </div>
        </>
    )
}


const IsIngredientContainsFilter = (searchFilter: string, ingredients: any) => {
    if(ingredients === null) {
        return false;
    }

    for (let i = 0; i < ingredients.length; i++) {
        if (ingredients[i]?.name?.toLowerCase().includes(searchFilter) ||
        ingredients[i]?.description?.toLowerCase().includes(searchFilter)) {
            return true;
        }
    }
    return false;
}