import { useOutletContext, useParams } from "react-router-dom"
import useTickets from "../../hooks/useTickets"
import DashHeader from "../../components/DashHeader"
import Line from "../../components/Line"
import QRCodeComponent from "../../components/QRCodeComponent"

export default function ViewUserTicket(){
    let {id} = useParams()
    const {toggleMenu} = useOutletContext()
    let { purchasedTickets } = useTickets()
    let sinigle_ticket = purchasedTickets?.find((ticket)=> ticket._id == id)

    console.log("ticket id", id, sinigle_ticket)
    return(
        <div>
            <DashHeader title={"My Tickets"} dashnavtoggle={toggleMenu} />
            <div className="md:w-[60%] m-auto pt-4 text-primary-dark">
                <div>
                    <h2 className="text-center text-2xl font-bold">{sinigle_ticket?.ticket_info.event_name}</h2>
                    <div className="m-auto border-[1px] border-primary-dark mt-4 rounded-[10px]">
                        <img className="rounded-[9px]" src={sinigle_ticket?.ticket_info.ticket_banner_url} />
                    </div>
                    <Line />
                    <div className="my-4">
                        <p className="text-center text-sm font-medium">Ticket ID</p>
                        <p className="text-center text-3xl font-medium">{sinigle_ticket?.ticket_id}</p>
                    </div>
                    <Line />
                    <div className="md:flex md:justify-between">
                        <div className="gap-5 my-4 text-center">
                            <p className="text-sm font-medium">Type </p>
                            <p className="text-xl font-medium">{sinigle_ticket?.ticket_info.ticket_type}</p>
                        </div>
                        <div className="gap-5 my-4 text-center">
                            <p className="text-sm font-medium">Ticket Price</p>
                            <p className="text-xl font-medium">{sinigle_ticket?.ticket_info.ticket_price}</p>
                        </div>
                        <div className="gap-5 my-4 text-center">
                            <p className="text-sm font-medium">Quantity</p>
                            <p className="text-xl font-medium">Admits {sinigle_ticket?.quantity}</p>
                        </div>
                    </div>
                    <Line />
                    <QRCodeComponent />
                    <Line />
                    <div>
                        <p>Checked in: </p>
                        <p>true</p>
                    </div>
                </div>
            </div>
        </div>
    )
}