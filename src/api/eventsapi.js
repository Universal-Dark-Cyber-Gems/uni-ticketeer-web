import axios from "axios";
import { baseApiUrlTest } from "../config";

async function getAllEvents(){
    try{
        let res = await axios.get(`${baseApiUrlTest}/events`)
        return {err: false, result: res}
    }catch(err){
        return {err: true, error: err}
    }
}

async function createEventApi(payload, token){
    try{
        let res = await axios.post(`${baseApiUrlTest}/events/add`, payload, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ticketeer-auth-token": token
            }
        })
        return {err: false, result: res}
    }catch(err){
        return {err: true, error: err}
    }
}

export { getAllEvents, createEventApi }