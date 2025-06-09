import { Link } from "react-router-dom";
import OverviewCard from "../../components/OverviewCard";
import DashEventCard from "../../components/DashEventCard";
import { IoAdd, IoClose } from "react-icons/io5";
import { useEffect, useState, useContext } from "react";
import useEvents from "../../hooks/useEvents";
import useTickets from "../../hooks/useTickets";
import { useNavigate } from "react-router-dom";
import { UserContext, useUserProvider } from "../../contexts/UserContext";
import { checkMissingTickets } from "../../global/helpers";
import CustomModal from "../../components/CustomModal";

export default function OrganiserDashboard(){
    let navigate = useNavigate()
    const {user} = useUserProvider()

    let [activeOrganiserTab, setActiveOrganiserTab] = useState("ongoing events")
    
    const { events, eventsLoading, eventsStatus } = useEvents()

    let [organiserActiveEvents, setOrganiserActiveEvents] = useState([])
    let [organiserAllEvents, setOrganiserAllEvents] = useState([])
    let [needTicketModalOpen, setNeedTicketModalOpen] = useState(false)
    let [eventNeedingTickets, setEventNeedingTickets] = useState("")

    useEffect(()=>{
        if(events && events.length > 0){
            console.log("events from organiser dashboard", events)
            let allEvents = []
            let activeEvents = []
            for(let i=0; i < events.length; i++){
                if(events[i].organiser === user._id){
                    let comparisonDate = new Date(events[i].end_date || events[i].start_date)
                    allEvents.push(events[i])
                    setOrganiserAllEvents(allEvents)
                    if(comparisonDate > Date.now()){
                        activeEvents.push(events[i])
                        setOrganiserActiveEvents(activeEvents)
                    }
                }
            }
        }
    }, [events])

    async function checkEventsNeedingTickets(events){
        console.log("running function to check missing tickets")
        let result = await checkMissingTickets(events)
        console.log("result after checking missing tickets", result)
        if(result.isMissing){
            setEventNeedingTickets({name: result.event.title, banner_image_url: result.event.banner_image_url, id: result.event._id})
            setNeedTicketModalOpen(true)
        }
    }
    
    useEffect(()=>{
        console.log("active events", organiserActiveEvents)
        if(organiserActiveEvents.length > 0){
            checkEventsNeedingTickets(organiserActiveEvents)
        }
    }, [organiserActiveEvents])

    return(
        <div className="w-[100%]">
                    <h2 className="text-xl py-8 font-bold text-primary-dark">Overview</h2>
                    <div className="md:grid grid-cols-3 grid-rows-3 gap-5">
                        <OverviewCard title={"ongoing events"} amount={organiserActiveEvents.length} />          
                        <OverviewCard title={"ongoing ticket sales"} amount={24} />
                        <OverviewCard title={"all time events"} amount={organiserAllEvents.length} />
                        <OverviewCard title={"all time ticket sales"} amount={400} />
                        <OverviewCard title={"active tickets"} amount={0} />
                        <OverviewCard title={"all time sales"} amount={0} />             
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
                                {
                                    organiserAllEvents?.map((event, i)=>(<DashEventCard key={"event"+i} event={event} link={`/dashboard/event/details/${event._id}`}  />))
                                }
                            </div>
                        }
                    </div>
                    <CustomModal 
                        isOpen={needTicketModalOpen} 
                        closeModal={()=> {}}
                    >
                        <div>
                            <p className="text-center text-primary-dark font-medium">
                                An event with the name <span className="font-bold text-primary-orange">{eventNeedingTickets.name}</span> was found to be ticketed but no tickets were found.
                            </p>
                            <div className="w-[60%] h-[50vh] m-auto mt-4 mb-4">
                                <img 
                                    className="w-[100%] h-[100%] rounded-[20px] shadow-2xl"
                                    src={eventNeedingTickets.banner_image_url}
                                />
                            </div>
                            <p className="text-center text-primary-dark font-medium">
                                The event cannot be published until you either create a ticket or set the event to a free event
                            </p>

                            <div className="flex justify-between p-4">
                                <div 
                                    onClick={()=> navigate(`/dashboard/event/edit/${eventNeedingTickets.id}`)} 
                                    className="bg-primary-dark text-primary-orange font-medium cursor-pointer p-2 border-[1px] border-primary-dark rounded-full"
                                >
                                    Edit Event
                                </div>
                                <div 
                                    onClick={()=>navigate(`/dashboard/event/create?current_tab=ticket&event=${eventNeedingTickets.name}&ev_id=${eventNeedingTickets.id}`)} 
                                    className="bg-primary-dark text-primary-orange font-medium cursor-pointer p-2 border-[1px] border-primary-dark rounded-full"
                                >
                                    Add Tickets
                                </div>
                            </div>
                        </div>
                    </CustomModal>
                </div>
    )
}