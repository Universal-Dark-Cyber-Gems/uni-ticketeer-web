import { useState, useEffect } from "react";
import { getAllTicketsByEvent } from "../api/ticketsapi";
import getErrorMsg from "../utils/getErrorMsg";

export default function useTickets(eventId){
    let [tickets, setTickets] = useState(null)
    let [ticketsLoading, setTicketsLoading] = useState(false)
    let [ticketStatus, setTicketStatus] = useState({error: false, success: false, message: ""})

    useEffect(()=>{
        async function init (){
            await getTicketsByEventId(eventId)
        }
        init()
    }, [])

    async function getTicketsByEventId(eventId){
        setTicketsLoading(true)
        let response = await getAllTicketsByEvent(eventId)
        console.log(response)
        if(response.err){
            let errormsg = getErrorMsg(response)
            setTicketStatus({error: true, success: false, message: errormsg, status: response.error.response.status})
            setTicketsLoading(false)
        }
    }

    return { tickets, ticketsLoading, ticketStatus }
}