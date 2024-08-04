import { useRouteError } from "react-router-dom"

export const Error = () =>{
    const err = useRouteError();
    return (
        <div>
            <img src="https://freefrontend.com/assets/img/html-funny-404-pages/CodePen-404-Page.gif"></img>
            
        </div>
    )
}