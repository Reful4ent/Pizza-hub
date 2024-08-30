import {FC} from "react";


import {urlRoute} from "@/shared/api/route";
import {LogoProps} from "@/shared/ui/SvgComponents/Logo/types";


export const Logo: FC<LogoProps> = ({text, iconUrl}) => {
    return (
        <>
            <p>{text}</p>
            {iconUrl && <img src={urlRoute + iconUrl} alt="icon"/>}
        </>
    )
}