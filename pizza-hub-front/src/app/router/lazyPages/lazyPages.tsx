import {lazy} from "react";


export const MenuPage = lazy(() => import('@/pages/MenuPage/index').then(m => ({default: m.MenuPage})))
export const MenuProductPage = lazy(() => import('@/pages/MenuProductPage/index').then(m => ({default: m.MenuProductPage})))
export const ErrorPage = lazy(() => import('@/pages/ErrorPage/index').then(m => ({default: m.ErrorPage})))
export const OrderCheckoutPage = lazy(() => import('@/pages/OrderCheckoutPage/index').then(m => ({default: m.OrderCheckoutPage})))