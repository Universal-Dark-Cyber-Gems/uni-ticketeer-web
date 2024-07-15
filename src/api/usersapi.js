import axios from "axios"
import { baseApiUrlTest } from "../config"

export async function getUserApi(accessToken){
    try{
        let result = await axios.get(`${baseApiUrlTest}/users/profile`, {
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