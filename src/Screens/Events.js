import EventCard from "../components/EventCard";
import Section from "../components/Section";

export default function Events(){
    return(
        <div className="min-h-[100vh] z-10">
            <Section>
                <div>
                    <h2 className="text-xl font-bold"> Featured Events </h2>
                </div>
               <div>
                    <h2 className="text-xl font-bold text-primary-light">Upcoming Events</h2>
                    <div className="md:flex flex-wrap justify-between py-10">
                        <EventCard />
                        <EventCard />
                        <EventCard />
                        <EventCard />
                    </div>
               </div>
            </Section>
        </div>
    )
}