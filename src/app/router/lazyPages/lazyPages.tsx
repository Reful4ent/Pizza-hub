import {lazy} from "react";


export const MenuPage = lazy(() => import('@/pages/MenuPage/ui/MenuPage').then(m => ({default: m.MenuPage})))
export const ErrorPage = lazy(() => import('@/pages/ErrorPage/ui/ErrorPage').then(m => ({default: m.ErrorPage})))