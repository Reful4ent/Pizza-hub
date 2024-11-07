import {FC} from "react";
import {Logo} from "@/shared/ui/Logo/ui/Logo";
import {NavPanel} from "@/features/NavPanel";

export const Header: FC = () => {


    return (
        <header className="w-[90%]
                           h-[82px]
                           mx-auto
                           px-[24px]
                           py-[12px]
                           bg-[#AD4800]
                           sticky
                           top-0
                           z-10
                           grid
                           grid-cols-[auto_1fr]
                           items-center
                           rounded-b-[30px]"
        >
            <Logo/>
            <NavPanel/>
        </header>
    )
}