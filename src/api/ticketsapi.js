import axios from "axios"
import { apiVersion, baseApiUrlTest } from "../config"

async function getAllTicketsByEvent(event_id){
    try{
        let res = await axios.get(`${baseApiUrlTest}${apiVersion}/tickets/${event_id}`)
        return {err: false, result: res}
    }catch(e){
        console.log(e)
        return {err: true, error: e}
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
export { getAllTicketsByEvent, createTicketApi }