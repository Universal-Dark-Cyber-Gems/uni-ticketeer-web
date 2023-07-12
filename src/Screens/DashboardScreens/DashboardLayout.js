import { IoGridOutline, IoLogOutOutline, IoSettingsOutline, IoTicketOutline, IoWalletOutline } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";

export default function DashboardLayout(){
    return(
        <div className="flex">
            <div className="w-[18%] h-[100vh] bg-primary-dark p-6 fixed">
                <h2 className="text-white text-xl font-bold pb-4"><Link to={"/"}>Uniticketeer</Link></h2>
                <div className="pt-8 pb-6">
                    <h4 className="text-[#CCCCCC] font-medium">Welcome,</h4>
                    <h3 className="text-white font-bold">Onyeka Ogbusuo</h3>
                </div>
                <hr />
                <div className="py-4">
                    <div className="text-[#CCCCCC] flex font-medium align-center py-6">
                        <IoGridOutline size={25} />
                        <Link to={"/dashboard"} className="ml-2">
                            Dashboard
                        </Link>
                    </div>
                    <div className="text-[#CCCCCC] flex font-medium align-center py-6">
                        <IoTicketOutline size={25} />
                        <Link to={"/dashboard/events"} className="ml-2">
                            Events
                        </Link>
                    </div>
                    <div className="text-[#CCCCCC] flex font-medium align-center py-6">
                        <IoWalletOutline size={25} />
                        <Link to={"/dashboard/wallet"} className="ml-2">
                            Wallet
                        </Link>
                    </div>
                    <div className="text-[#CCCCCC] flex font-medium align-center py-6">
                        <IoSettingsOutline size={25} />
                        <Link to={"/dashboard/settings"} className="ml-2">
                            Settings
                        </Link>
                    </div>

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

            <div className="w-[82%] px-3 min-h-[100vh] bg-[#EEEEEE] ml-auto">
                <Outlet />
            </div>
        </div>
    )
}