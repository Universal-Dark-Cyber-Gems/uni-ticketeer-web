import { useEffect, useState } from "react";
import { addUserAccountDetailsApi, getOrganiserStatsApi, getUserAccountDetailsApi, getUserApi } from "../api/usersapi";
import useLogin from "./useLogin";
import getErrorMsg from "../utils/getErrorMsg";
import handleErrorCase from "../utils/handleErrorCase";
import { isUserOrganiser } from "../global/helpers";

export default function useUser(){
    let { accessToken, logout } = useLogin()
    let [user, setUser] = useState(null)
    let [organiserStats, setOrganiserStats] = useState(null)
    let [accountDetails, setAccountDetails] = useState(null)
    let [userLoading, setUserLoading] = useState(false)
    let [accountLoading, setAccountLoading] = useState(false)
    let [userStatus, setUserStatus] = useState({error: false, success: false, message: ""})
    let [accountStatus, setAccountStatus] = useState({error: false, success: false, message: ""})


    async function getUserAccountDetails() {
        setAccountLoading(true)
        let response = await getUserAccountDetailsApi(accessToken)
        console.log("response from getting account", response)
        if(response.err){
            let errormsg = getErrorMsg(response)
            if(response.error?.response?.status === 401){
                logout()
                return
            }
            setAccountStatus({error: true, success: false, message: errormsg})
            setAccountLoading(false)
        }else{
            console.log("before setting account", response?.result?.data?.data)
            setAccountDetails(response?.result?.data?.data)
            setAccountStatus({error: false, success: true, message: "user bank account fetched"})
            setAccountLoading(false)
        }
    }

    async function addUserAccountDetails(body){
        setAccountLoading(true)
        let response = await addUserAccountDetailsApi(accessToken, body)
        if(response.err){
            let errormsg = getErrorMsg(response)
            if(response.error?.response?.status === 401){
                logout()
                return
            }
            setAccountStatus({error: true, success: false, message: errormsg})
            setAccountLoading(false)
        }else{
            console.log("after adding user details", response?.result?.data?.data)
            setAccountDetails(response?.result?.data?.data)
            setAccountStatus({error: false, success: true, message: "account details added successfully"})
            setAccountLoading(false)
        }
    }

    async function getOrganiserStats(){
        console.log("getting statistics")
        setUserLoading(true)
        let response = await getOrganiserStatsApi(accessToken)
        if(response.err){
            console.log("error from stats", response)
            handleErrorCase(response, logout, setUserStatus, setUserLoading, true)
        }else{
            console.log("stats", response.result.data.data)
            setOrganiserStats(response.result.data.data)
            setUserLoading(false)
        }
    }

    async function getUserProfile(){
        setUserLoading(true)
        console.log("accesstoken", accessToken)
        let response = await getUserApi(accessToken)
        console.log("response from getting profile", response)
        if(response.err){
            let errormsg = getErrorMsg(response)
            if(response.error?.response?.status === 401){
                logout()
                return
            }
            setUserStatus({error: true, success: false, message: errormsg})  
            setUserLoading(false)
        }else{
            console.log("before setting user:", response?.result?.data?.data)
            setUser(response?.result?.data?.data)
            setUserStatus({error: false, success: true, message: "user profile fetched"})
            setUserLoading(false)
        }
    }

    useEffect(()=>{
        if(user===null){
            async function getInitialUser(){
                await getUserProfile()
            }
            getInitialUser()
        }
    }, [user])

    useEffect(()=>{
        if(isUserOrganiser(user)){
            async function getOrganiserRelatedInfo(){
                console.log("getting organiser stats..")
                await getOrganiserStats() 
                console.log("getting user account details")
                await getUserAccountDetails()
            }
            getOrganiserRelatedInfo()
        }
    }, [user])
    
    return { 
        user, 
        accountDetails,
        organiserStats, 
        userLoading, 
        accountLoading, 
        userStatus, 
        accountStatus ,
        addUserAccountDetails
    }
}