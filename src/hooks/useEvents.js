import { useEffect, useState } from "react";
import { createEventApi, editEventApi, getAllEvents, getSingleEvent } from "../api/eventsapi";
import useLogin from "./useLogin";
import getErrorMsg from "../utils/getErrorMsg";
import { toast } from "react-toastify";
import handleErrorCase from "../utils/handleErrorCase";

export default function useEvents(){
    const {accessToken, logout} = useLogin()
    let [events, setEvents] = useState(null)
    let [eventsLoading, setEventsLoading] = useState(false)
    let [eventsStatus, setEventsStatus] = useState({error: false, success: false, message: ""})

    async function createEvent(payload){
        setEventsLoading(true)
        let response = await createEventApi(payload, accessToken)
        console.log("res from creating event", response)
        if(response.err){
            let errmsg = getErrorMsg(response)
            if(response.error?.response?.status === 401){
                logout()
                return
            }
            setEventsStatus({error: true, success: false, message: errmsg})
            toast.error(errmsg, {position: "top-center"})
            setEventsLoading(false)
            return {success: false}
        }else{
            await getEvents()
            return {success: true, eventId: response.result.data?.data?._id}
        }
    }

    async function editEvent(id, payload){
        setEventsLoading(true)
        let response = await editEventApi(id, payload, accessToken)
        console.log("res from editing event", response)
        if(response?.err){
            handleErrorCase(response, logout, setEventsStatus, setEventsLoading, true)
            return {success: false}
        }else{
            await getEvents()
            return {success: true, eventId: response.result.data?.data?._id}
        }
    }

    async function getEvents(){
        setEventsLoading(true)
        let response = await getAllEvents()
        console.log(response)
        if(response.err){
            let errormsg = getErrorMsg(response)
            if(response.error?.response?.status === 401){
                logout()
                return
            }
            setEventsStatus({error: true, success: false, message: errormsg})
            setEventsLoading(false)
        }else{
            setEvents(response?.result?.data?.data)
            setEventsLoading(false)
        }
    }

    function getSingleEvent(id){
        let _singleEvent = events?.find((ev)=>(ev._id === id))
        console.log("single event inside event hook", _singleEvent)
        return _singleEvent
    }

    useEffect(()=>{
        getEvents()
    },[])

    return { events, getSingleEvent, eventsLoading, eventsStatus, createEvent, editEvent }
}