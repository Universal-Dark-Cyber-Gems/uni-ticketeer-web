import Event1 from '../images/Event-1.jpg'
import NairaSymbol from './NairaSymbol'

export default function DashTicket(){
    return(
        <div className='md:w-[25%] border-2 border-primary-dark rounded-xl m-2'>
            <img className='h-[100px] w-[100%] rounded-tl-xl object-cover rounded-tr-xl' src={Event1} alt='ticket banner' />
            <div className='p-2 bg-white rounded-bl-xl rounded-br-xl'>
                <div className='flex justify-between'>
                    <p className='text-lg text-primary-dark font-medium'> Vip</p>
                    <p className='text-primary-dark font-medium'> <NairaSymbol /> 2000</p>
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