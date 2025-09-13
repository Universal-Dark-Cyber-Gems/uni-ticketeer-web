import { Link, useSearchParams } from "react-router-dom";
import CustomLoader from "../../components/CustomLoader";
import { useEffect } from "react";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { useUserProvider } from "../../contexts/UserContext";
import useLogin from "../../hooks/useLogin";

export default function VerifyEmail(){
    let [searchParams, setSearchParams] = useSearchParams()
    let { loginLoading, status, verifyUserMail } = useLogin()

    let token = searchParams.get("token")
    let userid = searchParams.get("userid")

    let hasRequested = false;

    async function runVerification(){
        await verifyUserMail(userid, token)
    }

    useEffect(()=>{
        if(hasRequested == false){
            console.log("running the function")
            runVerification()
            hasRequested = true
        }
    }, [])

    return(
        <div className="text-primary-dark">
            {
                loginLoading
                ?
                <div>
                    <p className="text-[24px] font-medium mb-8">Please Wait while we verify your Email...</p>
                    <CustomLoader />
                </div>
                :
                status.error
                ?
                <div className="flex flex-col items-center justify-center">
                    <div className="my-4 w-[170px] h-[170px] bg-red-500 rounded-full flex items-center justify-center">
                        <div className="w-[150px] h-[150px] bg-red-600 rounded-full flex items-center justify-center">
                            <IoClose size={100} color="white" />
                        </div>
                    </div>
                    <p className="text-[24px] text-red-500 font-medium mt-8">
                        {status.message}
                    </p>
                </div>
                :
                status.success
                ?
                <div className="flex flex-col items-center justify-center">
                    <div className="my-4 w-[170px] h-[170px] bg-green-500 rounded-full flex items-center justify-center">
                        <div className="w-[150px] h-[150px] bg-green-600 rounded-full flex items-center justify-center">
                            <IoCheckmark size={100} color="white" />
                        </div>
                    </div>
                    <p className="text-[24px] font-medium my-8">
                        Email Verification Complete
                    </p>
                    <Link to={"/auth/login"} className="p-4 border-[1px] border-primary-dark rounded-md">
                        Go to Login
                    </Link>
                </div>
                :
                <div>
                    wetin dy sup
                </div>
            }
        </div>
    )
}