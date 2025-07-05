import { IoCalendar, IoEye, IoLocation, IoPencil, IoPricetag, IoStatsChart, IoTicket, IoTime } from 'react-icons/io5'
import Event1 from '../../images/Event-1.jpg'
import NairaSymbol from '../../components/NairaSymbol'
import ProgressBar from '../../components/ProgressBar'
import IconsWrap from '../../components/IconsWrap'
import Tooltip from '../../components/Tooltip'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import { UserContext } from '../../contexts/UserContext'
import { useContext, useEffect, useState } from 'react'
import useTickets from '../../hooks/useTickets'
import useEvents from '../../hooks/useEvents'
import { formatDay, formatTime, getCategoryString, isEventPast } from '../../global/helpers'
import CustomModal from "../../components/CustomModal"
import { useScreenLoaderProvider } from '../../contexts/ScreenLoaderContext'
import Line from '../../components/Line'
import { toast } from 'react-toastify'
import { useEventProvider } from '../../contexts/EventContext'

export default function ViewEventStats(){
    const navigate = useNavigate()
    const { id } = useParams()
    let user = useContext(UserContext)
    let { tickets, ticketStatus, ticketsLoading } = useTickets(id)
    let { events, getSingleEvent, editEvent, eventsLoading, eventsStatus } = useEventProvider()

    let [singleEvent, setSingleEvent] = useState(null)
    let [showCancelEventModal, setShowCancelEventModal] = useState(false)
    let [showDeleteEventModal, setShowDeleteEventModal] = useState(false)

    async function toggleCancelEvent() {
        let res = await editEvent(id, {status: singleEvent?.status == "cancelled" ? 'published' : 'cancelled'})
        if(res.success){
            toast.success(singleEvent?.status != "cancelled" ? "Event Cancelled" :"Event Restored")
            setShowCancelEventModal(false)
        }
    }

    useEffect(()=>{
        setSingleEvent(getSingleEvent(id))
    }, [events])

    useScreenLoaderProvider(eventsLoading, "Loading Event Details")

    console.log("tickets inside event stats", tickets)

    return(
        <>
            <div className='py-4 my-4'>
                <div className='md:w-[90%] p-4 relative m-auto md:border-[1px] md:border-primary-dark rounded-xl'>
                    {/* <div onClick={()=>{ navigate(`/dashboard/event/edit/${id}`) }} className='absolute cursor-pointer shadow-lg right-2 top-2 bg-white flex w-[30px] h-[30px] rounded-full justify-center items-center'>
                        <IoPencil />
                    </div> */}
                    <div className='md:flex w-[100%]'>
                        <div className='md:w-[50%] md:h-[100%]'>
                            <img src={singleEvent?.banner_image_url} className='w-[100%] h-[100%] rounded-xl' alt='event banner' />
                        </div>
                        <div className='md:w-[50%]'>
                            <div className='p-3 md:w-[100%] m-auto md:rounded-tr-xl rounded-br-xl rounded-bl-xl md:rounded-bl-0'>
                                <p className='capitalize text-lg font-bold text-center text-primary-dark'>{singleEvent?.title}</p>
                                {
                                    singleEvent?.description
                                    &&
                                    <div>
                                        <h4 className='font-medium text-primary-dark'>About:</h4>
                                        <p> 
                                            {singleEvent?.description}
                                        </p>
                                    </div>
                                }

                                <div className='flex justify-between py-6'>
                                    <div>
                                        <div className='py-2'>
                                            <div className='group relative flex items-center'>
                                                <Tooltip text="time" />
                                                <IconsWrap>
                                                    <IoTime className='text-primary-dark' />
                                                </IconsWrap>
                                                <p className='text-sm font-medium text-primary-dark mx-2'>{singleEvent?.start_time ? formatTime(singleEvent?.start_time) : ""}</p>
                                            </div>
                                        </div>
                                       
                                        <div className='py-2'>
                                            <div className='group relative flex items-center'>
                                                <Tooltip text="location" />
                                                <IconsWrap>
                                                    <IoLocation className='text-primary-dark' />
                                                </IconsWrap>
                                            
                                                <p className='text-sm font-medium text-primary-dark mx-2'>{singleEvent?.venue}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className='py-2'>
                                            <div className='group relative flex items-center'>
                                                <Tooltip text="date" />
                                                <IconsWrap>
                                                    <IoCalendar className='text-primary-dark'  />
                                                </IconsWrap>
                                                
                                                <p className='text-sm font-medium text-primary-dark mx-2'>{formatDay(singleEvent?.start_date)}</p>
                                            </div>
                                        </div>
                                        <div className='py-2'>
                                            <div className='group relative flex items-center'>
                                                <Tooltip text="views" />
                                                <IconsWrap>
                                                    <IoEye className='text-primary-dark' />
                                                </IconsWrap>
                                                
                                                <p className='font-medium text-sm text-primary-dark mx-2'>{singleEvent?.views}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <Line />
                                <div className='text-primary-dark text-[14px] gap-2 flex flex-col'>
                                    <div><span className='font-bold text-[16px]'>Status :</span> <span className={`${singleEvent?.status == "published" ? "text-green-500" : "text-red-500"} capitalize font-medium`}>{singleEvent?.status}</span></div>
                                    { singleEvent?.additional_information && <div className='font-bold'><span className='font-medium'>Additional Information:</span> {singleEvent?.additional_information}</div>}
                                    <div className='font-medium'><span className='font-bold text-[16px]'>Has Ticket(s) :</span> {singleEvent?.is_ticketed ? "True" : "False"}</div>
                                    <div className='font-medium'><span className='font-bold text-[16px]'>Categories :</span> {getCategoryString(singleEvent?.category)}</div>
                                    <div className='font-medium'><span className='font-bold text-[16px]'>Organiser : </span>{singleEvent?.organiser_name}</div>
                                    <div className='font-medium'><span className='font-bold text-[16px]'>Total Number of Tickets Sold :</span> 32</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Line />
                    <div>
                        <div className='flex flex-wrap justify-end items-center gap-4'>
                            {
                                !isEventPast(singleEvent?.start_date, singleEvent?.start_time)
                                &&
                                <div onClick={()=>{ navigate(`/dashboard/event/edit/${id}`) }} className='cursor-pointer border-[1px] text-[14px] border-primary-dark p-2 font-medium rounded-full text-primary-dark'>
                                    Edit Event 
                                </div>
                            }
                            {
                                !isEventPast(singleEvent?.start_date, singleEvent?.start_time)
                                &&
                                <div 
                                    onClick={()=>{setShowCancelEventModal(true)}} 
                                    className={`cursor-pointer border-[1px] text-[14px] p-2 font-medium rounded-full ${ singleEvent?.status != "cancelled" ? "border-red-500 text-red-500" : "border-green-500 text-green-500"}`}
                                >
                                    {singleEvent?.status != "cancelled" ? "Cancel Event" : "Restore Event"}
                                </div>
                            }
                            <div onClick={()=>{setShowDeleteEventModal(true)}} className='cursor-pointer border-[1px] text-[14px] border-red-500 p-2 font-medium rounded-full text-white bg-red-500'>
                                Delete Event
                            </div>
                        </div>
                    </div>
                    {
                        singleEvent?.is_ticketed
                        &&
                        <>
                            <Line />
                            <div>
                                <div className="flex justify-between mb-4">
                                    <div className="font-bold text-xl text-primary-dark">Tickets</div>
                                    <div 
                                        className="text-sm text-primary-dark underline cursor-pointer hover:text-primary-orange"
                                        onClick={()=>{navigate(`/dashboard/event/create?current_tab=ticket&event=${singleEvent?.title}&ev_id=${singleEvent?._id}`)}}
                                    > 
                                        + Add more Tickets
                                    </div>
                                </div>
                                <div className="md:flex flex-wrap gap-4">
                                    {
                                        tickets?.map((ticket)=>(
                                            <TicketStats details={ticket} />
                                        ))
                                    }
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
            <CustomModal
                isOpen={showCancelEventModal}
                closeModal={()=> setShowCancelEventModal(false)}
            >
                <div>
                    <p className='text-center text-primary-dark font-medium'>
                        Are you sure you want to {singleEvent?.status != "cancelled" ? "cancel" : "restore"} this event?
                    </p>
                    <div className='md:flex gap-4 mt-4'>
                        <button 
                            className='px-4 w-full my-2 py-2 font-medium text-sm text-center text-primary-dark border-[1px] border-primary-dark rounded-full'
                            onClick={()=>{setShowCancelEventModal(false)}}
                        >
                            {singleEvent?.status != "cancelled" ? "No, Don't cancel" : "No, Don't restore"}
                        </button>
                        <button 
                            className={`px-4 w-full my-2 py-2 font-medium text-center text-white ${singleEvent?.status != "cancelled" ? "bg-red-500" : "bg-green-500"} rounded-full`}
                            onClick={toggleCancelEvent}
                        >
                            {singleEvent?.status != "cancelled" ? "Yes, Cancel" : "Yes, Restore"}
                        </button>
                    </div>
                </div>
            </CustomModal>
            <CustomModal
                isOpen={showDeleteEventModal}
                closeModal={()=>{setShowDeleteEventModal(false)}}
            >
                <div className='text-primary-dark'>
                    <p className='font-bold p-4'>Are you sure you want to delete this event</p>
                    <div className='font-medium'>What are your reasons?</div>
                    <div className='p-4'>
                        <div className='flex gap-2 font-regular'>
                            <input type='checkbox' />
                            <div>Event Was Never Real</div>
                        </div>
                        <div className='flex gap-2 font-regular'>
                            <input type='checkbox' />
                            <div>Event did not hold</div>
                        </div>
                    </div>
                    <div className='pt-4 flex flex-col md:flex-row gap-4 justify-center'>
                        <button className='py-2 px-4 font-medium text-primary-dark border-[1px] border-primary-dark rounded-full'>Cancel</button>
                        <button className='py-2 px-4 font-medium text-white bg-red-500 rounded-full'>Delet Event</button>
                    </div>
                </div>
            </CustomModal>
        </>
       
    )
}

function TicketStats({details}){
    let navigate = useNavigate()
    return(
        <div className='relative shadow-2xl border-[1px] border-primary-dark md:w-[45%] pb-2 my-4 md:my-0 rounded-[20px]'>
            <img src={details?.ticket_banner_url || Event1} className='rounded-t-[20px] w-[100%] h-[150px]' alt='ticket banner' />
            <div className='p-2 text-primary-dark'>
                <div className='flex justify-between p-2'>
                    <div className='flex flex-col items-center'>
                        <h3 className='font-regular text-sm text-center'>Ticket Type</h3> 
                        <div className='font-medium text-md text-center'>{details?.ticket_type}</div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h3 className='font-regular text-sm text-center'>Price </h3> 
                        <div className='font-medium text-md text-center'><NairaSymbol /> {details?.ticket_price}</div> 
                    </div>
                    <div className='flex flex-col items-center'>
                        <h6 className='font-regular text-sm text-center'>Quantity</h6> 
                        <div className='font-medium text-md text-center'>{details?.ticket_quantity || "no limit"}</div> 
                    </div>
                </div>
                <div className='flex justify-end'>
                    <div 
                        onClick={()=> navigate(`/dashboard/event/${details?.event_name}/organiser/view/ticket/${details?._id}`)} 
                        className='underline hover:text-primary-orange cursor-pointer'
                    >
                        View full details
                    </div>
                </div>
            </div>
        </div>
    )
}