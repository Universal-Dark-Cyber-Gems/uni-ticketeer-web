import { useState } from "react";
import { getAllTicketsByEvent } from "../api/ticketsapi";
import getErrorMsg from "../utils/getErrorMsg";

export default function useTickets(){
    let [tickets, setTickets] = useState(null)
    let [ticketsLoading, setTicketsLoading] = useState(false)
    let [ticketStatus, setTicketStatus] = useState({error: false, success: false, message: ""})

    async function getTickets(eventId){
        setTicketsLoading(true)
        let response = await getAllTicketsByEvent(eventId)
        console.log(response)
        if(response.err){
            let errormsg = getErrorMsg(response)
            setTicketStatus({error: true, success: false, message: errormsg})
            setTicketsLoading(false)
        }
    }

    return { getTickets, ticketsLoading, ticketStatus }
}