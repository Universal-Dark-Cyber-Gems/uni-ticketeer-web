import { useState } from "react"
import { GiHamburgerMenu } from "react-icons/gi"
import { IoSearch } from "react-icons/io5"
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
        <div className={`bg-white m-auto p-4 rounded-lg`}>
        <header className={`flex justify-between gap-5 w-full items-center`}>
            <div className="w-[15%] md:w-[54px] text-lg cursor-pointer"> 
                <Link to={"/"}>
                    <img src="new-logo.png" alt="emume-logo" className="w-[33px] md:w-[150px] p-[0px] m-[0px]"/>
                </Link>
            </div>
            <nav className={`hidden w-full md:flex items-center justify-between shadow-2xl md:shadow-none`}>
                <ul className="flex justify-between items-center">
                    <NavItems name={"Billboard"} url={"/events"} toggleNav={closeNav} className=" cursor-pointer"/>
                    <NavItems name={"How it works"} url={"/how-it-works"} toggleNav={closeNav} className=" cursor-pointer"/>
                    <NavItems name={"Organizers"} url={"/"} toggleNav={closeNav} className=" cursor-pointer" />
                    <NavItems name={"About"} url={"/about"} toggleNav={closeNav} className=" cursor-pointer"/>
                </ul>
                <div className="md:flex items-center gap-5">
                    <Link to={"/auth/login"} className="uppercase text-primary-dark">
                        Log In
                    </Link>
                    <div className="bg-primary-dark uppercase text-primary-orange px-4 py-2 rounded-full">
                        <Link to={'/auth/signup'}>
                            Sign Up
                        </Link>
                    </div>
                </div>
            </nav>
            <div className="flex items-center gap-4 md:hidden">
                <div>
                    <IoSearch className="text-primary-dark" size={25} />
                </div>
                <div onClick={toggleNav}>
                    <GiHamburgerMenu className="text-primary-dark" size={25} />
                </div>
            </div>
        </header>
        </div>
    )
}

function NavItems({name, url, toggleNav}){
    return(
        <li className="md:w-auto md:text-[16px] uppercase md:border-0 md:last:mr-10 mx-4 py-4 text-primary-dark hover:text-primary-orange cursor-pointer">
            <Link onClick={toggleNav} to={url}>{name}</Link>
        </li>
    )
}