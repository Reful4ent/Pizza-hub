import {FC, useMemo} from "react";
import {CategoriesListProps} from "@/widgets/CategoriesList/types";


export const CategoriesList: FC<CategoriesListProps> = ({categories, onClick}) => {
    const categoriesLi = useMemo(() => {
        return categories?.map((category, index) => (
            <li
                className="text-white text-[14px] font-Montserrat font-semibold hover:text-[#FFD200]"
                key={index}
                onClick={() => onClick(category.id)}
            >
                {category.name}
            </li>
        ))
    },[categories,onClick])


    return (
        <ul className="flex
                       flex-row
                       justify-center
                       xl:gap-[17px]
                       2xl:gap-[40px]">
            {categoriesLi}
        </ul>
    )
}