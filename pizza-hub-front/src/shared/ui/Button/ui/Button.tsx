import {FC} from "react";
import {IButton} from "@/shared/ui/Button/types";


export const Button : FC<IButton> = (props) => {
    return (
        <>
            <button className={props.className} onClick={props.onClick}>{props.children}</button>
        </>
    )
}