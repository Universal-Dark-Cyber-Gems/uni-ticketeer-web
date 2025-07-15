import axios from "axios"
import { apiVersion, baseApiUrlTest } from "../config"

async function getCartByUserApi(userId, accessToken){
    try{
        let res = await axios.get(`${baseApiUrlTest}${apiVersion}/cart/${userId}`, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "ticketeer-auth-token": accessToken
            }
        })
        return {err: false, result: res}
    }catch(err){
        return {err: true, error: err}
    }
}

async function checkoutCartApi(payload, accessToken){
    try{
        let res = await axios.post(`${baseApiUrlTest}${apiVersion}/checkout`, payload, {
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "ticketeer-auth-token": accessToken
            }
        })
        return {err: false, result: res}
    }catch(err){
        return {err: true, error: err}
    }
}
export { getCartByUserApi, checkoutCartApi }