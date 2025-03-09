import axios from "axios";
import { apiVersion, baseApiUrlTest } from "../config";

async function getAllEvents(){
    try{
        let res = await axios.get(`${baseApiUrlTest}${apiVersion}/events`)
        return {err: false, result: res}
    }catch(err){
        return {err: true, error: err}
    }
}

async function getSingleEvent(id){
    try{
        let res = await axios.get(`${baseApiUrlTest}${apiVersion}/events/${id}`)
        return {err: false, result: res}
    }catch(err){
        return {err: true, error: err}
    }
}

async function createEventApi(payload, token){
    try{
        let res = await axios.post(`${baseApiUrlTest}${apiVersion}/events`, payload, {
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

export { getAllEvents, getSingleEvent, createEventApi }