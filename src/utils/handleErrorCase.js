import getErrorMsg from "./getErrorMsg"

export default function handleErrorCase(response, logout, setStatusState, setLoadingState){
    let errormsg = getErrorMsg(response)
    if(response.error?.response?.status === 401){
        logout()
        return
    }
    setStatusState({error: true, success: false, message: errormsg})
    setLoadingState(false)
}