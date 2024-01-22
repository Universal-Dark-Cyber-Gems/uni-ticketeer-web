import Event1 from '../images/Event-1.jpg'
import NairaSymbol from './NairaSymbol'

export default function DashTicket(){
    return(
        <div className='flex items-center justify-center md:w-[25%] h-[10%] relative border-2 border-primary-dark rounded-xl m-2'>
            <img className='h-[100%] w-[100%] brightness-50 saturate-50 rounded-xl object-cover rounded-tr-xl' src={Event1} alt='ticket banner' />
            <div className='p-2 absolute w-[95%] bg-gradient-to-t from-white/75 to-white/30 bottom-2 bg-transparent rounded-bl-xl rounded-br-xl'>
                <div className='flex justify-between'>
                    <p className='text-lg text-primary-orange font-medium'> Vip</p>
                    <p className='text-primary-orange font-medium'> <NairaSymbol /> 2000</p>
                </div>
                <div className='my-2 flex justify-between'>
                    <span className='font-bold'>Ticket Id: </span>
                    <p className='text-primary-dark font-medium'> B3s98</p>
                </div>
                <div className='my-2 flex justify-between'>
                    <span className='font-bold'>Purchase Date: </span>
                    <p className='text-primary-dark font-medium'> 23 june</p>
                </div>
                <div className='my-2 flex justify-between'>
                    <span className='font-bold'>Checked in:</span> 
                    <p className='text-primary-dark font-medium'>Yes</p>
                </div>
            </div>
        </div>
    )
}