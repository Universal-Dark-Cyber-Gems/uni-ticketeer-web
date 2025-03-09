import { useContext, useEffect, useState } from "react";
import TicketInput from "./TicketInput";
import { UserContext } from "../contexts/userContext";
import fetchBankList from "../utils/fetchBankList";
import useUser from "../hooks/useUser";

export default function BankAccountSettingsForm({accountData, userData}){
    const user = useContext(UserContext)
    const { addUserAccountDetails, accountLoading, accountStatus } = useUser()
    let [bankList, setBankList] = useState(null)
    let [bankDetailsForm, setBankDetailsForm] = useState({
        user_id: user._id,
        bank_name: "",
        account_number: "",
        bank_code: ""
    })

    function handleFormChange(e){
        setBankDetailsForm((prev)=>{
            return {...prev, [e.target.name]: e.target.value}
        })
    }

    async function submitForm(e){
        e.preventDefault()
        console.log("bank details submitted", bankDetailsForm)
         await addUserAccountDetails(bankDetailsForm)
    }

    useEffect(()=>{
        if (bankList) return
        async function getBankList(){
            let listOfBanks = await fetchBankList()
            setBankList(listOfBanks)
        }

        getBankList()
    }, [])
    return(
        <form onSubmit={submitForm} className="relative p-4 pb-16 bg-[#FFF] my-4">
            <TicketInput label={"Account Name"} name={"account_name"} value={`${userData?.firstname} ${userData?.lastname}`} disabled/>
            <TicketInput label={"Account Number"} name={"account_number"} value={bankDetailsForm.account_number} onChange={handleFormChange} />
            <TicketInput
             tagType="select" 
             options={bankList?.map((bank)=>({value: bank.code, label: bank.name}))}
             label={"Select Bank"} 
             name={"bank_code"} 
             value={bankDetailsForm.bank_code} 
             onChange={handleFormChange}
            />
            <div className="flex justify-end">
                <button className="bg-primary-dark text-primary-orange py-2 px-4 rounded-full">
                    Save
                </button>
            </div>
        </form>
    )
}