import {FC} from "react";
import {Logo} from "@/shared/ui/Logo/ui/Logo";
import {ShopCart} from "@/entities/ShopCart/ui/ShopCart";

export const Header: FC = () => {


    return (
        <header className="grid grid-cols-3 items-center justify-items-center justify-end px-[5%] py-[5px] border-b border-black">
            <Logo/>
            <ShopCart/>
        </header>
    )
}