import { IoCartOutline, IoMenu, IoNotificationsOutline, IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUserProvider } from "../contexts/UserContext";
import useCart from "../hooks/useCart";
import { useCartProvider } from "../contexts/CartContext";

export default function DashHeader({title, dashnavtoggle}){
    let navigate = useNavigate()
    let userProvider = useUserProvider()
    let cartProvider = useCartProvider()

    console.log("cart", cartProvider?.cart)

    return(
        <div className="w-full flex justify-between items-center py-4">
            <h3 className="text-2xl font-bold text-primary-dark">{title}</h3>
            <div className="flex items-center w-[auto] justify-around">
                <div onClick={()=> navigate("/dashboard/cart")} className="relative mx-2 p-2">
                    {
                        cartProvider?.cart?.length > 0
                        &&
                        <div className="absolute bottom-[20px] left-[20px] w-[20px] h-[20px] flex justify-center items-center bg-red-500 rounded-full text-[10px] text-white text-center">
                            {cartProvider?.cart?.length}
                        </div>
                    }
                    <IoCartOutline className="cursor-pointer" size={25} />
                </div>
                <div className="mx-2 p-2">
                    <IoNotificationsOutline className=" cursor-pointer" size={25} />
                </div>
                
                <div className="w-[40px] h-[40px] bg-[#CCC] border-[1px] justify-center items-center hidden md:flex rounded-full">
                    <IoPersonOutline size={25} />
                </div>
                <div onClick={dashnavtoggle} className="w-[40px] h-[40px] md:hidden flex items-center p-2">
                    <IoMenu className=" cursor-pointer" size={25} />
                </div>
            </div>
        </div>
    )
}