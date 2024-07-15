import { Link } from "react-router-dom";
import OverviewCard from "./OverviewCard";
import DashEventCard from "./DashEventCard";
import { IoAdd } from "react-icons/io5";
import { useEffect, useState, useContext } from "react";
import useEvents from "../hooks/useEvents";
import useTickets from "../hooks/useTickets";
import { useOutletContext } from "react-router-dom";
import { UserContext } from "../contexts/userContext";

export default function OrganiserDashboard(){
    let [activeOrganiserTab, setActiveOrganiserTab] = useState("ongoing events")
    
    const { events, eventsLoading, eventsStatus } = useEvents()
    const {getTickets, ticketsLoading, ticketStatus} = useTickets()

    let [organiserActiveEvents, setOrganiserActiveEvents] = useState([])
    let [organiserAllEvents, setOrganiserAllEvents] = useState([])
    const user = useContext(UserContext)

    useEffect(()=>{
        if(events && events.length > 0){
            console.log(events)
            for(let i=0; i < events.length; i++){
                if(events[i].organiser === user._id){
                    setOrganiserAllEvents((prev)=> [...prev, events[i]])
                    if(events[i].end_date < Date.now()){
                        setOrganiserActiveEvents((prev)=> [...prev, events[i]])
                    }
                }
            }
        }
    }, [events])

    useEffect(()=>{

    })

    return(
        <div className="w-[100%]">
                    <h2 className="text-xl py-8 font-bold text-primary-dark">Overview</h2>
                    <div>
                        <swiper-container init="false" space-between="20" >
                            <swiper-slide>
                                <OverviewCard title={"ongoing events"} amount={organiserActiveEvents.length} active={activeOrganiserTab} setActive={setActiveOrganiserTab} />
                            </swiper-slide>
                            <swiper-slide>
                                <OverviewCard title={"ongoing ticket sales"} amount={24} active={activeOrganiserTab} setActive={setActiveOrganiserTab} />
                            </swiper-slide>
                            <swiper-slide>
                                <OverviewCard title={"all time events"} amount={organiserAllEvents.length} active={activeOrganiserTab} setActive={setActiveOrganiserTab} />
                            </swiper-slide>
                            <swiper-slide>
                                <OverviewCard title={"all time ticket sales"} amount={400} active={activeOrganiserTab} setActive={setActiveOrganiserTab} />
                            </swiper-slide>
                        </swiper-container>
                    </div>
                    <div>
                        <div className="flex justify-between pt-12 pb-8">
                            <h2 className="text-xl font-bold text-primary-dark">Your Events</h2>
                            <Link to={"/dashboard/event/create"}>
                                <div className="flex items-center bg-primary-orange p-2 mr-8 rounded-full font-medium"> 
                                    New Event 
                                    <IoAdd size={20} className=" cursor-pointer"/>
                                </div>
                            </Link>
                        </div>
                        {
                            eventsLoading
                            ?
                            <div className="pt-8 text-center text-primary-dark font-medium"> Loading Events .... </div>
                            :
                            eventsStatus?.error
                            ?
                            <div className="pt-8 text-center text-red-500 font-medium"> {eventsStatus.message} </div>
                            :
                            <div className="flex justify-even gap-2 flex-wrap">
                                <DashEventCard />
                                <DashEventCard />
                            </div>
                        }
                    </div>
                </div>
    )
}