import { CiCalendar, CiClock2, CiLocationOn } from "react-icons/ci";
import CustomLoader from "../components/CustomLoader";
import EventCard from "../components/EventCard";
import Header from "../components/Header";
import NewEventCard from "../components/NewEventCard";
import Section from "../components/Section";
import useEvents from "../hooks/useEvents";
import { Images } from "../images";
import { Link } from "react-router-dom";
import { BsLightningChargeFill } from "react-icons/bs";
import { IoTicketOutline } from "react-icons/io5";
import NairaSymbol from "../components/NairaSymbol";
import FeaturedEventComponent from "../components/FeaturedEventComponent";
import CustomSliderContainer from "../components/CustomSliderContainer";
import { SwiperSlide } from "swiper/react";

export default function Events(){
    let {events, eventsLoading, eventsStatus} = useEvents()
    return(
        <>
            <div className='relative' style={{backgroundImage: `url(${Images.newHero})`, backgroundPosition: "center", backgroundSize: "cover"}}>
                <div className='bg-[#000]/70 py-4'>
                    <Section>
                        <Header />
                        <div className="flex justify-center lg:justify-start mt-4">
                            <div className="flex items-center justify-center bg-primary-orange py-2 px-4 rounded-full text-primary-dark text-center">
                                <BsLightningChargeFill />
                                Featured
                            </div>
                        </div>
                        <div className="flex justify-center py-8">
                            <CustomSliderContainer breakpoints={{
                                640: {
                                    "slidesPerView": 1,
                                },
                                1024: {
                                    "slidesPerView": 1
                                }
                            }}>
                                {
                                    [1, 2, 3, 4].map((item, i)=>((
                                        <div>Hello</div>
                                        )
                                    ))
                                }
                            </CustomSliderContainer>
                        </div>
                    </Section>
                </div>
                {/* Ticket notch row at bottom */}
                {/* desktop */}
                <div className="absolute hidden bottom-0 left-0 right-0 md:flex justify-around pointer-events-none">
                {Array.from({ length: 22 }).map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-[#FFFFFF] translate-y-1/2" />
                ))}
                </div>
                {/* mobile notches */}
                <div className="absolute md:hidden bottom-0 left-0 right-0 flex justify-between pointer-events-none">
                {Array.from({ length: 11 }).map((_, i) => (
                    <div key={i} className="w-4 h-4 rounded-full bg-[#FFFFFF] translate-y-1/2" />
                ))}
                </div>
            </div>
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
                                {/* {
                                    events?.map((event, i)=>(
                                        <EventCard key={"event"+i} details={event} />
                                    ))
                                } */}
                                <NewEventCard />
                            </div>
                        </>
                    }
                </div>
            </div>
            </Section>
        </>
    )
}