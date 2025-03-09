import axios from "axios"
import { apiVersion, baseApiUrlTest } from "../config"

export async function getUserApi(accessToken){
    try{
        let result = await axios.get(`${baseApiUrlTest}${apiVersion}/users/profile`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ticketeer-auth-token": accessToken
            }
        })
        console.log("getprofile:", result)
        return {err: false, result: result}  
    }catch(err){
        return {err: true, error: err}
    }
}

export async function editUserApi(accessToken, userId, body){
    try{
        let result = await axios.put(`${baseApiUrlTest}${apiVersion}/users/profile/edit/${userId}`, body, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ticketeer-auth-token": accessToken
            }
        })
        console.log("edit user result", result)
        return { err: false, result}
    }catch(err){
        return { err: true, error: err }
    }
}

export async function getUserAccountDetailsApi(accessToken){
    try{
        let result = await axios.get(`${baseApiUrlTest}${apiVersion}/users/accountdetails`, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ticketeer-auth-token": accessToken
            }
        })
        console.log("get account details:", result)
        return {err: false, result}
    }catch(err){
        return { err: true, error: err}
    }
}

export async function addUserAccountDetailsApi(accessToken, body){
    try{
        let result = await axios.post(`${baseApiUrlTest}${apiVersion}/users/accountdetails`, body, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ticketeer-auth-token": accessToken
            }
        })
        console.log("post bank details", result)
        return { err: false, result }
    }catch(err){
        return { err: true, error: err}
    }
}

export async function getBankListApi(){
    try{
        let result = await axios.get(`${baseApiUrlTest}/flutterwave-banklist`)
        console.log("get banklist", result)
        return { err: false, result}
    }catch(err){
        return { err: true, error: err}
    }
}