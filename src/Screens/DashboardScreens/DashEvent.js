import { useOutletContext } from "react-router-dom";
import DashEventCard from "../../components/DashEventCard";
import DashHeader from "../../components/DashHeader";
import EventCard from "../../components/EventCard";

export default function DashEvent(){
    const toggleMenu = useOutletContext()
    return(
        <>
            <DashHeader title={"Events"} dashnavtoggle={toggleMenu} />
            <div>
                <h2 className="text-xl text-primary-dark font-bold py-4">Featured Events</h2>
                <div className="bg-primary-dark md:flex justify-between gap-1 flex-wrap px-4 py-8 mb-4">
                    <EventCard link={'/dashboard/event/tickets'} />
                    <EventCard link={'/dashboard/event/tickets'} />
                    <EventCard link={'/dashboard/event/tickets'} />
                </div>
                <h2 className="text-xl text-primary-dark font-bold py-4"> Upcoming Events </h2>
                <div className="md:flex justify-even gap-1 flex-wrap px-4 py-8 mb-4">
                    <DashEventCard />
                    <DashEventCard />
                    <DashEventCard />
                </div>
            </div>
        </>
    )
}