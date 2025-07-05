import { useOutletContext } from "react-router-dom";
import DashEventCard from "../../components/DashEventCard";
import DashHeader from "../../components/DashHeader";
import EventCard from "../../components/EventCard";
import useEvents from "../../hooks/useEvents";
import {isEventPast} from "../../global/helpers"

export default function DashEvent(){
    const {toggleMenu} = useOutletContext()
    const { events, eventsLoading, eventsStatus } = useEvents()
    console.log("events", events)
    return(
        <>
            <DashHeader title={"Events"} dashnavtoggle={toggleMenu} />
            <div>
                {
                    eventsStatus.message === "featured"
                    &&
                    <>
                        <h2 className="text-xl text-primary-dark font-bold py-4">Featured Events</h2>
                        <div className="bg-primary-dark md:flex justify-between gap-1 flex-wrap px-4 py-8 mb-4">
                            <EventCard link={'/dashboard/event/tickets'} className="cursor-pointer"/>
                            <EventCard link={'/dashboard/event/tickets'} className=" cursor-pointer"/>
                            <EventCard link={'/dashboard/event/tickets'} className=" cursor-pointer"/>
                        </div>
                    </>
                }
                
                <h2 className="text-xl text-primary-dark font-bold py-4"> Upcoming Events </h2>
                {
                    eventsStatus.error
                    ?
                    <div className="text-center text-primary-dark font-medium">{eventsStatus.message}</div>
                    :
                    <div className="md:flex justify-even gap-1 flex-wrap px-4 py-8 mb-4">
                        {
                            events?.map((evt)=>{
                                if(!isEventPast(evt?.start_date, evt?.start_time)){
                                    return <DashEventCard event={evt} link={`/dashboard/event/tickets/${evt._id}`} />
                                }
                            })
                        }
                    </div>
                }
            </div>
        </>
    )
}