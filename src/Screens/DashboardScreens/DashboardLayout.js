import { useState } from "react";
import { IoGridOutline, IoLogOutOutline, IoSettingsOutline, IoTicketOutline, IoWalletOutline } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom";

export default function DashboardLayout(){
    let [isMenuOpen, setIsMenuOpen] = useState(false)
    let location = useLocation()

    function toggleMenu(){
        setIsMenuOpen(!isMenuOpen)
    }
    return(
        <div className="flex z-[-10]">
            <div className={`w-auto md:w-[18%] ${!isMenuOpen ? 'hidden' : 'block'} md:block h-[100vh] z-[20] bg-primary-dark p-6 fixed`}>
                <h2 className="text-white text-xl font-bold pb-4"><Link to={"/"}>Uniticketeer</Link></h2>
                <div className="pt-8 pb-6">
                    <h4 className="text-[#CCCCCC] font-medium">Welcome,</h4>
                    <h3 className="text-white font-bold">Onyeka Ogbusuo</h3>
                </div>
                <hr />
                <div className="py-4">
                    <DashNavLinkCont toggleMenu={toggleMenu} active={location.pathname === '/dashboard' ? true : false} >
                        <IoGridOutline size={25} />
                        <Link to={"/dashboard"} className="ml-2">
                            Dashboard
                        </Link>
                    </DashNavLinkCont>
                    <DashNavLinkCont toggleMenu={toggleMenu} active={location.pathname === '/dashboard/events' ? true : false} >
                        <IoTicketOutline size={25} />
                        <Link to={"/dashboard/events"} className="ml-2">
                            Events
                        </Link>
                    </DashNavLinkCont>
                    <DashNavLinkCont toggleMenu={toggleMenu} active={location.pathname === '/dashboard/wallet' ? true : false} >
                        <IoWalletOutline size={25} />
                        <Link to={"/dashboard/wallet"} className="ml-2">
                            Wallet
                        </Link>
                    </DashNavLinkCont>
                    <DashNavLinkCont toggleMenu={toggleMenu} active={location.pathname === '/dashboard/settings' ? true : false} >
                        <IoSettingsOutline size={25} />
                        <Link to={"/dashboard/settings"} className="ml-2">
                            Settings
                        </Link>
                    </DashNavLinkCont>

                </div>

                <div>
                    <div className="text-[#CCCCCC] flex font-medium align-center py-6 absolute bottom-10">
                        <IoLogOutOutline size={25} />
                        <div className="ml-2">
                            Logout
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full md:w-[82%] px-3 min-h-[100vh] bg-[#EEEEEE] ml-auto">
                <Outlet context={toggleMenu} />
            </div>
        </div>
    )
}


function DashNavLinkCont({children, active, toggleMenu}){
    return(
        <div onClick={toggleMenu} className={`${active ? 'text-white' : "text-[#CCCCCC]"} hover:text-white flex font-medium align-center py-6`}>
            {children}
        </div>
    )
}