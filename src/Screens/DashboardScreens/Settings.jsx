import { useOutletContext, useSearchParams } from "react-router-dom";
import DashHeader from "../../components/DashHeader";
import { useEffect, useState } from "react";
import ProfileSettingsForm from "../../modules/Settings/ProfileSettingsForm";
import SecuritySettingsForm from "../../modules/Settings/SecuritySettingsForm";
import CouponCodeSettings from "../../modules/Settings/CouponCodeSettings";
import { isUserOrganiser } from "../../global/helpers";
import BankAccountSettingsForm from "../../modules/Settings/BankAccountSettingsForm";
import { useUserProvider } from "../../contexts/UserContext";


export default function Settings(){
    let {toggleMenu, accountDetails} = useOutletContext()
    let userProvider = useUserProvider()
    const [searchParams, setSearchParams] = useSearchParams()
    let tabFromQuery = searchParams.get('tab')
    let [currentSettingsTab, setCurrentSettingsTab] = useState( tabFromQuery || "profile settings")

    return(
        <>
            <DashHeader title={"Settings"} dashnavtoggle={toggleMenu} />
            <div className="flex bg-[#FFF] p-[2px] overflow-scroll">
                <SettingsTypeTab title={"profile settings"} currentTab={currentSettingsTab} setCurrentTab={setCurrentSettingsTab} />
                {isUserOrganiser(userProvider?.user) && <SettingsTypeTab title={"bank account"} currentTab={currentSettingsTab} setCurrentTab={setCurrentSettingsTab} />}
                <SettingsTypeTab title={"security settings"} currentTab={currentSettingsTab} setCurrentTab={setCurrentSettingsTab} />
                {isUserOrganiser(userProvider?.user) && <SettingsTypeTab title={"coupon codes"} currentTab={currentSettingsTab} setCurrentTab={setCurrentSettingsTab} />}
            </div>
            <div>
                {
                    currentSettingsTab === "profile settings"
                    &&
                    <ProfileSettingsForm userData={userProvider?.user} />
                }
                {
                    currentSettingsTab === "bank account" && isUserOrganiser(userProvider?.user)
                    &&
                    <BankAccountSettingsForm userData={userProvider} />
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
        <div 
            onClick={()=>setCurrentTab(title)} 
            className={`cursor-pointer font-medium capitalize text- p-2 m-[2px] ${active ? "bg-primary-dark text-primary-orange" : "text-primary-dark"} rounded-md`}
        >
            {title}
        </div>
    )
}