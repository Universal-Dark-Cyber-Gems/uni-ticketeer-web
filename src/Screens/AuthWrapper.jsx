import { useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";

export default function AuthWrapper({children}){
    let { isLoggedIn } = useLogin()
    let navigate = useNavigate()
    
    console.log("isuserloggedin:", isLoggedIn)
    
    if(!isLoggedIn){
        navigate("/auth/login")
    }

    return children
}