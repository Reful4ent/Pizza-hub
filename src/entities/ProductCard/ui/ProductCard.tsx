import {IProduct, ProductCardProps} from "@/entities/ProductCard/types";
import {FC, memo, useEffect, useState} from "react";

import {Spinner} from "@/shared/ui/Spinner/ui/Spinner";



export const ProductCard = memo<IProduct>(({productCard}) => {
    const [product, setProduct] = useState<ProductCardProps | null>(null);

    const handleAddClick = () => {
        console.log(product)
    }

    useEffect(() => {
        if (productCard){
            setProduct(productCard);
        }
    }, [productCard]);

    // console.log(product.price)

    return (
        <>
            {product ?
                <>
                    <div
                        className="m-[10px] p-[25px] w-[322px] h-[552px] border border-[#00000026] rounded-lg shadow-custom flex flex-col">
                        <div className="w-[100%] h-[55%] flex items-center justify-center">
                            {product.images ?
                                <img className="w-[100%] rounded-2xl mb-[10px] self-center" src={product.images[0]}
                                     alt={product.name}/>
                                :
                                <img className="" src='' alt={product.name}/>}
                        </div>
                        <div className="w-[100%] h-[45%] flex flex-col">
                            <p className="font-openSans line-clamp-1 mb-[5px] font-medium text-[22px]">{product.name}</p>
                            <p className="font-openSans line-clamp-4 text-ellipsis overflow-hidden text-[#616773] mb-[5px] w-[100%] h-[50%]">{product.description}</p>
                            <p className="font-openSans mb-[5px] text-[18px] font-semibold">Цена: {Object.values(product.price)[0]['price']} ₽</p>
                            <button className="font-openSans bg-amber-100 hover:bg-amber-500 rounded-lg h-[25%] font-semibold"
                                    onClick={handleAddClick}>Добавить
                            </button>
                        </div>
                    </div>
                </>
                :
                <Spinner/>}
        </>
    )
})