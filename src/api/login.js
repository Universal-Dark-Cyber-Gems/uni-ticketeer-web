import { baseApiUrlTest } from "../config"
import axios from 'axios'

async function loginUser(payload){
    try{
        let res = await axios.post(baseApiUrlTest+"/users/login",
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

export {
    loginUser
}