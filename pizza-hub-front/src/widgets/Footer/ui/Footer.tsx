import {FC, useMemo} from "react";
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
                           grid-cols-[250px_1fr]
                           grid-rows-[auto_auto]
                           gap-y-7"
            >
                <div className="flex flex-col gap-[18px] col-start-1 row-start-1">
                    <Logo></Logo>
                    <p className="text-[15px] text-white font-Inter opacity-70">{config?.context?.footerContext.contactEmail}</p>
                    <SocialLinks socialLinks={config?.context?.footerContext.socialLinks}/>
                </div>
                <div className="flex flex-row gap-[6.33%] justify-end items-start col-start-2 row-start-1">
                    <div className="xl:w-[130px] 2xl:w-[156px] flex flex-col justify-start items-start">
                        <p className="xl:text-[15px] 2xl:text-[18px] text-[#FFBB00] font-Inter xl:h-[39px] 2xl:h-[46.8px]">Column1</p>
                        <div>
                            <p className="xl:text-[13px] 2xl:text-[15.6px] text-white font-semibold font-Montserrat">Text/Link</p>
                            <p className="xl:text-[13px] 2xl:text-[15.6px] text-white font-semibold font-Montserrat">Text/Link</p>
                            <p className="xl:text-[13px] 2xl:text-[15.6px] text-white font-semibold font-Montserrat">Text/Link</p>
                        </div>
                    </div>
                    <div className="xl:w-[130px] 2xl:w-[156px] flex flex-col justify-start items-start">
                        <p className="xl:text-[15px] 2xl:text-[18px] text-[#FFBB00] font-Inter xl:h-[39px] 2xl:h-[46.8px]">Column2</p>
                        <div>
                            <p className="xl:text-[13px] 2xl:text-[15.6px] text-white font-semibold font-Montserrat">Text/Link</p>
                            <p className="xl:text-[13px] 2xl:text-[15.6px] text-white font-semibold font-Montserrat">Text/Link</p>
                            <p className="xl:text-[13px] 2xl:text-[15.6px] text-white font-semibold font-Montserrat">Text/Link</p>
                        </div>
                    </div>
                    <div className="xl:w-[130px] 2xl:w-[156px] flex flex-col justify-start items-start">
                        <p className="xl:text-[15px] 2xl:text-[18px] text-[#FFBB00] font-Inter xl:h-[39px] 2xl:h-[46.8px]">Column3</p>
                        <div>
                            <p className="xl:text-[13px] 2xl:text-[15.6px] text-white font-semibold font-Montserrat">Text/Link</p>
                            <p className="xl:text-[13px] 2xl:text-[15.6px] text-white font-semibold font-Montserrat">Text/Link</p>
                            <p className="xl:text-[13px] 2xl:text-[15.6px] text-white font-semibold font-Montserrat">Text/Link</p>
                        </div>
                    </div>
                    <div className="xl:w-[130px] 2xl:w-[156px] flex flex-col justify-start items-start">
                        <p className="xl:text-[15px] 2xl:text-[18px] text-[#FFBB00] font-Inter xl:h-[39px] 2xl:h-[46.8px]">Column4</p>
                        <div>
                            <p className="xl:text-[13px] 2xl:text-[15.6px] text-white font-semibold font-Montserrat">Text/Link</p>
                            <p className="xl:text-[13px] 2xl:text-[15.6px] text-white font-semibold font-Montserrat">Text/Link</p>
                            <p className="xl:text-[13px] 2xl:text-[15.6px] text-white font-semibold font-Montserrat">Text/Link</p>
                        </div>
                    </div>
                </div>
                <div className="row-start-2 col-start-1 col-span-2 flex flex-row gap-[5.8%] items-center">
                    <div className="flex flex-row gap-[24px]">
                        <p className="xl:text-[14px] 2xl:text-[16.8px] text-white font-Inter">&#169;2024</p>
                        <p className="xl:text-[14px] 2xl:text-[16.8px] text-white font-Inter">Информация</p>
                        <p className="xl:text-[14px] 2xl:text-[16.8px] text-white font-Inter">Информация</p>
                    </div>
                    <p className="xl:text-[11.25px] 2xl:text-[13.5px] text-[#5C6370] font-Inter">Доп информацияДоп информацияДоп информацияДоп информация</p>
                </div>
            </div>
        </footer>
    )
}