import { IoCalendar,IoLocationOutline, IoTimerOutline } from "react-icons/io5";
import Event1 from '../images/Event-1.jpg'
import { Link } from "react-router-dom";

export default function DashEventCard(){
    return(
        <div className="group md:w-[23%] bg-white rounded-xl border-2 border-white relative">
            <img src={Event1} className="w-full rounded-xl" alt="" />
            <div className="hidden group-hover:block w-full bg-white rounded-xl px-2 absolute bottom-0">
                <h3 className="text-primary-dark font-bold">Money Heist</h3>
                <p className="text-[10px] font-bold">Short description if any</p>
                <div>
                    <div className="flex justify-between my-2">
                        <div className="flex items-center">
                            <div className="border-[1px] border-primary-dark p-[4px] rounded-md">
                                <IoCalendar className="text-primary-dark" />
                            </div>
                            <p className="ml-2 text-[12px] font-bold">2nd July</p> 
                        </div>
                        <div className="flex items-center">
                            <div className="border-[1px] border-primary-dark p-[4px] rounded-md">
                                <IoTimerOutline className="text-primary-dark" />
                            </div>
                            <p className="ml-2 text-[12px] font-bold">3pm</p>
                        </div>
                    </div>
                    <div className="flex items-center my-2">
                        <div className="border-[1px] border-primary-dark p-[4px] rounded-md">
                            <IoLocationOutline className="text-primary-dark" />
                        </div>
                        <p className="ml-2 text-[12px] font-bold">pegasus ball room </p>
                    </div>
                </div>
                <Link to={'/dashboard/event/details'}><div className="bg-primary-orange text-center rounded-full my-2 font-medium">View Event Details</div></Link>
            </div>
        </div>
    )
}