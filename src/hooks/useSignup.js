import { useState } from "react";
import { signupUser } from "../api/signupapi";

export default function useSignup(){
    let [signupLoading, setSignupLoading] = useState(false)
    let [signupStatus, setSignupStatus] = useState({error: false, success: false, message: ''})

    async function signup(payload){
        setSignupLoading(true)
        let response = await signupUser(payload)
        console.log("signup response", response)
        if(response.err){
            let errormessage = response.error?.response?.data?.data
                                ?
                                response.error?.response?.data?.data[0].message
                                :
                                response.error?.response?.data
                                ?
                                response.error?.response?.data?.message
                                :
                                response.error?.message
            setSignupStatus({error: true, success: false, message: errormessage})
            setSignupLoading(false)
        }else{
            setSignupStatus({error: false, success: true, message: "success"})
            setSignupLoading(false)
        }
        console.log("in the function itself")
    }

    return { signup, signupLoading, signupStatus  }
}