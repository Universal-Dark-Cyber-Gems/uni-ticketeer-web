import {useEffect} from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import useLogin from "../../hooks/useLogin"
import { ToastContainer } from "react-toastify"


export default function AuthLayout(){
    const location = useLocation()
    const navigate = useNavigate()
    const {isLoggedIn} = useLogin()

    console.log(location.pathname)

    useEffect(()=>{
        if(isLoggedIn){
            navigate("/dashboard")
        }
    })

    return(
        <>
            <div className="md:flex">
                <div className="w-[25%] hidden md:flex flex-col justify-center items-center h-[100vh] bg-primary-dark fixed">
                    <div className="text-white text-xl absolute top-10 left-10 font-bold cursor-pointer"><Link to={"/"}><img src="/logo.png" className="w-[50%]"/></Link></div>
                    <h1 className="text-4xl text-white font-bold">Emume</h1>
                    <p className="text-primary-orange text-xl">{location.pathname === "/auth/login" ? "Login" : location.pathname === "/auth/signup" ? "Sign up" : ""}</p>
                </div>
                <div className="w-full flex flex-col md:w-[80%] min-h-[100vh] ml-auto py-4 bg-[#EEE] items-center justify-center flex">
                    <h2 className="text-primary-dark md:hidden top-5 left-10 text-xl font-bold cursor-pointer"><Link to={"/"}>Emume</Link></h2>
                    <Outlet />
                </div>
                <ToastContainer />
            </div>
        </>
    )
}