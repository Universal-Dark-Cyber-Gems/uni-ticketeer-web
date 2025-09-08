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

export {
    loginUser,
    getResetPasswordLinkApi,
    resetPasswordApi
}