import CustomLoader from "../components/CustomLoader";
import EventCard from "../components/EventCard";
import Section from "../components/Section";
import useEvents from "../hooks/useEvents";

export default function Events(){
    let {events, eventsLoading, eventsStatus} = useEvents()
    return(
        <Section>
        <div className="min-h-[100vh] z-10">
               <div>
                {
                    eventsLoading
                    ?
                    <div className="flex flex-col justify-center items-center">
                        <CustomLoader />
                    </div>
                    :
                    eventsStatus.error
                    ?
                    <div className="text-red-500 text-center">
                        {eventsStatus.message}
                    </div>
                    :
                    events
                    &&
                    <>
                        <h2 className="text-xl font-bold text-primary-light">Upcoming Events</h2>
                        <div className="md:flex flex-wrap gap-5 py-10">
                            {
                                events?.map((event, i)=>(
                                    <EventCard key={"event"+i} details={event} />
                                ))
                            }
                        </div>
                    </>
                }
               </div>
        </div>
        </Section>
    )
}