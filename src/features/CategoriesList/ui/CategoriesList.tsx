import {FC} from "react";
import {CategoriesListProps} from "@/features/CategoriesList/types";


export const CategoriesList: FC<CategoriesListProps> = ({categories, onClick}) => {
    return (
        <>
            <div className="col-start-5 flex mt-[25px] items-start ">
                <div className="border border-[#00000026] m-[36px] rounded-[10px]">
                    <p className="mr-[30px] p-[10px] font-openSans font-semibold text-[24px]">Категории: </p>
                    <ul>
                        <li
                            className="mt-[5px] px-[10px] py-[5px] font-openSans text-[20px] bg-gradient-to-r from-[#00000026] to-[#fff] li-item"
                            key={0}
                            onClick={() => onClick(0)}
                        >Все</li>
                        {categories?.map((category, index) => (
                            <li
                                className="mt-[5px] mb-[5px] px-[10px] py-[5px] font-openSans text-[18px] bg-gradient-to-r from-[#00000026] to-[#fff] focus:bg-blue-800 li-item"
                                key={index}
                                onClick={() => onClick(category.id)}
                            >{category.name}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    )
}