import { Link } from "react-router-dom"

export default function NotFound(){
    return(
        <div>
            <div className="md:w-[45%] m-auto pt-[30%] md:pt-[5%]">
                <a href="https://storyset.com/web">
                    <img src="/notfound.svg" />
                </a>
                <p className="font-bold text-primary-dark text-2xl text-center">
                    Oops... This page does not exist
                </p>
                <div className="m-auto flex flex-row justify-center p-4">
                    <Link to={"/dashboard"} className="bg-primary-dark text-primary-orange font-medium p-4 rounded-full">
                        Go Back
                    </Link>
                </div>
            </div>
        </div>
    )
}