import {FC, useCallback, useEffect, useState} from "react";
import {ShopCart} from "@/entities/ShopCart/ui/ShopCart";
import {useConfig} from "@/app/context/ConfigProvider/context";
import {CategoryItem} from "@/widgets/CategoriesList/types";
import {getCategories} from "@/shared/api";
import {categoryConverter} from "@/widgets/CategoriesList/CategoryConverter";
import {CategoriesList} from "@/widgets/CategoriesList";

export const NavPanel:FC = () => {
    const config = useConfig()

    const [categories, setCategories] = useState<CategoryItem[]>([]);

    //При начальной загрузки страницы выгружаются категории
    const fetchCategories = useCallback(async () => {
        const responseCategories = await getCategories();
        setCategories(responseCategories.map((element: any) => categoryConverter(element)));
    }, [])

    useEffect(() => {
        fetchCategories();
    },[fetchCategories])

    return (
        <nav className="h-[100%]
                        grid
                        grid-cols-[1fr_3.6955fr_auto]
                        px-[24px]
                        justify-between
                        items-center">
            <div className="flex flex-row xl:gap-[20px] 2xl:gap-[24px]">
                <p className="text-white text-[14px] font-Montserrat font-semibold hover:text-[#FFD200]">Other</p>
                <p className="text-white text-[14px] font-Montserrat font-semibold hover:text-[#FFD200]">Other</p>
            </div>
            <CategoriesList categories={categories} onClick={() => console.log()}/>
            <div className="flex flex-row items-center">
                <p className="font-medium text-[18px] text-white mr-[20px] font-Montserrat">{config?.context?.headerContext.contactPhoneNumber}</p>
                <ShopCart/>
            </div>
        </nav>
    )
}