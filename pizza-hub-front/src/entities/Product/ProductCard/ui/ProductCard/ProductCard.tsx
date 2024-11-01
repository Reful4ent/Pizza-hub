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
                        className={`m-[10px] p-[25px] w-[322px] h-[552px] border border-[#00000026] rounded-lg flex flex-col`}
                        style={{boxShadow: `0px 0px 49px 9px ${config?.context?.standardProductCardContext.colorBoxShadowStandardProductButton}`}}
                    >
                        <div className="w-[100%] h-[55%] flex items-center justify-center">
                            <Link to={"/product/"+product.id} state={{product: product}}>
                                {product.images ?
                                    <img className="w-[100%] rounded-2xl mb-[10px] self-center"
                                         src={product.images[0]}
                                         alt={product.name}
                                    />
                                    :
                                    <img className="" src='' alt={product.name}/>}
                            </Link>
                        </div>
                        <div className="w-[100%] h-[45%] flex flex-col">
                            <p className="font-openSans line-clamp-1 mb-[5px] font-medium text-[22px]">{product.name}</p>
                            <p className="font-openSans line-clamp-4 text-ellipsis overflow-hidden text-[#616773] mb-[5px] w-[100%] h-[50%]">{product.description}</p>
                            <p className="font-openSans mb-[5px] text-[18px] font-semibold">Цена: {Object.values(product.price)[0]['price']} ₽</p>
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
                                    className="font-openSans rounded-lg h-[25%] font-semibold"
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