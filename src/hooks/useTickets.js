import { useState, useEffect } from "react";
import { createTicketApi, getAllTicketsByEvent } from "../api/ticketsapi";
import getErrorMsg from "../utils/getErrorMsg";
import useLogin from "./useLogin";

export default function useTickets(){
    const { accessToken } = useLogin()
    let [tickets, setTickets] = useState(null)
    let [ticketsLoading, setTicketsLoading] = useState(false)
    let [ticketStatus, setTicketStatus] = useState({error: false, success: false, message: ""})

 
    async function getTicketsByEventId(eventId){
        setTicketsLoading(true)
        let response = await getAllTicketsByEvent(eventId)
        console.log(response)
        if(response.err){
            let errormsg = getErrorMsg(response)
            setTicketStatus({error: true, success: false, message: errormsg, status: response.error.response.status})
            setTicketsLoading(false)
        }else{
            setTickets(response.result?.data?.data)
            setTicketsLoading(false)
        }
    }

    async function createTicket(payload){
        setTicketsLoading(true)
        let response = await createTicketApi(payload, accessToken)
        console.log("create ticket response", response)
        if(response.err){
            let errormsg = getErrorMsg(response)
            setTicketStatus({error: true, success: false, message: errormsg})
            setTicketsLoading(false)
            return { success: false }
        }else{
            setTicketStatus({error: false, success: true, message: "Ticket created successfully" })
            setTicketsLoading(false)
            return { success: true }
        }
    }
    return { tickets, createTicket, getTicketsByEventId, ticketsLoading, ticketStatus }
}