import { CiCamera } from "react-icons/ci";
import TicketInput from "../../components/TicketInput";
import { useEffect, useState } from "react";

export default function ProfileSettingsForm({userData}){
    let [profileFormData, setProfileFormData] = useState("")

    let genderOptions = ["male","female"]

    function handleFormDataChange(e){
        setProfileFormData((prev)=>{
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }

    function submitProfileSettings(e){
        e.preventDefault()
    }

    useEffect(()=>{
        setProfileFormData({...userData})
    }, [userData])
    return(
        <form onSubmit={submitProfileSettings} className="relative p-4 pb-16 bg-[#FFF] my-4">
            <div className="flex items-center">
                <div className="relative">
                    <div className="w-[100px] h-[100px] rounded-full bg-primary-dark"></div>
                    <div className="flex items-center justify-center bg-[#EEE] p-2 w-10 h-10 rounded-full absolute bottom-0 right-0">
                        <CiCamera size={30}/>
                    </div> 
                </div>
                <div className="p-2">
                    <p className="md:text-2xl text-primary-dark font-medium">Onwenu Money</p>
                    <p className="text-primary-dark"><span className="font-medium">User role:</span> {userData?.usertype === "basic" ? "Ticketeer" : "Organiser"}</p>
                </div>
            </div>
            <div className="py-2 md:w-[80%]">
                <div className="md:flex gap-3">
                    <TicketInput label={"Firstname"} tagType={"input"} value={profileFormData.firstname} name={"firstname"} onChange={handleFormDataChange} />
                    <TicketInput label={"Lastname"} tagType={"input"} value={profileFormData.lastname} name={"lastname"} onChange={handleFormDataChange} />
                </div>
                <div className="md:flex gap-3">
                    <TicketInput label={"Email Address"} disabled tagType={"input"} value={profileFormData.email} name={"email"} onChange={handleFormDataChange} />
                    <TicketInput label={"Username"} tagType={"input"} value={profileFormData?.username} name={"username"} onChange={handleFormDataChange} />
                </div>
                <div className="md:flex gap-3">
                    <TicketInput label={"Country"} tagType={"input"} />
                    <TicketInput label={"State"} tagType={"input"} />
                </div>
                <div className="md:flex gap-3">
                    <TicketInput label={"Town/City"} tagType={"input"} />
                    <TicketInput label={"Date of Birth"} tagType={"input"} type={"date"} />
                    <TicketInput label={"Gender"} tagType={"select"} placeholder={"Select gender"} options={genderOptions} />
                </div>
            </div>
            <button className="w-[100px] rounded-full absolute right-5 m-2 p-2 text-primary-orange bg-primary-dark">
                Save
            </button>
        </form>
    )
}