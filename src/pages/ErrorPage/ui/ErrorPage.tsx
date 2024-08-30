import {FC} from "react";
import {useRouteError} from "react-router-dom";


export const ErrorPage: FC = () => {
    const error = useRouteError();

    return (
        <>
            <div className="error-page">
                <h1 className="error-text-head">Oops!</h1>
                <p className="error-text-main">Sorry, an unexpected error has occurred.</p>
                <p className="error-text-error">
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </>
    )
}