import {FC, useMemo} from "react";
import {IProductList} from "@/widgets/ProductList/types";
import {ProductCard} from "@/entities/Product/ProductCard";


export const ProductList: FC<IProductList> = ({ productList}) =>{
    const products = useMemo(() => {
        return productList?.map ((element,index) => (
            <li className="m-[20px]" key={index}>
                <ProductCard productCard={element}/>
            </li>
        ))
    }, [productList])

    return (
        <>
            <div className="col-start-1 col-span-4 mt-[25px] flex items-center justify-center ">
            <ul className="relative grid 2xl:grid-cols-4 xl:grid-cols-4">
                    {products}
                </ul>
            </div>
        </>
    )
}


