import { IoCalendar, IoLocationOutline, IoTimerOutline } from 'react-icons/io5'
import { useParams } from "react-router"
import dayjs from "dayjs"
import Event1 from '../../images/Event-1.jpg'
import { useEffect, useState, useContext } from 'react'
import useTickets from "../../hooks/useTickets"
import useEvents from "../../hooks/useEvents"
import { formatTime, formatDay, isEventPast, isUserOrganiser } from "../../global/helpers"
import { UserContext } from "../../contexts/userContext"

export default function ViewEventTickets(){
    let { id } = useParams()
    let user = useContext(UserContext)
    let { tickets, ticketsLoading, ticketStatus } = useTickets(id)
    let { events, eventsLoading, eventsStatus } = useEvents()
    let [ticketsToBuy, setTicketsToBuy] = useState([])
    let [singleEvent, setSingleEvent] = useState(null)

    function setTicketAmount(i, newAmount){
        ticketsToBuy[i].amount = newAmount
        setTicketsToBuy([...tickets])
    }

    
    useEffect(()=>{
        setSingleEvent(events?.find((event)=>event._id == id))
        setTicketsToBuy([{category: "Regular", price: 1000, amount: 0} , {category: "VIP", price: 3000, amount: 0}])
    },[events])

    return(
        <>
            <div>
                <div className='md:w-[50%] h-[45vh] m-auto border-4 border-primary-dark rounded-lg'>
                    <img src={singleEvent?.banner_image_url} alt='event banner' className='w-[100%] h-[100%] rounded-md' />
                </div>
                <div className='md:w-[70%] m-auto my-2 py-2'>
                    <h3 className='text-center text-lg font-medium'>{singleEvent?.title}</h3>
                    <p className='font-bold text-primary-dark'>About:</p>
                    <p>
                       {singleEvent?.additional_information}
                    </p>
                    <div className='flex justify-between my-2 py-2'>
                        <div>
                            <div className='flex items-center my-4'>
                                <div className="border-[1px] border-primary-dark p-[4px] rounded-md">
                                    <IoTimerOutline className="text-primary-dark" />
                                </div>
                                <p className="ml-2 text-[12px] font-bold">{singleEvent && formatTime(singleEvent?.start_time)}</p>
                            </div>
                            <div className='flex items-center my-4'>
                                <div className="border-[1px] border-primary-dark p-[4px] rounded-md">
                                    <IoCalendar className="text-primary-dark" />
                                </div>
                                <p className="ml-2 text-[12px] font-bold">{formatDay(singleEvent && formatDay(singleEvent?.start_date))}</p> 
                            </div>
                            <div className='flex items-center my-4'>
                            <div className="border-[1px] border-primary-dark p-[4px] rounded-md">
                                <IoLocationOutline className="text-primary-dark" />
                            </div>
                            <p className="ml-2 text-[12px] font-bold">{singleEvent?.venue}</p>
                            </div>
                        </div>
                        <div>
                            <p className='my-4'><b>Organisers:</b> Nonso Nsude live </p>
                            <p className='my-4'><b>Contacts:</b> </p>
                        </div>
                    </div>
                </div>
                {
                    isUserOrganiser(user)
                    ?
                    <div className='text-center'> Organiser Accounts cannot purchase Tickets </div>
                    :
                    isEventPast(singleEvent?.end_date || singleEvent?.start_date)
                    ?
                    <div className='text-center'> This Event has ended and you can no longer purchase tickets </div>
                    :
                    ticketsLoading
                    ?
                    <div className='text-center'>Loading ... </div>
                    :
                    ticketStatus.status === 404
                    ?
                    <div className='text-center'> No ticket(s) found for this event </div>
                    :
                    <div className='my-4'>
                        <h3 className='font-medium text-primary-dark text-center'>Choose Ticket</h3>
                        <div className='border-2 border-primary-dark rounded-md p-4 my-4'>
                            <div className='flex justify-between'>
                                <p className='w-[30%] font-bold' >Categories</p>
                                <p className='w-[30%] font-bold' >Price</p>
                                <p className='font-bold'>Amount</p>
                            </div>
                            {
                                ticketsToBuy.map((ticket, i)=><TicketDetailsTab key={i} index={i} category={ticket.category} price={ticket.price} amount={ticket.amount} setAmount={setTicketAmount} />)
                            }
                        </div>
                        <div className='bg-primary-dark w-[50%] md:w-[20%] p-2 text-primary-orange text-center rounded-full m-auto cursor-pointer'>Add to cart</div>
                    </div>
                }
            </div>

            <div>
                <h3>More Events Like This</h3>
                <div>
                    
                </div>
            </div>
        </>
    )
}

function TicketDetailsTab({category, index, price, amount = 0, setAmount}){

    function decreaseTicketAmount(){
        if(amount > 0){
            let newamount = amount - 1
            setAmount(index, newamount)
        }
    }

    function increaseTicketAmount(){
        let newamount = amount + 1
        setAmount(index, newamount)
    }

    function setAmountManually(e){
        console.log(e.target.value)
        setAmount(index, e.target.value)
    }
    return(
        <div className='flex justify-between my-2'>
            <p className='w-[30%]'>{category}</p>
            <p className='w-[30%]'>{price}</p>
            <div className='flex justify-between'>
                <div onClick={decreaseTicketAmount} className='flex justify-center items-center cursor-pointer rounded-md text-primary-dark border-[1px] border-primary-dark w-[20px] h-[20px] bg-primary-orange'>-</div>
                <input value={amount} onChange={setAmountManually} className='w-[20px] h-[20px] mx-2' />
                <div onClick={increaseTicketAmount} className='flex justify-center items-center cursor-pointer rounded-md text-primary-dark border-[1px] border-primary-dark w-[20px] h-[20px] bg-primary-orange'>+</div>
            </div>
        </div>
    )
}