import { Link } from 'react-router-dom'
import Event1 from '../images/Event-1.jpg'
import NairaSymbol from './NairaSymbol'

export default function DashTicket({details}){
    return(
        <Link to={`/dashboard/purchased-tickets/${details?._id}`} className='flex items-center rounded-xl justify-center md:w-[40%] h-[150px] relative border-[1px] border-primary-dark m-2'>
            <img 
                className='h-[100%] w-[100%] rounded-xl brightness-50 object-cover' 
                src={details?.ticket_info.ticket_banner_url} 
                alt='ticket banner' 
            />
            <div className='p-2 border-l-[1px] rounded-r-xl border-dashed border-primary-dark flex flex-col justify-between items-center absolute h-[100%] bg-gradient-to-r from-white/70 to-white/90 right-0 bg-transparent'>
                <p className='text-lg text-primary-dark font-medium'> {details?.ticket_info.ticket_type}</p>
                <p className='text-primary-dark font-medium'> <NairaSymbol /> {details?.ticket_info.ticket_price}</p>
                <p className='text-primary-dark font-medium'> {details?.ticket_id}</p>
            </div>
        </Link>
    )
}