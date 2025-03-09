import { useState } from "react";
import TicketInput from "./TicketInput";

export default function SecuritySettingsForm(){
    const defaultErrorState = {error: false, message: ""}
    
    let [passwordFormData, setPasswordFormData] = useState({
        old_password: "",
        new_password: "",
        confirm_new_password: ""
    })

    let [passwordFormError, setPasswordFormError] = useState({
        old_password: defaultErrorState,
        new_password: defaultErrorState,
        confirm_new_password: defaultErrorState,
    })

    function handleFormDataChange(e){
        setPasswordFormData((prevData)=>{
            return {
                ...prevData,
                [e.target.name]: e.target.value
            }
        })
    }

    function submitPasswordForm(e){
        e.preventDefault()
        console.log(passwordFormData)
    }

    return(
        <form onSubmit={submitPasswordForm} className="relative p-4 pb-16 bg-[#FFF] my-4">
            <div className="relative md:w-[70%]">
                <TicketInput tagType={"input"} type={"password"} value={passwordFormData.old_password} name={"old_password"} label={"Enter previous password"} onChange={handleFormDataChange} />
                <TicketInput tagType={"input"} type={"password"} value={passwordFormData.new_password} name={"new_password"} label={"Enter new password"} onChange={handleFormDataChange} />
                <TicketInput tagType={"input"} type={"password"} value={passwordFormData.confirm_new} name={"confirm_new"} label={"Confirm new password"} onChange={handleFormDataChange} />
                <button className="absolute right-5 bg-primary-dark text-primary-orange m-auto p-2 rounded-md">
                    Change Password
                </button>
            </div>
        </form>
    )
}