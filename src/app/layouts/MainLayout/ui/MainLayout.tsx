import {FC, Suspense} from "react";
import {Header} from "@/widgets/Header/ui/Header";
import {Footer} from "@/widgets/Footer/ui/Footer";
import { Outlet } from 'react-router-dom'

export const MainLayout: FC = () => {

    return (
        <>
            <Header/>
            <Suspense fallback={<p>troubles</p>}>
                <Outlet/>
            </Suspense>
            <Footer/>
        </>
    )
}