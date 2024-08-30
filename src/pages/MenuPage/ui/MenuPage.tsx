import {FC, useCallback, useEffect, useState} from "react";
import {getPizzas} from "@/shared/api/pizza/methods";
import {ProductCard} from "@/entities/ProductCard/ui/ProductCard";
import {productConverter, ProductConverter} from "@/widgets/ProductList/ProductConverter";
import {ProductList} from "@/widgets/ProductList/ui/ProductList";
import {ProductCardProps} from "@/entities/ProductCard/types";


export const MenuPage: FC = () => {

    const [list, setList] = useState(null);

    const fetchData = useCallback(async () => {
        const result = await getPizzas().then((result) => {
            let covertedList = [];
            result.forEach(element => covertedList.push(productConverter(element)))
            setList(covertedList);
        })
    },[])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    ///configItems.icon.data.attributes.url
    return (
        <>
           <div className="grid grid-cols-9">
               <ProductList list={list}/>
           </div>
        </>
    )
}