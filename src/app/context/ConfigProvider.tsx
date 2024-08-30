import {FC, PropsWithChildren, useCallback, useEffect, useState} from "react";
import {ConfigContext} from "@/app/context/context";
import {IContext} from "@/app/context/types";
import {getConfig} from "@/shared/api/config/methods";


export const ConfigProvider: FC<PropsWithChildren> = ({ children }) => {

    const [config, setConfig] = useState<IContext | null>(null)

    const getConfigFrom = useCallback(async () => {
        const result = getConfig().then((response) => {
            setConfig(
                {headerContext:{
                        name: response.name,
                        iconUrl: response.icon.data ? response.icon.data.attributes.url : null,
                    }})
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