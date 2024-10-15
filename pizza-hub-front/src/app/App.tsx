import {FC} from 'react'
import {ConfigProvider} from "@/app/context/ConfigProvider/ConfigProvider";
import {router} from "@/app/router/router/router";
import { useRoutes } from 'react-router-dom'
import {ShopCartProvider} from "@/app/context/ShopCartProvider/ShopCartProvider";

export const App : FC = () => {
    return (
        <>
            <ConfigProvider>
                <ShopCartProvider>
                    {useRoutes(router)}
                </ShopCartProvider>
            </ConfigProvider>
        </>
    )
}
