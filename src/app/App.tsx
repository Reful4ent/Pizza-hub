import {FC} from 'react'
import {ConfigProvider} from "@/app/context/ConfigProvider";
import {router} from "@/app/router/router/router";
import { useRoutes } from 'react-router-dom'

export const App : FC = () => {
    return (
        <>
            <ConfigProvider>
                {useRoutes(router)}
            </ConfigProvider>
        </>
    )
}
