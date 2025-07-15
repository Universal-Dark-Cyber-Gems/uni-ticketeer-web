import { Link, useOutletContext } from "react-router-dom";
import DashHeader from "../../components/DashHeader";
import Line from "../../components/Line";
import CustomLoader from "../../components/CustomLoader";
import { useCartProvider } from "../../contexts/CartContext";
import NairaSymbol from "../../components/NairaSymbol";
import { IoTrashBinOutline } from "react-icons/io5"

export default function Cart(){
    let {toggleMenu} = useOutletContext()
    let { cart, cartLoading } = useCartProvider()

    return(
        <div>
            <DashHeader title={'Cart'} dashnavtoggle={toggleMenu} />
            <div className="md:flex justify-between text-primary-dark gap-4">
                <div className="bg-white p-4 w-full md:w-[75%] rounded-[10px]">
                    <h3 className='font-bold text-lg'>{`Cart(${cart?.length})`}</h3>
                    <Line />
                    {
                        cartLoading
                        ?
                        <CustomLoader />
                        :
                        !cart || cart?.length == 0
                        ?
                        <div className="p-4">
                            <p className="text-center">Cart is Empty</p>
                            <Link to={"/dashboard/events"}>
                                <p className="text-primary-orange text-center">Get Tickets</p>
                            </Link>
                        </div>
                        :
                        <div>
                            {
                                cart?.map((c, i)=>(
                                    <div key={`cart${i+1}`}>
                                        <div className="flex gap-4 relative">
                                            <div className="absolute cursor-pointer right-0 p-2 rounded-full bg-primary-dark">
                                                <IoTrashBinOutline className="text-primary-orange" />
                                            </div>
                                            <img 
                                                src={c?.ticket_info?.ticket_banner_url} 
                                                className="w-[30%]"
                                            />
                                            <div className="font-medium w-full">
                                                <p>{c.ticket_info?.event_name}</p>
                                                <p>{c.quantity}x {c.ticket_info?.ticket_type}</p>
                                                <p className="font-bold text-lg"><NairaSymbol /> {c.final_price} </p>
                                                <div className="p-2 w-full text-primary-orange text-xl text-right">
                                                    <NairaSymbol />
                                                    {`${c.final_price * c.quantity}`}
                                                </div>
                                            </div>
                                        </div>
                                        {
                                            i !== cart.length - 1
                                            &&
                                            <Line />
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    }
                </div>
                <div className="bg-white h-auto p-4 w-full md:w-[25%] rounded-[10px]">
                    <div className="font-medium text-lg">Summary</div>
                </div>
            </div>
        </div>
    )
}