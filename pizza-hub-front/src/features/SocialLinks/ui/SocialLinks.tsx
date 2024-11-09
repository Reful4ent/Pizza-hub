import {FC, useMemo} from "react";
import {ISocialLinks} from "@/features/SocialLinks/types";


export const SocialLinks: FC<ISocialLinks> = ({socialLinks}) => {

    const socialLinksLi = useMemo(() => {
        return socialLinks?.map((links, index) => (
            <li key={index}>
                <a href={links.linkTo} target="_blank">
                    <img
                        src={links.linkForImg}
                        className="h-[32px]"
                        alt="link"
                    />
                </a>
            </li>
        ))
    },[socialLinks])

    console.log(socialLinks)

    return (
        <ul className="flex flex-row xl:gap-[8px] 2xl:gap-[12px]">
            {socialLinksLi}
        </ul>
    )
}