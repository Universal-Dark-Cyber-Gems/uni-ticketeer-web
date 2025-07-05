import { useNavigate, useParams } from "react-router-dom"
import useTickets from "../../hooks/useTickets"
import { useEffect, useState } from "react"
import CustomLoader from "../../components/CustomLoader"
import { useScreenLoaderProvider } from "../../contexts/ScreenLoaderContext"
import IconsWrap from "../../components/IconsWrap"
import { IoPricetag, IoPricetagsOutline, IoTicket, IoTicketOutline } from "react-icons/io5"
import Tooltip from "../../components/Tooltip"
import NairaSymbol from "../../components/NairaSymbol"
import Line from "../../components/Line"
import { PiConfetti } from "react-icons/pi"
import ProgressBar from "../../components/ProgressBar"
import CustomModal from "../../components/CustomModal"
import { toast } from "react-toastify"

export default function ViewOrganiserTicket(){
    const navigate = useNavigate()
    let {eventname, ticketid} = useParams()
    let { getSingleTicket, deleteTicket, ticketsLoading } = useTickets()

    let [ticketDetails, setTicketDetails] = useState(null)
    let [showDeleteModal, setShowDeleteModal] = useState(false)
    

    async function onConfirmDeleteTicket(){
        let res = await deleteTicket(ticketid)
        if(res.success){
            toast.success("Ticket Deleted Successfully", {position: 'top-center'})
            setTimeout(()=>{
                navigate("/dashboard")
            }, 100)
            
        }
    }

    useEffect(()=>{
        getSingleTicket(ticketid).then((res)=>{
            setTicketDetails(res.ticket)
        })
    }, [])

    useScreenLoaderProvider(ticketsLoading, "loading ticket details...")

    return(
        <div>
            <div className="md:w-[60%] text-primary-dark p-4 m-auto border-[1px] border-primary-dark rounded-2xl">
                <div className="md:flex gap-5">
                    <img src={ticketDetails?.ticket_banner_url} className="md:w-[50%] rounded-md" />
                    <div className="flex py-4 gap-2 flex-col justify-between">
                        <div className="group relative flex items-center gap-2 font-medium">
                            <Tooltip text={"Event"} />
                            <IconsWrap><PiConfetti /></IconsWrap> {eventname}
                        </div>
                        <div className="group relative flex items-center gap-2 font-medium">
                            <Tooltip text={"Ticket Type"} />
                            <IconsWrap><IoTicketOutline /></IconsWrap> {ticketDetails?.ticket_type}
                        </div>
                        <div className="group relative flex items-center gap-2 font-medium">
                            <Tooltip text={"Price"} />
                            <IconsWrap><IoPricetagsOutline /></IconsWrap> <NairaSymbol /> {ticketDetails?.ticket_price}
                        </div>
                    </div>
                </div>
                <Line />
                <div className="md:flex items-center justify-between py-2">
                    <div>
                        <div className="font-bold my-4">
                            <span className="font-medium">Ticket Quantity:</span> {ticketDetails?.ticket_quantity || "Unlimited" }
                        </div>
                        <div className="font-bold my-4">
                            <span className="font-medium">Number Sold:</span> {ticketDetails?.quantity_sold}
                        </div>
                    </div>
                    <div className="md:w-[50%] h-[100%]">
                        <div className="font-medium text-center mb-4">Sales Progress</div>
                        {
                            ticketDetails?.ticket_quantity > 0
                            ?
                            <ProgressBar sold={ticketDetails?.quantity_sold} total={ticketDetails?.ticket_quantity} />
                            :
                            <div className="text-[12px] text-center">
                                progress bar can't be shown for unlimited amounts of ticket
                            </div>
                        }
                    </div>
                </div>
                <Line />
                <div>
                    <h3 className="font-bold text-lg">Restrictions</h3>
                    {
                        ticketDetails?.restrictions
                        ?
                        <div>
                            {
                                ticketDetails?.restrictions?.age
                                &&
                                <div className="font-bold my-4">
                                    <span className="font-medium">Restricted Age:</span> {ticketDetails?.restrictions?.age?.range} {ticketDetails?.restrictions?.age?.benchmark}
                                </div>
                            }
                            {
                                ticketDetails?.restrictions?.gender
                                &&
                                <div className="font-bold my-4">
                                    <span className="font-medium">Restricted Gender:</span> {ticketDetails?.restrictions?.gender}
                                </div>
                            }
                        </div>
                        :
                        <div className="p-4">
                            <p className="text-center">This ticket has no restrictions</p>
                        </div>
                    }
                </div>
                <Line />
                <div className="md:flex gap-2 justify-center">
                    <div 
                        onClick={()=> navigate(`/dashboard/event/${eventname}/tickets/edit/${ticketDetails?.event_id}/${ticketDetails?._id}`)} 
                        className='text-center border-[1px] border-primary-dark cursor-pointer hover:shadow-xl text-primary-dark font-medium my-2 py-2 px-4 rounded-full'
                    >
                        Edit Ticket
                    </div>
                    <div 
                        onClick={()=> setShowDeleteModal(true)} 
                        className="text-center border-[1px] border-red-500 cursor-pointer hover:shadow-xl text-red-500 font-medium my-2 py-2 px-4 rounded-full"
                    >
                        Delete Ticket
                    </div>
                </div>
            </div>
            <CustomModal isOpen={showDeleteModal} closeModal={()=>{setShowDeleteModal(false)}}>
                    <div>
                        <p>Are you sure you want to delete this ticket?</p>
                        <div className='flex gap-4 justify-center pt-4'>
                            <div 
                                onClick={()=>{setShowDeleteModal(false)}}
                                className='cursor-pointer border-[1px] border-primary-dark text-primary-dark rounded-full px-4 py-2'
                            >
                                Cancel
                            </div>
                            <div onClick={onConfirmDeleteTicket} className='cursor-pointer text-white bg-red-500 px-4 py-2 rounded-full'>
                                Yes, Delete
                            </div>
                        </div>
                    </div>
            </CustomModal>
        </div>
    )
}