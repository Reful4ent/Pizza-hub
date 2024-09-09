import {FC} from "react";
import {useNavigate} from "react-router-dom";


export const GoBackButton: FC = () => {
    const navigate = useNavigate();

    return (
        <>
            <button onClick={() => navigate(-1)}>Вернуться</button>
        </>
    )
}