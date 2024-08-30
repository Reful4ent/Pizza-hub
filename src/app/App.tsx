import {FC} from 'react'
import {ConfigProvider} from "./context/ConfigProvider.tsx";
import {router} from "./router/router/router.tsx";
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
