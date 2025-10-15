import { useState } from "react"
import { Link } from "react-router-dom"

export default function Header(){
    let [navOpen, setNavOpen] = useState(false)

    function toggleNav(){
        setNavOpen(!navOpen)
    }

    function closeNav(){
        setNavOpen(false)
    }

    return(
        <div className={`${navOpen ? "fixed bg-primary-dark left-0 w-[100%] h-[100px] px-2 z-50" : "w-[80%] relative bg-transparent mx-auto pt-3"}`}>
        <header className={`${navOpen && "px-4"} flex w-full justify-between items-center py-4`}>
            <div className="text-white font-bold text-lg cursor-pointer"> 
                <Link to={"/"}>
                    <img src="logo.png" alt="emume-logo" className="w-[100px] md:w-[150px] p-[0px] m-[0px]"/>
                </Link>
            </div>
            <nav className={` ${navOpen ? 'fixed flex' : 'hidden'} z-10 py-3 flex flex-col justify-center items-center text-center w-full left-0 top-[100px] md:top-0 bg-primary-dark md:visible md:flex md:relative md:w-[60%] md:bg-transparent md:flex-row shadow-2xl md:shadow-none`}>
                <ul className="md:flex md:justify-between">
                    <NavItems name={"Home"} url={"/"} toggleNav={closeNav} className=" cursor-pointer" />
                    <NavItems name={"Billboard"} url={"/events"} toggleNav={closeNav} className=" cursor-pointer"/>
                    <NavItems name={"About"} url={"/about"} toggleNav={closeNav} className=" cursor-pointer"/>
                    <NavItems name={"How it works"} url={"/how-it-works"} toggleNav={closeNav} className=" cursor-pointer"/>
                </ul>
                <div className="w-[70px] bg-primary-light hover:bg-transparent hover:text-primary-orange border-2 rounded-full text-center text-[#342E7E] font-medium py-0.5 cursor-pointer transition-all ease-in-out duration-300">
                    <Link to={'/auth/login'}>
                        Log in
                    </Link>
                </div>
            </nav>
            <div className="text-white md:hidden" onClick={toggleNav}>
                --
            </div>
        </header>
        </div>
    )
}

function NavItems({name, url, toggleNav}){
    return(
        <li className="md:w-auto md:border-0 md:last:mr-10 mx-4 py-4 text-white hover:text-primary-orange cursor-pointer">
            <Link onClick={toggleNav} to={url}>{name}</Link>
        </li>
    )
}