import axios from "axios";
import { apiVersion, baseApiUrlTest } from "../config";

async function signupUser(payload){
    try{
        let res = await axios.post(`${baseApiUrlTest}${apiVersion}/users/register`, payload, {
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
        })
        return {err: false, data: res}
    }catch(err){
        return {err: true, error: err}
    }
}

export { signupUser }