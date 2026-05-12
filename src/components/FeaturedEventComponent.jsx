import { CiCalendar, CiClock2, CiLocationOn } from "react-icons/ci";
import { IoTicketOutline } from "react-icons/io5";
import NairaSymbol from "./NairaSymbol";
import { Link } from "react-router-dom";

export default function FeaturedEventComponent(){
    return(
        <div className="lg:flex lg:items-end gap-5 font-regular">
            <div style={{maxWidth: 380}}>
                <img 
                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
                    className="w-full object-cover rounded-3xl"
                    style={{
                        height: 400
                    }} 
                />
            </div>
            <div className="text-white">
                <h3 className="text-[25px] lg:text-[60px]">Fun in the Sun</h3>
                <p className="text-[16px] lg:text-[24px] lg:w-[70%] font-medium">
                    The biggest outdoor music & lifestyle festival featureing top Afrobeats stars, DJs, food vendirs, and games
                </p>
                <div className="flex flex-col gap-2 my-2">
                    <div className="flex gap-2 items-center text-[14px] lg:text-[20px]">
                        <CiLocationOn size={28}/>
                        <p>Volt Arena, Enugu</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex gap-2 items-center text-[14px] lg:text-[20px]">
                            <CiCalendar size={28}/>
                            <p>Sat, 23 May 2026</p>
                        </div>
                        <div className="flex gap-2 items-center text-[14px] lg:text-[20px]">
                            <CiClock2 size={28}/>
                            <p>Volt Arena, Enugu</p>
                        </div>
                    </div>
                    <div className="flex gap-2 items-center text-[14px] lg:text-[20px]">
                        <IoTicketOutline size={28} />
                        <p>Starting from <NairaSymbol />3000 </p>
                    </div>
                    <div className="flex flex-col lg:flex-row lg:justify-end gap-2 my-2">
                        <div className="w-full lg:w-auto text-center border border-white py-2 px-4 rounded-full uppercase text-[16px]">
                            <Link>
                                View Event Details
                            </Link>
                        </div>
                        <div className="w-full lg:w-auto text-center border border-white py-2 px-4 rounded-full uppercase text-[16px]">
                            <Link>
                                Get Tickets
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}