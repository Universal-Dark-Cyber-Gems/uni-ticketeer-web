import { Link, useOutletContext, useParams } from "react-router-dom"
import useTickets from "../../hooks/useTickets"
import DashHeader from "../../components/DashHeader"
import Line from "../../components/Line"
import QRCodeComponent from "../../components/QRCodeComponent"
import { IoCheckmark, IoClose, IoCopy, IoCopyOutline } from "react-icons/io5"
import { useState } from "react"

export default function ViewUserTicket(){
    let {id} = useParams()
    const {toggleMenu} = useOutletContext()
    let { purchasedTickets } = useTickets()
    let single_ticket = purchasedTickets?.find((ticket)=> ticket._id == id)

    let [copied, setCopied] = useState(false)

    function copyID(){
        navigator.clipboard.writeText(single_ticket?.ticket_id)
        setCopied(true)
        setTimeout(()=>{
            setCopied(false)
        }, 2000)
    }

    console.log("ticket id", id, single_ticket)
    return(
        <div>
            <DashHeader title={"My Tickets"} dashnavtoggle={toggleMenu} />
            <div className="md:w-[60%] m-auto pt-4 text-primary-dark mb-4">
                <div>
                    <h2 className="text-center text-2xl font-bold">{single_ticket?.ticket_info.event_name}</h2>
                    <div className="m-auto border-[1px] border-primary-dark mt-4 rounded-[10px]">
                        <img className="rounded-[9px]" src={single_ticket?.ticket_info.ticket_banner_url} />
                    </div>
                    <Line />
                    <div className="my-4">
                        <p className="text-center text-sm font-medium">Ticket ID</p>
                        <div className="flex justify-center" >
                            <p 
                                className="text-center text-3xl font-medium cursor-pointer"
                                onClick={copyID}
                            >
                                {single_ticket?.ticket_id}
                            </p>
                            {
                                copied
                                ?
                                <span className="text-[11px] flex items-center gap-[2px]"><IoCheckmark size={10} /> copied</span>
                                :
                                <span className="cursor-pointer" onClick={copyID}><IoCopyOutline /></span>
                            }
                        </div>
                    </div>
                    <Line />
                    <div className="md:flex md:justify-between">
                        <div className="gap-5 my-4 text-center">
                            <p className="text-sm font-medium">Type </p>
                            <p className="text-xl font-medium">{single_ticket?.ticket_info.ticket_type}</p>
                        </div>
                        <div className="gap-5 my-4 text-center">
                            <p className="text-sm font-medium">Ticket Price</p>
                            <p className="text-xl font-medium">{single_ticket?.ticket_info.ticket_price}</p>
                        </div>
                        <div className="gap-5 my-4 text-center">
                            <p className="text-sm font-medium">Quantity</p>
                            <p className="text-xl font-medium">Admits {single_ticket?.quantity}</p>
                        </div>
                    </div>
                    <Line />
                    <QRCodeComponent />
                    <Line />
                    <div className="flex gap-5 items-center mb-4">
                        <p className="font-medium">Checked in: </p>
                        {
                            single_ticket?.checked_in
                            ?
                            <p className="rounded-full bg-green-500 p-1">
                                <IoCheckmark color="white" />
                            </p>
                            :
                            <p className="rounded-full bg-red-500 p-1">
                                <IoClose color="white" />
                            </p>
                        }
                    </div>
                    <Line />
                    <p className="text-center mb-4">
                        <Link to={`/dashboard/event/tickets/${single_ticket?.ticket_info?.event_id}`} className="underline" >
                            view event details
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}