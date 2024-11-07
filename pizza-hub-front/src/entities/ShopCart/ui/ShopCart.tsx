import {FC, useCallback, useMemo, useState} from "react";
import {Button} from "@/shared/ui/Button";
import {useShopCart} from "@/app/context/ShopCartProvider/context";
import {SmallProductCard} from "@/entities/Product/ProductCard/ui/SmallProductCard/SmallProductCard";
import {useNavigate} from "react-router-dom";

//ToDo: разнести на компоненты - сделать лист продуктов
//ToDo: ВЬЕБАТЬ ФОНТ ДЛЯ КНОПКИ

export const ShopCart: FC = () => {
    const shopCart = useShopCart();
    const navigate = useNavigate();

    const [isActive, setIsActive] = useState(false);

    const handleProductDeleteClick = useCallback((indexOfCart: number) => {
        shopCart?.removeProductFromCart(indexOfCart);
    },[shopCart])

    const handleProductPlusClick = useCallback((indexOfCart: number) => {
        shopCart?.plusProductFromCart(indexOfCart);
    },[shopCart])

    const handleProductMinusClick = useCallback((indexOfCart: number) => {
        shopCart?.minusProductFromCart(indexOfCart);
    },[shopCart])

    const countOfProducts = useMemo(() => {
        const count = shopCart?.shopCart.reduce((accumulator, element) => {
            return accumulator + element.count;
        },0);
        return count;
    },[shopCart])

    return (
        <>
            <Button
                className="xl:h-[40px]
                           xl:bg-amber-500
                           xl:w-[103px]
                           xl:px-[20px]
                           rounded-[9999px]
                           xl:py-[8px]"
                onClick={() => setIsActive(!isActive)}
                children="Корзина"/>
            {
                isActive
                &&
                <div className="absolute z-1 bg-red-400 right-0 top-0 flex flex-col w-[20%] h-[100%] border-l border-black">
                    <p className="h-[5%] flex items-center mx-[5%] text-xl">{countOfProducts} товаров на сумму: {shopCart?.shopCartPrice} ₽</p>
                    <ul className="w-[100%] h-[85%] bg-green-300">
                        {
                            shopCart?.shopCart.map((element, index) => (
                                <li key={index} className="list-none w-[100%]">
                                    <SmallProductCard productFromCart={element}
                                                      indexOfCart={index}
                                                      onMinusClick={handleProductMinusClick}
                                                      onPlusClick={handleProductPlusClick}
                                                      onDeleteClick={handleProductDeleteClick}/>
                                </li>
                            ))
                        }
                    </ul>
                    <div className="h-[10%]">
                        <p>Сумма заказа {shopCart?.shopCartPrice} ₽</p>
                        <Button className={"w-[95%] bg-blue-500 rounded-[30px]"}
                                children={"К оформлению заказа"}
                                onClick={() => navigate('/checkout')}
                        />
                    </div>
                </div>
            }
        </>
    )
}