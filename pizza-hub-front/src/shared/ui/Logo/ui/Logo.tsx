import {FC} from "react";
import {useConfig} from "@/app/context/ConfigProvider/context";


export const Logo: FC = () => {
    const config = useConfig()

    return (
        <>
            <div className="xl:w-[240px]
                            xl:h-[40px]
                            2xl:w-[288px]
                            2xl:h-[48px]
                            flex
                            flex-row
                            items-center">
                {config?.context?.headerContext.iconUrl
                    &&
                    <img className="h-[100%]
                                    mr-[10px]
                                    flex
                                    items-center" src={config?.context?.headerContext.iconUrl} alt="icon"/>
                }
                <p className="font-Montserrat font-semibold text-white text-[200%]">{config?.context?.headerContext.name}</p>
            </div>
        </>
    )
}