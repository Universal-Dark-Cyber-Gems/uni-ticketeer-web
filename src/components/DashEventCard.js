import { IoCalendar,IoLocationOutline, IoTimerOutline } from "react-icons/io5";
import Event1 from '../images/Event-1.jpg'

export default function DashEventCard(){
    return(
        <div className="group w-[25%] bg-white rounded-xl border-2 border-white relative">
            <img src={Event1} className="w-full rounded-xl" alt="" />
            <div className="hidden group-hover:block w-full bg-white rounded-xl px-2 absolute bottom-0">
                <h3 className="text-primary-dark font-medium">Money Heist</h3>
                <div>
                    <div className="flex justify-between my-2">
                        <div className="flex items-center">
                            <IoCalendar />
                            <p className="ml-2">2nd July</p> 
                        </div>
                        <div className="flex items-center">
                            <IoTimerOutline />
                            <p className="ml-2">3pm</p>
                        </div>
                    </div>
                    <div className="flex items-center my-2">
                                    <IoLocationOutline />
                        <p className="ml-2">pegasus ball room </p>
                    </div>
                </div>
                <div className="bg-primary-orange text-center rounded-full my-2 font-medium">View Event Details</div>
            </div>
        </div>
    )
}