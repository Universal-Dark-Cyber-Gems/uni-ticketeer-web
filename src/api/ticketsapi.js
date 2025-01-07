import axios from "axios"
import { baseApiUrlTest } from "../config"

async function getAllTicketsByEvent(event_id){
    try{
        let res = await axios.get(`${baseApiUrlTest}/tickets/${event_id}`)
        return {err: false, result: res}
    }catch(e){
        console.log(e)
        return {err: true, error: e}
    }
}

async function createTicketApi(payload, token){
    try{
        let res = await axios.post(`${baseApiUrlTest}/tickets/add`, payload, {
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