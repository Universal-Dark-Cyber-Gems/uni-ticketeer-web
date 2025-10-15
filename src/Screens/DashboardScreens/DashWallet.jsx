import { useNavigate, useOutletContext } from "react-router-dom";
import DashHeader from "../../components/DashHeader";
import { IoCash, IoPencil } from "react-icons/io5";
import {useUserProvider} from "../../contexts/UserContext"
import DataTable from "react-data-table-component"
import { useEffect, useState } from "react";

export default function DashWallet(){
    const navigate = useNavigate()
    const {toggleMenu, accountDetails} = useOutletContext()
    const userProvider = useUserProvider()

    let [withdrawAmount, setWithdrawAmount] = useState("")

    const customStyles = {
        rows: {
            style: {
                color: "#3F1860"
            }
        },
        headCells: {
            style: {
                color: "#3F1860"
            }
        }
    }

    const columns = [
        {
            name: 'Transaction Ref',
            selector: row => row.ref,
            sortable: true
        },
        {
            name: 'Transaction Type',
            selector: row => row.type
        },
        {
            name: 'Currency',
            selector: row => row.currency
        },
        {
            name: 'Amount',
            selector: row => row.amount.toLocaleString()
        },
        {
            name: 'Status',
            selector: row => row.status,
            conditionalCellStyles: [
                {
                    when: row => row.status == 'completed',
                    style: {
                        color: "green",
                        fontWeight: "normal"
                    }
                },
                {
                    when: row => row.status != 'completed',
                    style: {
                        color: "red",
                        fontWeight: "normal"
                    }
                }
            ]
        }
    ]

    const data = userProvider?.user?.account?.transactions

    function MyTable(){
        return(
            <DataTable 
                columns={columns}
                data={data}
                pagination
                customStyles={customStyles}
            />
        )
    }

    async function withdrawFunds(e){
        e.preventDefault()
        await userProvider?.withdrawOrganiserFunds(withdrawAmount)
    }


    return(
        <>
            <DashHeader title={"Wallet"} dashnavtoggle={toggleMenu} />
            <div>
                <div>
                    <h2 className="text-primary-dark text-xl font-bold my-4 py-2">Wallet Overview</h2>
                    <form onSubmit={withdrawFunds} className="md:flex justify-between items-center relative pb-12 md:pb-0">
                        <button className="absolute text-primary-dark flex bottom-0 left-4 justify-between items-center p-2 bg-primary-orange rounded-lg shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:scale-105" >
                            <p className="mr-2 font-medium">withdraw</p>
                            <IoCash />
                        </button>
                        <div className="h-auto border-2 md:w-[30%] md:h-[100px] border-primary-dark rounded-xl p-3 m-3 shadow-xl">
                            <h2 className="text-primary-dark text-lg text-center font-medium">Balance</h2>
                            <p className="font-medium text-center text-3xl text-primary-dark"><span> &#x20a6; </span> {userProvider?.user?.account?.balance.toLocaleString()}</p>
                        </div>
                        <div className="border-2 border-primary-dark rounded-xl md:w-[30%] p-4 relative m-3 shadow-xl">
                            <div onClick={()=> navigate("/dashboard/settings?tab=bank account")} className="absolute flex items-center justify-center w-[30px] h-[30px] p-2 rounded-full bg-[#CCCCCC] hover:bg-[#CCCCCC]/50 hover:cursor-pointer top-2 right-2 ">
                                <IoPencil size={25} />
                            </div>
                            <h3 className="text-primary-dark text-center font-bold">Account Details</h3>
                            {
                                userProvider?.accountDetails
                                ?
                                <div>
                                    <p className="text-primary-dark font-medium my-2 text-[12px]"><span className="font-bold mr-2 text-[14px]" >Name:</span> {userProvider?.user.firstname} {userProvider?.user.lastname}</p>
                                    <p className="text-primary-dark font-medium my-2 text-[12px]"><span className="font-bold mr-2 text-[14px]" >Account Number:</span> {userProvider?.accountDetails.account_number}</p>
                                    <p className="text-primary-dark font-medium my-2 text-[12px]"><span className="font-bold mr-2 text-[14px]" >Bank:</span> {userProvider?.accountDetails.bank_name}</p>
                                </div>
                                :
                                <div className="text-[12px] text-center text-primary-dark">
                                    No account details added yet... click the pencil icon or go to settings
                                </div>
                            }
                        </div>
                        <div className="md:w-[30%] md:h-[100px] rounded-xl p-3 m-3">
                            <h2 className="text-primary-dark text-sm text-left font-small">Withdrawable amount: {userProvider?.user?.account?.balance.toLocaleString()}</h2>
                            <input 
                                type="number" 
                                required 
                                value={withdrawAmount}
                                onChange={(e)=>{setWithdrawAmount(e.target.value)}}
                                className="w-full text-primary-dark font-bold border-2 border-primary-dark rounded-md p-4 bg-inherit shadow-xl placeholder:text-center" 
                                placeholder= "Amount" 
                            />
                        </div>
                        
                    </form>
                </div>

                <div className="text-primary-dark">
                    <h2 className="text-primary-dark text-xl font-bold my-4 py-2">Transaction History</h2>
                    <div className="w-[100%] overflow-scroll md:overflow-hidden">
                    {
                        userProvider?.user?.account?.transactions.length > 0
                        ?
                        <MyTable />
                        :
                        <div className="py-4 text-center text-[12px] text-primary-dark">
                            No transaction history recorded yet
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}