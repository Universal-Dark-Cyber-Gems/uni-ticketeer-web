import { IoCartOutline, IoNotificationsOutline } from "react-icons/io5";

export default function DashHeader({title}){
    return(
        <div className="w-full flex justify-between py-4">
            <h3 className="text-2xl font-bold text-primary-dark">{title}</h3>
            <div className="flex items-center w-[15%] justify-around">
                <div>
                    <IoCartOutline size={25} />
                </div>
                <div>
                    <IoNotificationsOutline size={25} />
                </div>
                <div className="w-[40px] h-[40px] rounded-full">
                    <img src="https://pixlok.com/wp-content/uploads/2021/03/default-user-profile-picture.jpg" className="w-full rounded-full"  alt="user display" />
                </div>
            </div>
        </div>
    )
}