import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import AddEventGeneralInfo from "../../components/AddEventGeneralInfo"
import AddEventTicketInfo from "../../components/AddEventTicketInfo"
import {ToastContainer, toast} from "react-toastify"
import { InfoTab } from "../../modules/Events/InfoTab"


export default function CreateEvent(){
    let navigate = useNavigate()
    let [searchParams] = useSearchParams()
    let currentTab = searchParams.get("current_tab")
    let eventName = searchParams.get("event")
    let eventId = searchParams.get("ev_id")

    function moveToTicketInfo(event_id, event_name){
        navigate(`/dashboard/event/create?current_tab=ticket&event=${event_name}&ev_id=${event_id}`)
    }
     
    console.log("current tab", currentTab)
    return(
        <div>
            <div>
                <div className="flex justify-between md:w-[50%] m-auto ">
                    <InfoTab info={"General Info"} currentTab={currentTab || "general"} />
                    <InfoTab info={"Ticket Info"} currentTab={currentTab} />
                </div>
            {
                !currentTab
                &&
                <AddEventGeneralInfo moveToTickets={moveToTicketInfo} /> 
            }
            {
                currentTab === "ticket"
                &&
                <AddEventTicketInfo eventId={eventId} eventName={eventName} />
            }
            <ToastContainer />
            </div>
        </div>
    )
}