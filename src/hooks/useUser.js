import { useEffect, useState } from "react";
import { addUserAccountDetailsApi, editUserAccountDetailsApi, getOrganiserStatsApi, getUserAccountDetailsApi, getUserApi, withdrawOrganiserFundsApi } from "../api/usersapi";
import useLogin from "./useLogin";
import handleErrorCase from "../utils/handleErrorCase";
import { isUserOrganiser } from "../global/helpers";
import { toast } from "react-toastify";
import fetchBankList from "../utils/fetchBankList";

export default function useUser(){
    let { accessToken, logout } = useLogin()
    let [user, setUser] = useState(null)
    let [organiserStats, setOrganiserStats] = useState(null)
    let [accountDetails, setAccountDetails] = useState(null)
    let [userLoading, setUserLoading] = useState(false)
    let [accountLoading, setAccountLoading] = useState(false)
    let [userStatus, setUserStatus] = useState({error: false, success: false, message: ""})
    let [accountStatus, setAccountStatus] = useState({error: false, success: false, message: ""})

    let [bankList, setBankList] = useState(null)

    async function getBankList(){
        let listOfBanks = await fetchBankList()
        setBankList(listOfBanks)
    }

    async function getUserAccountDetails() {
        setAccountLoading(true)
        let response = await getUserAccountDetailsApi(accessToken)
        console.log("response from getting account", response)
        if(response.err){
            handleErrorCase(response, logout, setAccountStatus, setAccountLoading, false)
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
            handleErrorCase(response, logout, setAccountStatus, setAccountLoading, true)
        }else{
            console.log("after adding user details", response?.result?.data?.data)
            setAccountDetails(response?.result?.data?.data)
            setAccountStatus({error: false, success: true, message: "account details added successfully"})
            setAccountLoading(false)
            return {success: true}
        }
    }


    async function editUserAccountDetails(body){
        setAccountLoading(true)
        let response = await editUserAccountDetailsApi(accessToken, body)
        if(response.err){
            handleErrorCase(response, logout, setAccountStatus, setAccountLoading, true)
        }else{
            console.log("after editing user account details", response.result.data.data)
            setAccountDetails(response?.result?.data.data)
            setAccountStatus({error: false, success: true, message: "account details edited successfully"})
            setAccountLoading(false)
            return {success: true}
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
            handleErrorCase(response, logout, setUserStatus, setUserLoading, true)
        }else{
            console.log("before setting user:", response?.result?.data?.data)
            setUser(response?.result?.data?.data)
            setUserStatus({error: false, success: true, message: "user profile fetched"})
            setUserLoading(false)
        }
    }

    async function withdrawOrganiserFunds(amount){
        setUserLoading(true)
        let response = await withdrawOrganiserFundsApi(accessToken, {amount})
        console.log("response from withdrawal", response)
        if(response.err){
            handleErrorCase(response, logout, setUserStatus, setUserLoading, true)
        }else{
            setUserStatus({error: false, success: true, message: "Withdrawal Successful"})
            setUserLoading(false)
            toast.success("Withdrawal Successfull")
            return {success: true}
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
                console.log("getting bank list") 
                console.log("getting organiser stats..") 
                console.log("getting user account details") 
                await Promise.all([getBankList(), getOrganiserStats(), getUserAccountDetails()])
            }
            getOrganiserRelatedInfo()
        }
    }, [user])
    
    return { 
        user, 
        bankList,
        accountDetails,
        organiserStats, 
        userLoading, 
        accountLoading, 
        userStatus, 
        accountStatus ,
        addUserAccountDetails,
        editUserAccountDetails,
        withdrawOrganiserFunds
    }
}