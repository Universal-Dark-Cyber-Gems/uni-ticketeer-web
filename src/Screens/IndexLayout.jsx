import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import useLogin from "../hooks/useLogin";

export default function IndexLayout(){
    const location = useLocation()
    const navigate = useNavigate()
    const { isLoggedIn } = useLogin()

    useEffect(()=>{
        if(isLoggedIn && location.pathname !== "/events"){
            navigate("/dashboard/events")
        }
    })
    return(
        <div className="dark:bg-primary-dark bg-[#FFFFFF]">
            <div className="relative bg-transparent z-30 w-[100%]">
                <Outlet />
                <Footer />
            </div>
            {/* <div className="md:w-[300px] md:h-[300px] blur-[130px] bg-primary-orange rounded-full absolute right-0 top-[40%] z-0"></div>
            <div className="md:w-[300px] md:h-[300px] blur-[130px] bg-primary-light rounded-full absolute left-0 top-[1%] z-0"></div> */}
        </div>
    )
}