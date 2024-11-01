import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {ConfigContext} from "@/app/context/ConfigProvider/context";
import {IContext} from "@/app/context/ConfigProvider/types";
import {getConfig} from "@/shared/api";


export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {

    const [config, setConfig] = useState<IContext | null>(null)

    const getConfigFrom = useCallback(async () => {
        const result= getConfig().then((response) => {
            console.log(response)
            setConfig(
                {
                    headerContext: {
                        name: response.name,
                        iconUrl: response.iconUrl ? response.iconUrl : null,
                    },
                    standardProductCardContext: {
                        productStandardButtonType: response?.productButtonType?.data?.attributes?.type ?? "default",
                        colorStandardProductButton: response?.colorStandardProductButton ?? "#1677ff",
                        colorHoverStandardProductButton: response?.colorHoverStandardProductButton ?? "#1677ff",
                        colorBoxShadowStandardProductButton: response?.colorBoxShadowStandardProductButton ?? "#00000026"
                    }
                }
            )
        });
    },[])

    useEffect(() => {
        getConfigFrom()
    }, [getConfigFrom]);


    return (
        <>
            <ConfigContext.Provider value={{context: config}}>
                {children}
            </ConfigContext.Provider>
        </>
    )
}