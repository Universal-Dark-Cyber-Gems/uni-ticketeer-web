import { useContext, useEffect, useState } from "react";
import TicketInput from "../../components/TicketInput";
import { UserContext, useUserProvider } from "../../contexts/UserContext";
import useUser from "../../hooks/useUser";
import CustomLoader from "../../components/CustomLoader"
import { toast } from "react-toastify";

export default function BankAccountSettingsForm({userData}){
    let [bankDetailsForm, setBankDetailsForm] = useState({
        user_id: userData?.user?._id,
        bank_name: "",
        account_number: "",
        bank_code: ""
    })

    function handleFormChange(e){
        let _bankname;
        if(e.target.name == "bank_code"){
            _bankname = userData?.bankList.find((bank)=> bank.code == e.target.value).name
        }
        console.log("bankname", _bankname)
        setBankDetailsForm((prev)=>{
            return {
                ...prev, 
                [e.target.name]: e.target.value,
                bank_name: _bankname
            }
        })
    }

    async function submitForm(e){
        e.preventDefault()
        console.log("bank details submitted", bankDetailsForm)
        let res;
        if(userData?.accountDetails){
            res = await userData?.editUserAccountDetails(bankDetailsForm)
        }else{
            res = await userData?.addUserAccountDetails(bankDetailsForm)
        }

        if(res.success){
            toast.success("Bank Details Updated")
        }
    }

    useEffect(()=>{
        if(userData?.accountDetails){
            setBankDetailsForm({
                bank_code: userData.accountDetails.bank_code,
                bank_name: userData.accountDetails.bank_name,
                account_number: userData.accountDetails.account_number,
                user_id: userData.accountDetails.user_id
            })
        }
    }, [userData.accountDetails])
    return(
        <form onSubmit={submitForm} className="relative p-4 pb-16 bg-[#FFF] my-4">
            <TicketInput label={"Account Name"} name={"account_name"} value={`${userData?.user.firstname} ${userData?.user.lastname}`} disabled/>
            <TicketInput label={"Account Number"} name={"account_number"} value={bankDetailsForm.account_number} onChange={handleFormChange} />
            <TicketInput
             tagType="select" 
             list={"banks"}
             options={userData?.bankList?.map((bank)=>({value: bank.code, label: bank.name}))}
             label={"Select Bank"} 
             name={"bank_code"} 
             value={bankDetailsForm?.bank_code} 
             onChange={handleFormChange}
            />
            <div className="flex justify-end">
                <button className="bg-primary-dark text-primary-orange py-2 px-4 rounded-full">
                    {
                        userData?.accountLoading
                        ?
                        <CustomLoader size={20}  />
                        :
                        "Save"
                    }
                </button>
            </div>
        </form>
    )
}