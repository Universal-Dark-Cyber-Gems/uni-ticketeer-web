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
import { formatDay, formatTime } from '../../global/helpers'

export default function ViewEventStats(){
    const navigate = useNavigate()
    const { id } = useParams()
    let user = useContext(UserContext)
    let { tickets, ticketStatus, ticketsLoading } = useTickets(id)
    let { events, getSingleEvent, eventsLoading, eventsStatus } = useEvents()

    let [singleEvent, setSingleEvent] = useState(null)

    useEffect(()=>{
        setSingleEvent(getSingleEvent(id))
    }, [events])

    console.log("tickets inside event stats", tickets)

    return(
        <>
            <div className='py-4 my-4'>
            <div className='w-[90%] relative md:flex m-auto border-2 border-primary-dark rounded-xl'>
                <div onClick={()=>{ navigate(`/dashboard/event/edit/${id}`) }} className='absolute cursor-pointer shadow-lg right-2 top-2 bg-white flex w-[30px] h-[30px] rounded-full justify-center items-center'>
                    <IoPencil />
                </div>
                <div className='md:w-[50%] md:h-[100%]'>
                    <img src={singleEvent?.banner_image_url} className='w-[100%] h-[100%] rounded-tl-xl rounded-tr-xl md:rounded-bl-xl md:rounded-tr-none' alt='event banner' />
                </div>
                <div>
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

                        <div className='flex py-6'>
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
                                        <Tooltip text="date" />
                                        <IconsWrap>
                                            <IoCalendar className='text-primary-dark'  />
                                        </IconsWrap>
                                        
                                        <p className='text-sm font-medium text-primary-dark mx-2'>{formatDay(singleEvent?.start_date)}</p>
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
                                <div className='py-2'>
                                    <div className='group relative flex items-center'>
                                        <Tooltip text="tags, categories" />
                                        <IconsWrap>
                                            <IoPricetag className='text-primary-dark' />
                                        </IconsWrap>
                                        <p className='capitalize text-sm font-medium text-primary-dark mx-2'>{singleEvent?.category}</p>
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
                                <div className='py-2'>
                                    <div className='group relative flex items-center'>
                                        <Tooltip text="ticketed" />
                                        <IconsWrap>
                                            <IoTicket className='text-primary-dark' />
                                        </IconsWrap>
                                        <p className='font-medium text-sm text-primary-dark mx-2'>{singleEvent?.is_ticketed ? "Yes" : "No"}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className='group relative flex items-center'>
                                        <Tooltip text="number sold" />
                                        <IconsWrap>
                                            <IoStatsChart className='text-primary-dark' />
                                        </IconsWrap>
                                        
                                        <p className='font-medium text-sm text-primary-dark mx-2'>12</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <p className='text-primary-dark'><b>Organiser: </b> Name of organiser</p>
                                </div>
                                <div>

                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <h3 className='my-4 font-bold text-2xl text-primary-dark'>Tickets</h3>
            <div className='flex pt-16'>
                {
                    tickets?.map((ticket)=>(
                        <TicketStats details={ticket} />
                    ))
                }
            </div>                
        </div>
        </>
       
    )
}

function TicketStats({details}){
    let navigate = useNavigate()
    return(
        <div className='relative shadow-2xl border-[2px] border-primary-dark md:w-[45%] pt-[70px] pb-4 m-4 rounded-[20px]'>
            <img src={details?.ticket_banner_url || Event1} className='rounded-[10px] shadow-xl shadow-xl/30 absolute top-[-75px] left-5 h-[150px] w-[90%]' alt='ticket banner' />
            <div className='p-4 text-primary-dark'>
                <div className='flex justify-between p-6'>
                    <div className='flex flex-col items-center'>
                        <h3 className='font-regular text-md text-center'>Ticket Type</h3> 
                        <div className='font-bold text-xl text-center'>{details?.ticket_type}</div>
                    </div>
                    <div className='flex flex-col items-center'>
                        <h3 className='font-regular text-md text-center'>Price </h3> 
                        <div className='font-bold text-xl text-center'><NairaSymbol /> {details?.ticket_price}</div> 
                    </div>
                    <div className='flex flex-col items-center'>
                        <h6 className='font-regular text-md text-center'>Quantity</h6> 
                        <div className='font-bold text-xl text-center'>{details?.ticket_quantitiy || "no limit"}</div> 
                    </div>
                </div>
                <div className='flex text-center text-md justify-center items-center gap-2'><h3 className='font-semibold'>Sold: </h3> <div className='font-medium'>{details.quantity_sold}</div></div>
                <div className='flex flex-col justify-center items-center p-2'>
                    {
                        details?.ticket_quantity
                        &&
                        <ProgressBar total={details?.ticket_quantity} sold={details?.quantity_sold} />
                    }
                </div>
                {/* <div className='p-2'>
                    <h2 className='font-bold'>Restrictions</h2>
                    <div className='flex justify-between'><h3 className='font-semibold'>Age:</h3> <div className='font-medium text-sm'>Under 18</div></div>
                    <div className='flex justify-between'><h3 className='font-semibold'>Gender:</h3> <div className='font-medium text-sm'>male</div></div>
                </div> */}
                <div className='flex justify-between'>
                    <div onClick={()=> navigate(`/dashboard/event/${details?.event_name}/tickets/edit/${details?.event_id}/${details?._id}`)} className='bg-primary-dark cursor-pointer hover:shadow-xl text-primary-orange font-medium pt-2 pb-2 pr-4 pl-4 rounded-full'>
                        Edit Ticket
                    </div>
                    <div className='bg-primary-dark cursor-pointer hover:shadow-xl text-primary-orange font-medium pt-2 pb-2 pr-4 pl-4 rounded-full'>
                        Delete Ticket
                    </div>
                </div>
            </div>
        </div>
    )
}