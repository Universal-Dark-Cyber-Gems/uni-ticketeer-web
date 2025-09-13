import { useSearchParams, useNavigate, useParams } from "react-router-dom"
import AddEventGeneralInfo from "../../modules/Events/AddEventGeneralInfo"
import AddEventTicketInfo from "../../modules/Events/AddEventTicketInfo"
import {ToastContainer, toast} from "react-toastify"
import { InfoTab } from "../../modules/Events/InfoTab"
import useEvents from "../../hooks/useEvents"
import CustomModal from "../../components/CustomModal"

export default function EditEvent(){
    let navigate = useNavigate()
    let [searchParams] = useSearchParams()
    let {id} = useParams()
    let currentTab = searchParams.get("current_tab")
    let eventName = searchParams.get("event")
    let eventId = searchParams.get("ev_id")
    let { getSingleEvent } = useEvents()

    let singleEvent = getSingleEvent(id)

    function moveToTicketInfo(event_id, event_name, organiser_id){
        navigate(`/dashboard/event/create?current_tab=ticket&event=${event_name}&ev_id=${event_id}&organiser_id=${organiser_id}`)
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
                <AddEventGeneralInfo event={singleEvent} moveToTickets={moveToTicketInfo} /> 
            }
            {
                currentTab === "ticket"
                &&
                <AddEventTicketInfo eventId={eventId} eventName={eventName} />
            }
            </div>
        </div>
    )
}