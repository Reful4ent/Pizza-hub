
import { Navigate, RouteObject } from 'react-router-dom'
import {MainLayout} from "@/app/layouts/MainLayout/ui/MainLayout";
import {ErrorPage, MenuPage, MenuProductPage, OrderCheckoutPage} from "@/app/router/lazyPages/lazyPages";

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
                path: "checkout",
                element: <OrderCheckoutPage/>
            },
            {
                path: "*",
                element: <Navigate to="menu"/>
            }
        ]
    }
]