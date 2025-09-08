import { IoCheckmark, IoClose } from "react-icons/io5";
import CustomLoader from "../components/CustomLoader";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { apiVersion, baseApiUrlTest } from "../config";
import { useUserProvider } from "../contexts/UserContext";

export default function VerifyPayment(){
    let navigate = useNavigate()
    let {user} = useUserProvider()
    let [searchParams, setSearchParams] = useSearchParams()
    let [verifyingPayment, setVerifyingPayment] = useState(true)
    let [paymentStatus, setPaymentStatus] = useState({error: false, success: false, msg: ""})

    let status = searchParams.get("status")
    let tx_ref = searchParams.get("tx_ref")
    let transaction_id = searchParams.get("transaction_id")

    console.log("all qury params", searchParams.get("tx_ref"))

    async function verifyPayment(){
        try{
            let result = await axios.get(`${baseApiUrlTest}/verifypayment?tx_ref=${tx_ref}&status=${status}&transaction_id=${transaction_id}`)
            setVerifyingPayment(false)
            console.log("verification success", result.data)
            setPaymentStatus({error: false, success: true, msg: result.data.message})
            navigate("/dashboard")
        }catch(err){
            setVerifyingPayment(false)
            console.log('verification fail', err.response)
            setPaymentStatus({error: true, success: false, msg: err.response.message || err.response.data.message})
        }
    }

    useEffect(()=>{
        verifyPayment()
    }, [user])

    return(
        <div className="h-[100vh] flex justify-center items-center">
            {
                paymentStatus.success
                ?
                <div>
                    <div className="my-4 w-[170px] h-[170px] bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-[150px] h-[150px] bg-green-600 rounded-full flex items-center justify-center">
                            <IoCheckmark size={100} color="white" />
                        </div>
                    </div>
                    <p className="text-primary-dark text-lg text-center font-medium">Payment Verified</p>
                </div>
                :
                paymentStatus.error
                ?
                <div>
                    <div className="my-4 w-[170px] h-[170px] bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-[150px] h-[150px] bg-red-600 rounded-full flex items-center justify-center">
                            <IoClose size={100} color="white" />
                        </div>
                    </div>
                    <p className="text-primary-dark text-lg text-center font-medium">{paymentStatus.msg}</p>
                    <Link to={"/dashboard/cart"}>
                        <p className="text-center underline text-primary-orange text-center">Go Back to Cart</p>
                    </Link>
                </div>
                :
                verifyingPayment
                &&
                <div>
                    <CustomLoader />
                    <p className="pt-[100px] text-primary-dark text-lg text-center font-medium">Checking Payment Status...</p>
                </div>
            }
        </div>
    )
}