import { Link } from 'react-router-dom'
import Event1 from '../images/Event-1.jpg'
import { IoCart } from 'react-icons/io5'


export default function Ticket(){
    return(
        <div className='md:w-[25%] border-2 border-primary-dark rounded-xl'>
            <img className='h-[100px] w-[100%] rounded-tl-xl rounded-tr-xl' src={Event1} alt='ticket banner' />
            <div className='p-2'>
                <div className='flex justify-between'>
                    <p> Vip</p>
                    <p><span>Price:</span> &#x20a6; 2000</p>
                </div>
                <div className='flex justify-between'>
                    <div>
                        <span>Quantity: </span>
                        <input className='w-10 border-2 border-black rounded-lg' type='number' min={1} />
                    </div>
                    <Link>
                        <div className='w-auto items-center text-sm flex bg-primary-orange p-1 rounded-full'>
                            Add to cart
                            <IoCart />
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}