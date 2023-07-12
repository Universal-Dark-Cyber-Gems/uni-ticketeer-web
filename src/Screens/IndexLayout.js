import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function IndexLayout(){
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