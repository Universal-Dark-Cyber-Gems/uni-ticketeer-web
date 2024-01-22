import { IoCalendar, IoLocationOutline, IoTimerOutline } from 'react-icons/io5'
import Event1 from '../../images/Event-1.jpg'
import { useEffect, useState } from 'react'

export default function ViewEventTickets(){
    let [tickets, setTickets] = useState([])

    function setTicketAmount(i, newAmount){
        tickets[i].amount = newAmount
        setTickets([...tickets])
    }

    useEffect(()=>{
        if(tickets.length === 0){
            setTickets([{category: "Regular", price: 1000, amount: 0} , {category: "VIP", price: 3000, amount: 0}])
        }
    },[tickets])

    return(
        <>
            <div>
                <div className='md:w-[50%] h-[45vh] m-auto border-4 border-primary-dark rounded-lg'>
                    <img src={Event1} alt='event banner' className='w-[100%] h-[100%] rounded-md' />
                </div>
                <div className='md:w-[70%] m-auto my-2 py-2'>
                    <h3 className='text-center text-lg font-medium'>Lacasa De Papel</h3>
                    <p className='font-bold text-primary-dark'>About:</p>
                    <p>
                        Bole festival is a 2-day annual Rivers food festival that comes up in the city of Port-Harcourt. The event was founded by Kennedy Nonso Iwuh and its maiden edition was held in 2016 in Port-Harcourt city. Usually, attendees enjoy different delicacies of traditional Southern Nigerian food. However, the main meal of the festival is Port-Harcourt’s street food, Bole.
                        Bole is the traditional name of a popular street delicacy blend of plantain, potatoes, yam, and fresh fish. The delicacy is prepared the local way by roasting using firewood.
                    </p>
                    <div className='flex justify-between my-2 py-2'>
                        <div>
                            <div className='flex items-center my-4'>
                                <div className="border-[1px] border-primary-dark p-[4px] rounded-md">
                                    <IoTimerOutline className="text-primary-dark" />
                                </div>
                                <p className="ml-2 text-[12px] font-bold">3pm</p>
                            </div>
                            <div className='flex items-center my-4'>
                                <div className="border-[1px] border-primary-dark p-[4px] rounded-md">
                                    <IoCalendar className="text-primary-dark" />
                                </div>
                                <p className="ml-2 text-[12px] font-bold">2nd July</p> 
                            </div>
                            <div className='flex items-center my-4'>
                            <div className="border-[1px] border-primary-dark p-[4px] rounded-md">
                                <IoLocationOutline className="text-primary-dark" />
                            </div>
                            <p className="ml-2 text-[12px] font-bold">pegasus ball room </p>
                            </div>
                        </div>
                        <div>
                            <p className='my-4'><b>Organisers:</b> Nonso Nsude live </p>
                            <p className='my-4'><b>Contacts:</b> </p>
                        </div>
                    </div>
                </div>
                <div className='my-4'>
                    <h3 className='font-medium text-primary-dark text-center'>Choose Ticket</h3>
                    <div className='border-2 border-primary-dark rounded-md p-4 my-4'>
                        <div className='flex justify-between'>
                            <p className='w-[30%]' >Categories</p>
                            <p className='w-[30%]' >Price</p>
                            <p>Amount</p>
                        </div>
                        {
                            tickets.length > 0
                            ?
                            tickets.map((ticket, i)=><TicketDetailsTab key={i} index={i} category={ticket.category} price={ticket.price} amount={ticket.amount} setAmount={setTicketAmount} />)
                            :
                            <p className='text-center text-primary-dark my-4 font-medium'>No tickets to show</p>
                        }
                    </div>
                    <div className='bg-primary-dark w-[50%] md:w-[20%] p-2 text-primary-orange text-center rounded-full m-auto'>Add to cart</div>
                </div>
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