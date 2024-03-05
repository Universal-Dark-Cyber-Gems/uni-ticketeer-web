import { useOutletContext } from "react-router-dom";
import DashHeader from "../../components/DashHeader";
import { useState } from "react";
import ProfileSettingsForm from "../../components/ProfileSettingsForm";
import SecuritySettingsForm from "../../components/SecuritySettingsForm";
import CouponCodeSettings from "../../components/CouponCodeSettings";


export default function Settings(){
    let toggleMenu = useOutletContext()
    let [currentSettingsTab, setCurrentSettingsTab] = useState("profile settings")
    return(
        <>
            <DashHeader title={"Settings"} dashnavtoggle={toggleMenu} />
            <div className="flex bg-[#FFF] p-[2px]">
                <SettingsTypeTab title={"profile settings"} currentTab={currentSettingsTab} setCurrentTab={setCurrentSettingsTab} />
                <SettingsTypeTab title={"security settings"} currentTab={currentSettingsTab} setCurrentTab={setCurrentSettingsTab} />
                <SettingsTypeTab title={"coupon codes"} currentTab={currentSettingsTab} setCurrentTab={setCurrentSettingsTab} />
            </div>
            <div>
                {
                    currentSettingsTab === "profile settings"
                    &&
                    <ProfileSettingsForm />
                }
                {
                    currentSettingsTab === "security settings"
                    &&
                    <SecuritySettingsForm />
                }
                {
                    currentSettingsTab === "coupon codes"
                    &&
                    <CouponCodeSettings />
                }
            </div>
        </>
    )
}

function SettingsTypeTab({title, currentTab, setCurrentTab}){
    let active = title === currentTab ? true : false
    return(
        <div onClick={()=>setCurrentTab(title)} className={`cursor-pointer font-medium capitalize text- p-2 m-[2px] ${active ? "bg-primary-dark text-primary-orange" : "text-primary-dark"} rounded-md`}>
            {title}
        </div>
    )
}