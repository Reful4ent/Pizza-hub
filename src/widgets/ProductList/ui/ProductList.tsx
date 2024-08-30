import {FC} from "react";
import {IProductList} from "@/widgets/ProductList/types";
import {ProductCard} from "@/entities/ProductCard/ui/ProductCard";


export const ProductList: FC<IProductList> = ({list}) =>{


    return (
        <>
            <div className="col-start-2 col-span-7 mt-[25px] flex items-center justify-center">
                <ul className="relative grid xl:grid-cols-3 lg:grid-cols-2 ">
                    {
                        list?.map((element,index) => (
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