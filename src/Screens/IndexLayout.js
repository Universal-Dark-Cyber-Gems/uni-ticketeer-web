import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import useLogin from "../hooks/useLogin";

export default function IndexLayout(){
    const navigate = useNavigate()
    const { isLoggedIn } = useLogin()

    useEffect(()=>{
        if(isLoggedIn){
            navigate("/dashboard")
        }
    })
    return(
        <div className="bg-primary-dark">
            <div className="md:w-[300px] md:h-[300px] blur-[130px] bg-primary-orange rounded-full absolute right-0 top-[40%]"></div>
            <div className="md:w-[300px] md:h-[300px] blur-[130px] bg-primary-light rounded-full absolute left-[5%] top[-20%]"></div>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}