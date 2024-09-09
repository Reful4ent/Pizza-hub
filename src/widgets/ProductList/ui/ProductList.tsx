import {FC} from "react";
import {IProductList} from "@/widgets/ProductList/types";
import {ProductCard} from "@/entities/ProductCard";



export const ProductList: FC<IProductList> = ({searchFilter ,categoryId, list}) =>{


    return (
        <>
            <div className="col-start-2 col-span-3 mt-[25px] flex items-center justify-center ">
                <ul className="relative grid 2xl:grid-cols-3 xl:grid-cols-2 ">
                    {
                        list
                            ?.filter((element) => {
                                if(categoryId === 0) {
                                    return element;
                                } else if (element?.category?.id === categoryId) {
                                    return element;
                                }
                            })
                            ?.filter((element) => {
                                if(searchFilter === '') {
                                    return element
                                } else if(element?.name.toLowerCase().includes(searchFilter) ||
                                    element?.description?.includes(searchFilter) ||
                                    IsIngridientContainsFilter(searchFilter, element?.ingredients)) {
                                    return element;
                                }
                            })
                            ?.map((element,index) => (
                                <li className="m-[20px]" key={index}>
                                    <ProductCard productCard={element}/>
                                </li>
                            ))
                    }
                </ul>
            </div>
        </>
    )
}


const IsIngridientContainsFilter = (searchFilter: string, ingridients: any) => {
    if(ingridients === null) {
        return false;
    }

    for (let i = 0; i < ingridients.length; i++) {
        if (ingridients[i]?.name.toLowerCase().includes(searchFilter) ||
        ingridients[i]?.description.toLowerCase().includes(searchFilter)) {
            return true;
        }
    }
    return false;
}