import { IoCalendar, IoEye, IoLocation, IoPricetag, IoStatsChart, IoTicket, IoTime } from 'react-icons/io5'
import Event1 from '../../images/Event-1.jpg'
import NairaSymbol from '../../components/NairaSymbol'
import ProgressBar from '../../components/ProgressBar'
import IconsWrap from '../../components/IconsWrap'
import Tooltip from '../../components/Tooltip'

export default function ViewEventStats(){
    return(
        <>
            <div className='py-4 my-4'>
            <div className='w-[90%] md:flex md:w-[50%] m-auto border-2 border-primary-dark rounded-xl'>
                <div className='md:w-[100%]'>
                    <img src={Event1} className='w-[100%] h-[50vh] rounded-tl-xl rounded-tr-xl md:rounded-bl-xl md:rounded-tr-none' alt='event banner' />
                </div>
            </div>

            <div>
                <div className='p-3 md:w-[70%] bg-white m-auto md:rounded-tr-xl rounded-br-xl rounded-bl-xl md:rounded-bl-0'>
                    <p className='capitalize text-lg font-bold text-center text-primary-dark'>Lacasa de Papel</p>
                    <div>
                        <h4 className='font-medium text-primary-dark'>About:</h4>
                        <p> 
                        Bole festival is a 2-day annual Rivers food festival that comes up in the city of Port-Harcourt. The event was founded by Kennedy Nonso Iwuh and its maiden edition was held in 2016 in Port-Harcourt city. Usually, attendees enjoy different delicacies of traditional Southern Nigerian food. However, the main meal of the festival is Port-Harcourt’s street food, Bole.
                        Bole is the traditional name of a popular street delicacy blend of plantain, potatoes, yam, and fresh fish. The delicacy is prepared the local way by roasting using firewood.
                        </p>
                    </div>

                    <div className='flex py-6'>
                        <div>
                            <div className='py-2'>
                                <div className='group relative flex items-center'>
                                    <Tooltip text="time" />
                                    <IconsWrap>
                                        <IoTime size={20} className='text-primary-dark' />
                                    </IconsWrap>
                                    <p className='text-md font-medium text-primary-dark mx-2'>12pm</p>
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='group relative flex items-center'>
                                    <Tooltip text="date" />
                                    <IconsWrap>
                                        <IoCalendar size={20} className='text-primary-dark'  />
                                    </IconsWrap>
                                    
                                    <p className='text-md font-medium text-primary-dark mx-2'>23rd august</p>
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='group relative flex items-center'>
                                    <Tooltip text="location" />
                                    <IconsWrap>
                                        <IoLocation size={20} className='text-primary-dark' />
                                    </IconsWrap>
                                
                                    <p className='text-md font-medium text-primary-dark mx-2'>Pegasus ball room, any locale indicated</p>
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='group relative flex items-center'>
                                    <Tooltip text="tags, categories" />
                                    <IconsWrap>
                                        <IoPricetag size={20} className='text-primary-dark' />
                                    </IconsWrap>
                                    <p className='capitalize font-medium text-primary-dark mx-2'>cinema, Club, Party</p>
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='group relative flex items-center'>
                                    <Tooltip text="views" />
                                    <IconsWrap>
                                        <IoEye size={20} className='text-primary-dark' />
                                    </IconsWrap>
                                    
                                    <p className='font-medium text-md text-primary-dark mx-2'>4</p>
                                </div>
                            </div>
                            <div className='py-2'>
                                <div className='group relative flex items-center'>
                                    <Tooltip text="ticketed" />
                                    <IconsWrap>
                                        <IoTicket size={20} className='text-primary-dark' />
                                    </IconsWrap>
                                    <p className='font-medium text-md text-primary-dark mx-2'>Yes</p>
                                </div>
                            </div>
                            <div>
                                <div className='group relative flex items-center'>
                                    <Tooltip text="number sold" />
                                    <IconsWrap>
                                        <IoStatsChart size={20} className='text-primary-dark' />
                                    </IconsWrap>
                                    
                                    <p className='font-medium text-primary-dark mx-2'>12</p>
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