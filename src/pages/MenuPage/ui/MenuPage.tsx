import {FC, useCallback, useEffect, useState} from "react";
import {getPizzas} from "@/shared/api/pizza/methods";
import {ProductCard} from "@/entities/ProductCard/ui/ProductCard";


export const MenuPage: FC = () => {

    const [list, setList] = useState({
        name: "null",
        description: "null",
        price: 10,
        imageUrl: null,
        ingredients: null,
    });

    const fetchData = useCallback(async () => {
        const result = await getPizzas().then((result) => {
            setList({
                name: result[0].attributes.name,
                description: result[0].attributes.description,
                price: result[0].attributes.price,
                imageUrl: result[0].attributes.images.data[0].attributes.url,
                ingredients: null,
            });
        })
    },[])

    useEffect(() => {
        fetchData()
    }, [fetchData]);

    ///configItems.icon.data.attributes.url
    return (
        <>
           <div className="flex items-center justify-center">
               <ProductCard pizzaCard={list}></ProductCard>
           </div>
        </>
    )
}