import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import AddEventGeneralInfo from "../../components/AddEventGeneralInfo"
import AddEventTicketInfo from "../../components/AddEventTicketInfo"


export default function CreateEvent(){
    let navigate = useNavigate()
    let [searchParams] = useSearchParams()
    let currentTab = searchParams.get("current_tab")
    let eventId = searchParams.get("ev_id")

    function moveToTicketInfo(event_id){
        navigate(`/dashboard/event/create?current_tab=ticket&ev_id=${event_id}`)
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
                <AddEventTicketInfo eventId={eventId} />
            }
            </div>
        </div>
    )
}


function InfoTab({info, currentTab}){
    let active = info?.split(" ")[0].toLowerCase() === currentTab ? true : false
    return(
        <div className={`${active ? "bg-primary-dark" : "bg-[#F7F7F7]"} p-2 w-full mx-2 text-center text-primary-orange rounded-lg`}>
            {info}
        </div>
    )
}