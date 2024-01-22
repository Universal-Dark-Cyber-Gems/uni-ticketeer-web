import { useOutletContext } from "react-router-dom";
import DashHeader from "../../components/DashHeader";
import { IoCash, IoPencil } from "react-icons/io5";

export default function DashWallet(){
    const toggleMenu = useOutletContext()
    return(
        <>
            <DashHeader title={"Wallet"} dashnavtoggle={toggleMenu} />
            <div>
                <div>
                    <h2 className="text-primary-dark text-xl font-bold my-4 py-2">Wallet Overview</h2>
                    <div className="md:flex justify-between items-center relative pb-12 md:pb-0">
                        <div className="absolute flex bottom-0 left-4 justify-between items-center p-2 bg-primary-orange rounded-lg shadow-xl" >
                            <p className="mr-2 font-medium">withdraw</p>
                            <IoCash />
                        </div>
                        <div className="h-auto border-2 md:w-[30%] md:h-[100px] border-primary-dark rounded-xl p-3 m-3 shadow-xl">
                            <h2 className="text-primary-dark text-lg text-center font-medium">Ballance</h2>
                            <p className="font-medium text-center text-3xl text-primary-dark"><span> &#x20a6; </span> 3000</p>
                        </div>
                        <div className="border-2 border-primary-dark rounded-xl md:w-[30%] p-4 relative m-3 shadow-xl">
                            <div className="absolute flex items-center justify-center w-[30px] h-[30px] p-2 rounded-full bg-[#CCCCCC] hover:bg-[#CCCCCC]/50 hover:cursor-pointer top-2 right-2 "><IoPencil size={25} /></div>
                            <h3 className="text-primary-dark text-center font-medium">Account Details</h3>
                            <p className="text-primary-dark font-medium my-2"><span className="font-bold mr-2" >Name:</span> Nonso Nsude</p>
                            <p className="text-primary-dark font-medium my-2"><span className="font-bold mr-2" >Account Number:</span> 2223857553</p>
                            <p className="text-primary-dark font-medium my-2"><span className="font-bold mr-2" >Bank:</span> Zenith Bank</p>
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
                                <tr>
                                    <td className="border border-slate-300 p-3">1</td>
                                    <td className="border border-slate-300 p-3">4848393_checkout_iererer</td>
                                    <td className="border border-slate-300 p-3">Checkout</td>
                                    <td className="border border-slate-300 p-3">NGN</td>
                                    <td className="border border-slate-300 p-3">2,000</td>
                                    <td className="border border-slate-300 p-3">Completed</td>
                                </tr>
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
                        <div className="flex justify-between p-3">
                            <div>
                                <span>Rows per page</span>
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