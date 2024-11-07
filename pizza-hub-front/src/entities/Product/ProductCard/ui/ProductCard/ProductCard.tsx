import {IProduct, ProductCardProps} from "@/entities/Product/ProductCard/types";
import { memo, useCallback, useEffect, useState} from "react";

import {Spinner} from "@/shared/ui/Spinner/ui/Spinner";
import {Link, useNavigate} from "react-router-dom";
import {useShopCart} from "@/app/context/ShopCartProvider/context";
import {Button, ConfigProvider} from "antd";
import {useConfig} from "@/app/context/ConfigProvider/context";

export const ProductCard = memo<IProduct>(({productCard}) => {
    const navigate = useNavigate();
    const shopCart = useShopCart();
    const config = useConfig()
    const [product, setProduct] = useState<ProductCardProps | null>(null);

    const handleAddClick = useCallback( () => {
        if(product){
            shopCart?.addProductToCart(product, product.price[0],[]);
        }
    },[product,shopCart])

    useEffect(() => {
        if (productCard){
            setProduct(productCard);
        }
    }, [productCard]);


    return (
        <>
            {product ?
                <>
                    <div
                        className={`m-[10px]
                                    2xl:p-[28.8px]
                                    2xl:w-[312px]
                                    2xl:h-[432px]
                                    xl:p-[24px]
                                    xl:w-[260px]
                                    xl:h-[360px]
                                    rounded-[10px]
                                    flex
                                    flex-col`}
                        style={{boxShadow: `0px 0px 49px 9px ${config?.context?.standardProductCardContext.colorBoxShadowStandardProductButton}`}}
                    >
                        <div className="w-[100%]
                                        h-[84.62%]
                                        mb-[7.55%]
                                        flex
                                        flex-col
                                        bg-red
                                        justify-start">
                            <Link to={"/product/" + product.id}
                                  state={{product: product}}
                                  className="w-[100%]
                                             h-[180px]
                                             flex
                                             rounded-[12px]
                                             mb-[7.55%]"
                            >
                                {product.images ?
                                    <img className="w-[100%]
                                                    rounded-[12px]
                                                    self-center"
                                         src={product.images[0]}
                                         alt={product.name}
                                    />
                                    :
                                    <img className="" src='' alt={product.name}/>}
                            </Link>
                            <p className="line-clamp-1
                                          xl:text-[17px]
                                          2xl:text-[20.4px]
                                          mb-[4.72%]
                                          font-medium
                                          font-Montserrat"
                            >
                                {product.name}
                            </p>
                            <p className="line-clamp-2
                                          text-[#5C6370]
                                          xl:text-[11.25px]
                                          2xl:text-[13.5px]
                                          font-Inter"
                            >
                                {product.description}
                            </p>
                        </div>
                        <div className="
                                        w-[100%]
                                        h-[10.26%]
                                        flex
                                        justify-between
                                        self-center
                                        flex-row">
                            <p className="font-openSans
                                          flex
                                          items-center
                                          text-[100%]
                                          font-semibold
                                          font-Montserrat"
                            >
                                {Object.values(product.price)[0]['price']}₽
                            </p>
                            <ConfigProvider
                                theme={{
                                    components:{
                                        Button: {
                                            defaultBg: config?.context?.standardProductCardContext.colorStandardProductButton,
                                            defaultColor: '#fff',
                                            defaultActiveColor: config?.context?.standardProductCardContext.colorHoverStandardProductButton,
                                            colorPrimary: config?.context?.standardProductCardContext.colorStandardProductButton,
                                            colorPrimaryHover: config?.context?.standardProductCardContext.colorHoverStandardProductButton,
                                            colorPrimaryActive: config?.context?.standardProductCardContext.colorHoverStandardProductButton,
                                            textTextColor:config?.context?.standardProductCardContext.colorStandardProductButton,
                                            textTextHoverColor: config?.context?.standardProductCardContext.colorHoverStandardProductButton,
                                        }
                                    },
                                }}
                            >
                                <Button
                                    className="rounded-[10px]
                                               px-[15px]
                                               py-[4px]
                                               h-[100%]
                                               w-[48.59%]
                                               font-medium
                                               font-Montserrat
                                               text-[95.45%]"
                                    onClick={handleAddClick}
                                    type={config?.context?.standardProductCardContext?.productStandardButtonType}
                                >
                                    Добавить
                                </Button>
                            </ConfigProvider>
                        </div>
                    </div>
                </>
                :
                <Spinner/>}
        </>
    )
})
//handleAddClick