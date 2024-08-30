import {IProduct, ProductCardProps} from "@/entities/ProductCard/types";
import {FC, useEffect, useState} from "react";
import {urlRoute} from "@/shared/api/route";
import {Spinner} from "@/shared/ui/Spinner/ui/Spinner";


export const ProductCard : FC<IProduct> = ({productCard}) => {
    const [product, setProduct] = useState<ProductCardProps | null>(null);

    const handleAddClick = () => {

    }

    useEffect(() => {
        if (productCard)
            setProduct(productCard);
    }, [productCard]);


    return (
        <>
            {product ?
                <>
                    <div
                        className="m-[10px] p-[25px] w-[322px] h-[582px] border border-[#00000026] rounded-lg shadow-custom flex flex-col">
                        {product.imageUrl ?
                            <img className="w-[100%] rounded-2xl mb-[10px] self-center" src={urlRoute + product.imageUrl}
                                 alt={product.name}/>
                            :
                            <img className="" src='' alt={product.name}/>}
                        <p className="font-openSans mb-[5px] font-medium text-[22px]">{product.name}</p>
                        <p className="font-openSans line-clamp-4 text-ellipsis overflow-hidden text-[#616773] mb-[5px]">{product.description}</p>
                        <p className="font-openSans mb-[5px] text-[18px] font-semibold">Price: <br/>{product.price} ₽</p>
                        <button className="font-openSans bg-amber-100 hover:bg-amber-500 rounded-lg h-[10%]"
                                onClick={handleAddClick}>Add
                        </button>
                    </div>
                </>
                :
                <Spinner/>}
        </>
    )
}