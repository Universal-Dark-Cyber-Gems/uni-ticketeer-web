import axios from "axios"
import { apiVersion, baseApiUrlTest } from "../config";

async function uploadImageApi(blob, accessToken){
    let data = new FormData();
    data.append('img', blob);
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `${baseApiUrlTest}${apiVersion}/uploadimage`,
      headers: { 
        'Authorization': `Bearer ${accessToken}`
      },
      data : data
    }

    try{
        let res = await axios.request(config)
        return {err: false, data: res.data }
    }catch(e){
        console.log(e)
        return {err: true, error: e}
    }
    
}

export { uploadImageApi }

