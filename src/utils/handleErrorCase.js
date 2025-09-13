import { toast } from "react-toastify"
import getErrorMsg from "./getErrorMsg"

export default function handleErrorCase(response, logout, setStatusState, setLoadingState, showError=false){
    let errormsg = getErrorMsg(response)
    if(response.error?.response?.status === 401){
        logout()
        return
    }
    if(showError){
        toast.error(errormsg, {position: 'top-center'})
    }
    setStatusState({error: true, success: false, message: errormsg})
    setLoadingState(false)
}