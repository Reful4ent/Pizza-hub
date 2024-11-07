import {FC} from "react";
import {Logo} from "@/shared/ui/Logo/ui/Logo";
import {useConfig} from "@/app/context/ConfigProvider/context";
import {SocialLinks} from "@/features/SocialLinks";


export const Footer: FC = () => {
    const config = useConfig();
    return (
        <footer className="w-[90%]
                           h-[316.59px]
                           mx-auto
                           px-[24px]
                           py-[68px]
                           rounded-t-[30px]
                           bg-[#181818]"
        >
            <div className="grid
                           grid-cols-[250px_1fr]"
            >
                <div className="flex flex-col gap-[18px]">
                    <Logo></Logo>
                    <p className="text-[15px] text-white font-Inter opacity-70">{config?.context?.footerContext.contactEmail}</p>
                    <SocialLinks/>
                </div>
                <div className="bg-green-300">
                    <p>dsad</p>
                </div>
            </div>
        </footer>
    )
}