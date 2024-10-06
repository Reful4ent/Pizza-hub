import {ISearchProduct} from "@/features/SearchProduct/types";
import {FC} from "react";


export const SearchInput: FC<ISearchProduct> = ({onSubmit}) => {
    return (
        <>
            <div className="col-start-2 mx-[30px] my-[10px]">
                <form className="p-[5px] flex border border-[#00000026] rounded-[20px]" autoComplete="off" onSubmit={onSubmit}>
                    <input className='mx-[5px] w-[80%] outline-0 outline-none' placeholder='Search...' type='search' name='search' />
                    <button className="p-[20px] bg-red-400" type="submit"></button>
                </form>
            </div>
        </>
    )
}