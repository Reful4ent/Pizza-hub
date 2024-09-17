import {FC} from "react";


import {urlRoute} from "@/shared/api/route";
import {useConfig} from "@/app/context/ConfigProvider/context";


export const Logo: FC = () => {
    const config = useConfig()

    return (
        <>
            <div className="flex flex-row items-center">
                {config?.context?.headerContext.iconUrl
                    &&
                    <img className="w-[12%] h-[12%] flex items-center mx-[10px]" src={config?.context?.headerContext.iconUrl} alt="icon"/>
                }
                <p className="font-bold font-openSans xl:text-[250%] lg:text-[200%] md:text-[100%] ">{config?.context?.headerContext.name}</p>

            </div>
        </>
    )
}