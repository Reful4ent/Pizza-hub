
import { Navigate, RouteObject } from 'react-router-dom'
import {MainLayout} from "@/app/layouts/MainLayout/ui/MainLayout";
import {ErrorPage, MenuPage, MenuProductPage} from "@/app/router/lazyPages/lazyPages";

export const router: RouteObject[] = [
    {
        path: '/',
        element: <MainLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "menu",
                element: <MenuPage/>
            },
            {
                path: "product/:id",
                element: <MenuProductPage/>
            },
            {
                path: "*",
                element: <Navigate to="menu"/>
            }
        ]
    }
]