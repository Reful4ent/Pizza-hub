import {FC} from "react";
import {useConfig} from "@/app/context/context";
import {Logo} from "@/shared/ui/SvgComponents/Logo/ui/Logo";

export const Header: FC = () => {
    const config = useConfig()

    return(
        <>
            <Logo text={config?.context?.headerContext.name} iconUrl={config?.context?.headerContext.iconUrl}/>
        </>
    )
}