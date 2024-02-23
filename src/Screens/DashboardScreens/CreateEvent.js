import { useState } from "react"
import AddEventGeneralInfo from "../../components/AddEventGeneralInfo"
import AddEventTicketInfo from "../../components/AddEventTicketInfo"


export default function CreateEvent(){
    let [currentTab, setCurrentTab] = useState("General Info")
     
    return(
        <div>
            <div>
                <div className="flex justify-between md:w-[50%] m-auto ">
                    <InfoTab info={"General Info"} currentTab={currentTab} setCurrentTab={setCurrentTab} />
                    <InfoTab info={"Ticket Info"} currentTab={currentTab} setCurrentTab={setCurrentTab} />
                </div>
            {
                currentTab === "General Info"
                ?
                <AddEventGeneralInfo />
                :
                <AddEventTicketInfo />
            }
            </div>
        </div>
    )
}


function InfoTab({info, currentTab, setCurrentTab}){
    let active = info === currentTab ? true : false
    return(
        <div onClick={()=>{setCurrentTab(info)}} className={`cursor-pointer ${active ? "bg-primary-dark" : "bg-[#F7F7F7]"} p-2 w-full mx-2 text-center text-primary-orange rounded-lg`}>
            {info}
        </div>
    )
}