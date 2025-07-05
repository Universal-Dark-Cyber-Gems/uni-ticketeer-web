import { useNavigate, useOutletContext } from "react-router-dom";
import DashHeader from "../../components/DashHeader";
import { IoCash, IoPencil } from "react-icons/io5";
import {useUserProvider} from "../../contexts/UserContext"

export default function DashWallet(){
    const navigate = useNavigate()
    const {toggleMenu, accountDetails} = useOutletContext()
    const userProvider = useUserProvider()

    return(
        <>
            <DashHeader title={"Wallet"} dashnavtoggle={toggleMenu} />
            <div>
                <div>
                    <h2 className="text-primary-dark text-xl font-bold my-4 py-2">Wallet Overview</h2>
                    <div className="md:flex justify-between items-center relative pb-12 md:pb-0">
                        <div onClick={()=>{}} className="absolute flex bottom-0 left-4 justify-between items-center p-2 bg-primary-orange rounded-lg shadow-xl transition-all duration-300 ease-in-out cursor-pointer hover:scale-105" >
                            <p className="mr-2 font-medium">withdraw</p>
                            <IoCash />
                        </div>
                        <div className="h-auto border-2 md:w-[30%] md:h-[100px] border-primary-dark rounded-xl p-3 m-3 shadow-xl">
                            <h2 className="text-primary-dark text-lg text-center font-medium">Balance</h2>
                            <p className="font-medium text-center text-3xl text-primary-dark"><span> &#x20a6; </span> {userProvider?.user?.account?.balance}</p>
                        </div>
                        <div className="border-2 border-primary-dark rounded-xl md:w-[30%] p-4 relative m-3 shadow-xl">
                            <div onClick={()=> navigate("/dashboard/settings?tab=bank account")} className="absolute flex items-center justify-center w-[30px] h-[30px] p-2 rounded-full bg-[#CCCCCC] hover:bg-[#CCCCCC]/50 hover:cursor-pointer top-2 right-2 ">
                                <IoPencil size={25} />
                            </div>
                            <h3 className="text-primary-dark text-center font-bold">Account Details</h3>
                            {
                                accountDetails
                                ?
                                <div>
                                    <p className="text-primary-dark font-medium my-2 text-[12px]"><span className="font-bold mr-2 text-[14px]" >Name:</span> {userProvider?.user.first_name} {userProvider?.user.last_name}</p>
                                    <p className="text-primary-dark font-medium my-2 text-[12px]"><span className="font-bold mr-2 text-[14px]" >Account Number:</span> {accountDetails.account_number}</p>
                                    <p className="text-primary-dark font-medium my-2 text-[12px]"><span className="font-bold mr-2 text-[14px]" >Bank:</span> {accountDetails.bank_name}</p>
                                </div>
                                :
                                <div className="text-[12px] text-center text-primary-dark">
                                    No account details added yet... click the pencil icon or go to settings
                                </div>
                            }
                        </div>
                        <div className="md:w-[30%] md:h-[100px] rounded-xl p-3 m-3">
                            <h2 className="text-primary-dark text-sm text-left font-small">Withdrawable amount: 30,000</h2>
                            <input type="number" className="w-full font-bold border-2 border-primary-dark rounded-md p-4 bg-inherit shadow-xl placeholder:text-center" placeholder= "Amount" />
                        </div>
                        
                    </div>
                </div>

                <div>
                    <h2 className="text-primary-dark text-xl font-bold my-4 py-2">Transaction History</h2>
                    <div className="w-[100%] overflow-scroll md:overflow-hidden">
                    {
                        userProvider?.user?.account?.transactions.length > 0
                        ?
                        <table className="bg-white md:w-full table-auto border-collapse border border-slate-400">
                            <thead className="bg-[#EEEEEE]">
                                <tr>
                                    <th className="border border-slate-300 border-collapse p-3">S/N</th>
                                    <th className="border border-slate-300 border-collapse p-3">Transaction Ref</th>
                                    <th className="border border-slate-300 border-collapse p-3">Transaction Type</th>
                                    <th className="border border-slate-300 border-collapse p-3">Currency</th>
                                    <th className="border border-slate-300 border-collapse p-3">Amount</th>
                                    <th className="border border-slate-300 border-collapse p-3">Status</th>
                                </tr>
                            </thead>
                                <tbody>
                                    {
                                        userProvider?.user?.account?.transactions?.map((transaction, i)=>(
                                            <tr>
                                                <td className="border border-slate-300 p-3">{index + 1}</td>
                                                <td className="border border-slate-300 p-3">{transaction?.ref}</td>
                                                <td className="border border-slate-300 p-3">{transaction?.type}</td>
                                                <td className="border border-slate-300 p-3">{transaction?.currency}</td>
                                                <td className="border border-slate-300 p-3">{transaction?.amount}</td>
                                                <td className="border border-slate-300 p-3">{transaction?.status}</td>
                                            </tr>
                                        ))
                                    }
                                    <tr>
                                        <td className="border border-slate-300 p-3">1</td>
                                        <td className="border border-slate-300 p-3">4848393_checkout_iererer</td>
                                        <td className="border border-slate-300 p-3">Checkout</td>
                                        <td className="border border-slate-300 p-3">NGN</td>
                                        <td className="border border-slate-300 p-3">2,000</td>
                                        <td className="border border-slate-300 p-3">Completed</td>
                                    </tr>
                                </tbody>
                        </table>
                        :
                            <div className="py-4 text-center text-[12px] text-primary-dark">
                                No transaction history recorded yet
                            </div>
                        }
                        <div className="flex justify-between p-3">
                            <div>
                                <span className="cursor-pointer">Rows per page</span>
                                <select>
                                    <option value='10'>10</option>
                                    <option value='20'>20</option>
                                    <option value='50'>50</option>
                                </select>
                            </div>
                            <div>
                                page 2 of 3
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}