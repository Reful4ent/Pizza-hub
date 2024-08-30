import {FC, Suspense} from "react";
import {Header} from "@/widgets/Header/ui/Header";
import {Footer} from "@/widgets/Footer/ui/Footer";
import { Outlet } from 'react-router-dom'
import {Spinner} from "@/shared/ui/Spinner/ui/Spinner";

export const MainLayout: FC = () => {

    return (
        <>
            <Header/>
            <Suspense fallback={<Spinner/>}>
                <Outlet/>
            </Suspense>
            <Footer/>
        </>
    )
}