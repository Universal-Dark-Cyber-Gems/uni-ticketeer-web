import { useState } from "react";
import { IoGridOutline, IoLogOutOutline, IoSettingsOutline, IoTicketOutline, IoWalletOutline } from "react-icons/io5";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/useLogin";
import useUser from "../../hooks/useUser";
import spinner from "../../images/Spinner-1s-200px.svg"
import { UserContext } from "../../contexts/userContext";

export default function DashboardLayout(){
    let navigate = useNavigate()
    let { logout } = useLogin()
    let { user, userLoading, userStatus } = useUser()

    let [isMenuOpen, setIsMenuOpen] = useState(false)
    let location = useLocation()

    function toggleMenu(){
        setIsMenuOpen(!isMenuOpen)
    }

    console.log(user)

    return(
        <UserContext.Provider value={user}>
            <div className="flex z-[-10]">
                <div className={`w-auto md:w-[18%] ${!isMenuOpen ? 'hidden' : 'block'} md:block h-[100vh] z-[20] bg-primary-dark p-6 fixed`}>
                    <h2 className="text-white text-xl font-bold pb-4 cursor-pointer"><Link to={"/"}>Uniticketeer</Link></h2>
                    <div className="pt-8 pb-6">
                        <h4 className="text-[#CCCCCC] font-medium">Welcome,</h4>
                        <h3 className="text-white font-bold">{user?.firstname} {user?.lastname}</h3>
                    </div>
                    <hr />
                    <div className="py-4">
                        <DashNavLinkCont toggleMenu={toggleMenu} active={location.pathname === '/dashboard' ? true : false} >
                            <IoGridOutline size={25} />
                            <Link to={"/dashboard"} className="ml-2 cursor-pointer">
                                Dashboard
                            </Link>
                        </DashNavLinkCont>
                        <DashNavLinkCont toggleMenu={toggleMenu} active={location.pathname === '/dashboard/events' ? true : false} >
                            <IoTicketOutline size={25} />
                            <Link to={"/dashboard/events"} className="ml-2 cursor-pointer">
                                Events
                            </Link>
                        </DashNavLinkCont>
                        {
                            user?.usertype === "organiser"
                            &&
                            <DashNavLinkCont toggleMenu={toggleMenu} active={location.pathname === '/dashboard/wallet' ? true : false} >
                                <IoWalletOutline size={25} />
                                <Link to={"/dashboard/wallet"} className="ml-2 cursor-pointer">
                                    Wallet
                                </Link>
                            </DashNavLinkCont>
                        }
                        <DashNavLinkCont toggleMenu={toggleMenu} active={location.pathname === '/dashboard/settings' ? true : false} >
                            <IoSettingsOutline size={25} />
                            <Link to={"/dashboard/settings"} className="ml-2 cursor-pointer">
                                Settings
                            </Link>
                        </DashNavLinkCont>

                    </div>

                    <div>
                        <div onClick={logout} className="text-[#CCCCCC] flex font-medium align-center py-6 absolute bottom-10">
                            <IoLogOutOutline size={25} />
                            <div className="ml-2 cursor-pointer">
                                Logout
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-[82%] px-3 min-h-[100vh] bg-[#EEEEEE] ml-auto">
                    {
                        userLoading
                        ?
                        <div className="text-center text-primary-dark font-medium">
                            Loading user details ...
                        </div>
                        :
                        userStatus.error
                        ?
                        <div className="text-center text-red-500 font-medium">
                            {userStatus.message}
                        </div>
                        :
                        <Outlet context={{toggleMenu, user}} />
                    }
                </div>
            </div>
        </UserContext.Provider>
    )
}


function DashNavLinkCont({children, active, toggleMenu}){
    return(
        <div onClick={toggleMenu} className={`${active ? 'text-white' : "text-[#CCCCCC]"} hover:text-white flex font-medium align-center py-6 cursor-pointer`}>
            {children}
        </div>
    )
}