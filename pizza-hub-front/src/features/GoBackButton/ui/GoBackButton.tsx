import {FC} from "react";
import {useNavigate} from "react-router-dom";


export const GoBackButton: FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <button className="my-[10px] p-[10px] bg-amber-200 rounded-[20px] hover:bg-amber-400 hover:text-white" onClick={() => navigate(-1)}>Вернуться</button>
        </>
    )
}