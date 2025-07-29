import axios from "axios"
import { apiVersion, baseApiUrlTest } from "../config"

async function getAllTicketsByEvent(event_id){
    try{
        let res = await axios.get(`${baseApiUrlTest}${apiVersion}/tickets/events/${event_id}`)
        return {err: false, result: res}
    }catch(e){
        console.log(e)
        return {err: true, error: e}
    }
}

async function getPurchasedTicketsApi(token){
    try{
        let res = await axios.get(`${baseApiUrlTest}${apiVersion}/tickets/purchased/user`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "ticketeer-auth-token": token
            }
        })
        return {err: false, result: res}
    }catch(e){
        return { err: true, error: e}
    }
}

async function createTicketApi(payload, token){
    try{
        let res = await axios.post(`${baseApiUrlTest}${apiVersion}/tickets/`, payload, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ticketeer-auth-token": token
            }
        })
        return {err: false, result: res}
    }catch(e){
        console.log(e)
        return { err: true, error: e}
    }
}

async function editTicketApi(id, payload, token){
    try{
        let res = await axios.put(`${baseApiUrlTest}${apiVersion}/tickets/${id}`, payload, {
            headers: {
                "Accept": 'application/json',
                "Content-Type": "application/json",
                "ticketeer-auth-token": token
            }
        })
        return { err: false, result: res}
    }catch(e){
        return { err: true, error: e}
    }
}

async function getSingleTicketApi(ticketid, token){
    try{
        let res = await axios.get(`${baseApiUrlTest}${apiVersion}/tickets/${ticketid}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ticketeer-auth-token": token
            }
        })

        return{ err: false, result: res}
    }catch(e){
        return { err: true, error: e}
    }
}

async function deleteTicketApi(ticketid, token){
    try{
        let res = await axios.delete(`${baseApiUrlTest}${apiVersion}/tickets/${ticketid}`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ticketeer-auth-token": token
            }
        })
        
        return { err: false, result: res}
    }catch(e){
        return { err: true, error: e}
    }
}

async function addTicketToCartApi(ticketid, payload, token) {
    try{
        let res = await axios.post(`${baseApiUrlTest}${apiVersion}/tickets/generate/${ticketid}`, payload, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ticketeer-auth-token": token
            }
        } )

        return {err: false, result: res}
    }catch(err){
        return {err: true, error: err}
    }
}
export { getAllTicketsByEvent, getPurchasedTicketsApi, createTicketApi, editTicketApi, getSingleTicketApi, addTicketToCartApi, deleteTicketApi }