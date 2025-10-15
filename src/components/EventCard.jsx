import Event1 from '../images/Event-1.jpg'
import { IoCalendar, IoLocationOutline, IoTimerOutline } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { formatDay, formatTime } from '../global/helpers';

export default function EventCard({link, details}){
    return(
            <div className="group md:w-[30%] my-4 rounded-xl border-2 border-white text-primary-dark relative">
                <img src={details?.banner_image_url} className="contrast-30 group-hover:contrast-50 rounded-xl" alt="first event" />
                <div className="absolute w-[98%] border-2 border-white bg-white/30 group-hover:bg-white/80 bottom-1 p-2 text-center rounded-xl left-[50%] translate-x-[-50%]">
                    <h3 className="font-bold capitalize text-primary-dark group-hover:text-primary-dark group-hover:text-left">{details?.title}</h3>
                    <div className="hidden group-hover:block">
                        {
                            details?.additional_information
                            &&
                            <p className="text-left capitalize">
                                {details?.additional_information.slice(0, 25)}
                                {details?.additional_information.length > 25 && "..."}
                            </p>
                        }
                        <div className="md:flex justify-between p-2">
                            <div className="flex items-center">
                                <IoCalendar />
                                <div className="text-sm ml-2 font-medium">{details ? formatDay(details.start_date, "DD MMM YYYY") : ""}</div>
                            </div>
                            <div className="flex items-center">
                                <IoTimerOutline />
                                <div className="text-sm ml-2 font-medium">{details ? formatTime(details.start_time) : ""}</div>
                            </div>
                        </div>
                        <div className="flex justify-between p-2">
                            <div className="flex items-center text-left">
                                <IoLocationOutline />
                                <div className="text-sm ml-2 font-medium">Pegasus ball room, nsukka</div>
                            </div>
                        </div>
                        <div className="bottom-1 right-1 w-[50%] ml-auto">
                            <div className="bg-primary-orange w-[100%] text-sm font-medium py-1 cursor-pointer hover:underline rounded-full">
                                <Link to={link}>
                                    Get a ticket
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}