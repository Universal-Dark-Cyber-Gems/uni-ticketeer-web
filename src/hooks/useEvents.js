import { useEffect, useState } from "react";
import { createEventApi, getAllEvents } from "../api/eventsapi";
import useLogin from "./useLogin";
import getErrorMsg from "../utils/getErrorMsg";

export default function useEvents(){
    const {accessToken} = useLogin()
    let [events, setEvents] = useState(null)
    let [eventsLoading, setEventsLoading] = useState(false)
    let [eventsStatus, setEventsStatus] = useState({error: false, success: false, message: ""})

    async function createEvent(payload){
        setEventsLoading(true)
        let response = await createEventApi(payload, accessToken)
        console.log("res from creating event", response)
        if(response.err){
            let errmsg = getErrorMsg(response)
            setEventsStatus({error: true, success: false, message: errmsg})
            setEventsLoading(false)
            return {success: false}
        }else{
            await getEvents()
            return {success: true}
        }
    }

    async function editEvent(){

    }

    async function getEvents(){
        setEventsLoading(true)
        let response = await getAllEvents()
        console.log(response)
        if(response.err){
            let errormsg = getErrorMsg(response)
            setEventsStatus({error: true, success: false, message: errormsg})
            setEventsLoading(false)
        }else{
            setEvents(response?.result?.data?.data)
            setEventsLoading(false)
        }
    }

    useEffect(()=>{
        getEvents()
    },[])

    return { events, eventsLoading, eventsStatus, createEvent, editEvent }
}