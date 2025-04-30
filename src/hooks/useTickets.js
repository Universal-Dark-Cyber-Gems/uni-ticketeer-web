import { useState, useEffect } from "react";
import { createTicketApi, getAllTicketsByEvent } from "../api/ticketsapi";
import getErrorMsg from "../utils/getErrorMsg";
import useLogin from "./useLogin";
import { toast } from "react-toastify";

export default function useTickets(id){
    const { accessToken, logout } = useLogin()
    let [tickets, setTickets] = useState(null)
    let [ticketsLoading, setTicketsLoading] = useState(false)
    let [ticketStatus, setTicketStatus] = useState({error: false, success: false, message: ""})

 
    async function getTicketsByEventId(){
        setTicketsLoading(true)
        let response = await getAllTicketsByEvent(id)
        console.log(response)
        if(response.err){
            let errormsg = getErrorMsg(response)
            if(response.error?.response?.status === 401){
                logout()
                return
            }
            setTicketStatus({error: true, success: false, message: errormsg, status: response.error.response.status})
            toast.error(errormsg, {position: "top-center"})
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
            if(response.error?.response?.status === 401){
                logout()
                return
            }
            setTicketStatus({error: true, success: false, message: errormsg})
            toast.error(JSON.stringify(errormsg), {position: 'top-center'})
            setTicketsLoading(false)
            return { success: false }
        }else{
            setTicketStatus({error: false, success: true, message: "Ticket created successfully" })
            setTicketsLoading(false)
            return { success: true }
        }
    }

    useEffect(()=>{
        if(id){
            getTicketsByEventId()
        }
    }, [id])

    return { 
        tickets,
        ticketsLoading, 
        ticketStatus, 
        createTicket 
    }
}