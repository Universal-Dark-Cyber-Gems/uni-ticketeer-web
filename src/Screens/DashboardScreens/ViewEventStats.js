import { IoCalendar, IoEye, IoLocation, IoTime } from 'react-icons/io5'
import DashHeader from '../../components/DashHeader'
import Event1 from '../../images/Event-1.jpg'
import NairaSymbol from '../../components/NairaSymbol'
import ProgressBar from '../../components/ProgressBar'
import { useOutletContext } from 'react-router-dom'

export default function ViewEventStats(){
    const toggleMenu = useOutletContext()
    return(
        <>
            <DashHeader title={'Event Stats'} dashnavtoggle={toggleMenu} />
            <div className='py-4 my-4'>
            <div className='w-[90%] md:flex md:w-[80%] m-auto border-2 border-primary-dark rounded-xl'>
                <div className='md:w-[50%]'>
                    <img src={Event1} className='w-[100%] h-[50vh] rounded-tl-xl rounded-tr-xl md:rounded-bl-xl md:rounded-tr-none' alt='event banner' />
                </div>
                <div className='p-3 md:w-[50%] bg-white md:rounded-tr-xl rounded-br-xl rounded-bl-xl md:rounded-bl-0'>
                    <p className='capitalize text-lg font-bold text-primary-dark'>Lacasa de Papel</p>
                    <div className='flex justify-between py-2'>
                        <div className='flex items-center'>
                            <IoCalendar size={25}  />
                            <p className='text-lg font-medium text-primary-dark mx-2'>23rd august</p>
                        </div>
                        <div className='flex items-center'>
                            <IoTime size={25} />
                            <p className='text-lg font-medium text-primary-dark mx-2'>12pm</p>
                        </div>
                    </div>
                    <div className='py-2'>
                        <div className='flex items-center'>
                            <IoLocation size={25} />
                            <p className='text-lg font-medium text-primary-dark mx-2'>Pegasus ball room, any locale indicated</p>
                        </div>
                    </div>
                    <div className='py-2'>
                        <div className='flex items-center text-lg text-primary-dark'>
                            <p className='font-bold'>Tags: </p>
                            <p className='capitalize font-medium mx-2'>cinema, Club, Party</p>
                        </div>
                    </div>
                    <div className='py-2'>
                        <div className='flex items-center'>
                            <IoEye size={25} />
                            <p className='font-medium text-lg mx-2'>4</p>
                        </div>
                    </div>
                    <div className='py-2'>
                        <div className='flex items-center text-lg text-primary-dark'>
                            <p className='font-bold'>Ticketed:</p>
                            <p className='font-medium mx-2'>Yes</p>
                        </div>
                    </div>
                    <div>
                        <div className='flex items-center text-lg text-primary-dark'>
                            <p className='font-bold'>Total number of tickets sold:</p>
                            <p className='font-medium mx-2'>12</p>
                        </div>
                    </div>
                </div>
            </div>

            <h3 className='my-4 font-bold text-2xl text-primary-dark'>Tickets</h3>

            <TicketStats />
        </div>
        </>
       
    )
}

function TicketStats(){
    return(
        <div className='md:w-[28%] bg-white m-4'>
            <img src={Event1} className='h-[150px] w-[100%]' alt='ticket banner' />
            <div className='p-4 text-primary-dark'>
                <div className='flex justify-between'><h3 className='font-semibold'>Ticket Type:</h3> <div className='font-medium text-sm'>Regular</div></div>
                <div className='flex justify-between'><h3 className='font-semibold'>Price: </h3> <div className='font-medium text-sm'><NairaSymbol /> 1000</div> </div>
                <div className='flex justify-between'><h3 className='font-semibold'>Quantity:</h3> <div className='font-medium text-sm'>100</div> </div>
                <div className='flex justify-between'><h3 className='font-semibold'>Number Sold: </h3> <div className='font-medium text-sm'>9</div></div>
                <div className='flex flex-col justify-center items-center p-2'>
                    <h3 className='font-semibold my-2'>Availability</h3>
                    <ProgressBar total={100} sold={9} />
                    <p className='text-green-500 my-2 font-medium'>Still Available</p>
                </div>
                <div className='p-2'>
                    <h2 className='font-bold'>Restrictions</h2>
                    <div className='flex justify-between'><h3 className='font-semibold'>Age:</h3> <div className='font-medium text-sm'>Under 18</div></div>
                    <div className='flex justify-between'><h3 className='font-semibold'>Gender:</h3> <div className='font-medium text-sm'>male</div></div>
                </div>
            </div>
        </div>
    )
}