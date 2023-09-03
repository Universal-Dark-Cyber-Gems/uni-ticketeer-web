import { IoCartOutline, IoMenu, IoNotificationsOutline } from "react-icons/io5";

export default function DashHeader({title, dashnavtoggle}){
    return(
        <div className="w-full flex justify-between py-4">
            <h3 className="text-2xl font-bold text-primary-dark">{title}</h3>
            <div className="flex items-center w-[auto] justify-around">
                <div className="mx-2 p-2">
                    <IoCartOutline size={25} />
                </div>
                <div className="mx-2 p-2">
                    <IoNotificationsOutline size={25} />
                </div>
                
                <div className="w-[40px] h-[40px] hidden md:block rounded-full">
                    <img src="https://pixlok.com/wp-content/uploads/2021/03/default-user-profile-picture.jpg" className="w-full rounded-full"  alt="user display" />
                </div>
                <div onClick={dashnavtoggle} className="w-[40px] h-[40px] md:hidden flex items-center p-2">
                    <IoMenu size={25} />
                </div>
            </div>
        </div>
    )
}