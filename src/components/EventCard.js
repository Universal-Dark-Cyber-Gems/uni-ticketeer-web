import Event1 from '../images/Event-1.jpg'
import { IoCalendar, IoLocationOutline, IoTimerOutline } from "react-icons/io5";

export default function EventCard(){
    return(
            <div className="group md:w-[30%] my-4 rounded-xl border-2 border-white relative">
                <img src={Event1} className="contrast-50 rounded-xl" alt="first event" />
                <div className="absolute w-[98%] border-2 border-white bg-white/30 group-hover:bg-white/80 bottom-1 p-2 text-center rounded-xl left-[50%] translate-x-[-50%]">
                    <h3 className="font-bold capitalize text-primary-light group-hover:text-primary-dark group-hover:text-left">Money Heist</h3>
                    <div className="hidden group-hover:block">
                        <p className="text-left capitalize">small description if any...</p>
                        <div className="md:flex justify-between p-2">
                            <div className="flex items-center">
                                <IoCalendar />
                                <div className="text-sm ml-2 font-medium">24th July 2023</div>
                            </div>
                            <div className="flex items-center">
                                <IoTimerOutline />
                                <div className="text-sm ml-2 font-medium">12pm</div>
                            </div>
                        </div>
                        <div className="flex justify-between p-2">
                            <div className="flex items-center text-left">
                                <IoLocationOutline />
                                <div className="text-sm ml-2 font-medium">Pegasus ball room, nsukka</div>
                            </div>
                        </div>
                        <div className="bottom-1 right-1 w-[50%] ml-auto">
                            <div className="bg-primary-orange w-[100%] text-sm font-medium py-1 hover:cursor-pointer rounded-full">
                                Get a ticket
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}