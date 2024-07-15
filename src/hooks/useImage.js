import { useState } from "react"
import useLogin from "./useLogin"
import { uploadImageApi } from "../api/imageapi"
import { baseApiUrlTest } from "../config"

export default function useImage(){
    const { accessToken } = useLogin()
    let [isImageLoading, setIsImageLoading] = useState(false)
    let [imageStatus, setImageStatus] = useState({error: false, success: false, message: ""})

    async function uploadImage(blob){
        setIsImageLoading(true)
        let response = await uploadImageApi(blob, accessToken)
        console.log("result from uploading image", response)
        if(response.err){
            let errmsg = response.error?.response?.data?.data 
                        ? 
                        response.error?.response?.data?.data[0]?.message
                        :
                        response.error?.response?.data
                        ?
                        response.error?.response?.data?.message
                        :
                        response.error?.message
            setImageStatus({error: true, success: false, message: errmsg})
            setIsImageLoading(false)
        }else{
            setImageStatus({error: false, success: true, message: "Image uploaded successfully"})
            setIsImageLoading(false)
            return response.data?.data?.url
        }
    }
    return {isImageLoading, imageStatus, uploadImage}
}