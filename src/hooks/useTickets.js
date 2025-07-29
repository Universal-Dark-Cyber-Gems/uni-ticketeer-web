import { useState, useEffect } from "react";
import { addTicketToCartApi, createTicketApi, deleteTicketApi, editTicketApi, getAllTicketsByEvent, getPurchasedTicketsApi, getSingleTicketApi } from "../api/ticketsapi";
import getErrorMsg from "../utils/getErrorMsg";
import useLogin from "./useLogin";
import { toast } from "react-toastify";
import handleErrorCase from "../utils/handleErrorCase";
import { useCartProvider } from "../contexts/CartContext";

export default function useTickets(id){
    const { accessToken, logout } = useLogin()
    let [tickets, setTickets] = useState(null)
    let [purchasedTickets, setPurchasedTickets] = useState(null)
    let [ticketsLoading, setTicketsLoading] = useState(false)
    let [ticketStatus, setTicketStatus] = useState({error: false, success: false, message: ""})
    let [purchasedTicketsStatus, setPurchasedTicketsStatus] = useState({error: false, success: false, message: "" })

 
    async function getTicketsByEventId(){
        setTicketsLoading(true)
        let response = await getAllTicketsByEvent(id)
        console.log(response)
        if(response?.err){
            handleErrorCase(response, logout, setTicketStatus, setTicketsLoading, true)
        }else{
            setTickets(response?.result?.data?.data)
            setTicketsLoading(false)
        }
    }

    async function getPurchasedTickets(){
        setTicketsLoading(true)
        let response = await getPurchasedTicketsApi(accessToken)
        if(response.err){
            handleErrorCase(response, logout, setTicketsLoading, setPurchasedTicketsStatus)
        }else{
            setPurchasedTickets(response?.result?.data?.data)
            setTicketsLoading(false)
        }
    }

    async function createTicket(payload){
        setTicketsLoading(true)
        let response = await createTicketApi(payload, accessToken)
        console.log("create ticket response", response)
        if(response?.err){
            let errormsg = getErrorMsg(response)
            if(response?.error?.response?.status === 401){
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

    async function editTicket(id, payload){
        setTicketsLoading(true)
        let response = await editTicketApi(id, payload, accessToken)
        console.log("edit ticket response", response)
        if(response?.err){
            let errormsg = getErrorMsg(response)
            if(response?.error?.response?.status === 401){
                logout()
                return
            }
            setTicketStatus({error: true, success: false, message: errormsg})
            toast.error(JSON.stringify(errormsg), {position: 'top-center'})
            setTicketsLoading(false)
            return { success: false }
        }else{
            setTicketsLoading(false)
            setTicketStatus({error: false, success: true, message: "Ticket created successfully" })
            return { success: true }
        }
    }

    async function getSingleTicket(ticketid){
        setTicketsLoading(true)
        let result = await getSingleTicketApi(ticketid, accessToken)
        console.log("result from getting single ticket", result)
        if(result?.err){
            let errormsg = getErrorMsg(result)
            if(result?.error?.response?.status === 401){
                logout()
                return
            }
            toast.error(JSON.stringify(errormsg), {position: 'top-center'})
            setTicketsLoading(false)
            return {success: false}
        }else{
            setTicketsLoading(false)
            return { success: true, ticket: result.result.data.data }
        }
    }

    async function deleteTicket(ticketid){
        setTicketsLoading(true)
        let result = await deleteTicketApi(ticketid, accessToken)
        console.log("result from deleting single ticket", result)
        if(result?.err){
            let errormsg = getErrorMsg(result)
            if(result?.error?.response?.status === 401){
                logout()
                return
            }
            toast.error(JSON.stringify(errormsg), {position: 'top-center'})
            setTicketsLoading(false)
            return { success: false}
        }else{
            setTicketsLoading(false)
            return { success: true, ticket: result.result.data.data}
        }
    }

    async function addTicketToCart(ticketid, payload){
        setTicketsLoading(true)
        let result = await addTicketToCartApi(ticketid, payload, accessToken)
        if(result?.err){
            handleErrorCase(result, logout,setTicketsLoading, setTicketStatus)
            toast.error(JSON.stringify(errormsg), {position: 'top-center'})
            return { success: false}
        }else{
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
        purchasedTickets,
        ticketsLoading, 
        ticketStatus, 
        createTicket,
        editTicket,
        getSingleTicket,
        getPurchasedTickets,
        deleteTicket,
        addTicketToCart
    }
}