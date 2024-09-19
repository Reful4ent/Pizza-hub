import {FC, useState} from "react";
import {Button} from "@/shared/ui/Button";
import {useShopCart} from "@/app/context/ShopCartProvider/context";


export const ShopCart: FC = () => {
    const shopCart = useShopCart();

    const [isActive, setIsActive] = useState(false);

    return (
        <>
            <Button className="bg-red-400 p-[10px] col-start-3" onClick={() => {setIsActive(!isActive); console.log(shopCart?.shopCart)}} children={shopCart?.shopCart.length}></Button>
            {isActive &&
            <div className="absolute z-10 bg-red-400">
                {
                    shopCart?.shopCart.map((element,index) => (
                        <li key={index}>{element.product.name}</li>
                    ))
                }
            </div>
            }
        </>
    )
}