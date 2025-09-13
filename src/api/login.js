import { apiVersion, baseApiUrlTest } from "../config"
import axios from 'axios'

async function loginUser(payload){
    try{
        let res = await axios.post(baseApiUrlTest+apiVersion+"/users/login",
            payload,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            }
        )
        
        return {err: false, data: res}
    } catch(err){
        return {err: true, error: err}
    }       
   
}

async function getResetPasswordLinkApi(email){
    try{
        let res = await axios.get(baseApiUrlTest+apiVersion+"/users/forgot-password?email="+email)
        return{err: false, data: res}
    }catch(err){
        return {err: true, error: err}
    }

}

async function resetPasswordApi(token, userid, payload){
    try{
        let res = await axios.post(baseApiUrlTest+apiVersion+"/users/reset-password?userid="+userid+"&token="+token, payload, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        } )
        return {err: false, data: res}
    }catch(err){
        return {err: true, error: err}
    }
}

async function resendVerifMailApi(body){
    try{
        let result = await axios.post(`${baseApiUrlTest}${apiVersion}/users/generate/verifcationtoken`, body, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        })
        console.log("result from resend verification", result)
        return {err: false, result}
    }catch(err){
        return {err: true, error: err}
    }
}

async function verifyUserEmailApi(userid, verifToken){
    try{
        let result = await axios.get(`${baseApiUrlTest}${apiVersion}/users/verifymail/${userid}/${verifToken}`)
        console.log("result from verify mail", result)
        return {err: false, result}
    }catch(err){
        return {err: true, error: err}
    }
}

export {
    loginUser,
    getResetPasswordLinkApi,
    resetPasswordApi,
    resendVerifMailApi,
    verifyUserEmailApi
}