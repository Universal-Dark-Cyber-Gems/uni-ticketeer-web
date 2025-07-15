import { useState } from "react"
import useLogin from "./useLogin"
import { checkoutCartApi, getCartByUserApi } from "../api/cartapi"
import getErrorMsg from "../utils/getErrorMsg"
import { useEffect } from "react"

export default function useCart(userId){
    let { accessToken, logout} = useLogin()
    let [cart, setCart] = useState(null)
    let [cartLoading, setCartLoading] = useState(false)
    let [cartStatus, setCartStatus] = useState({error: false, success: false, message: ""})

    async function getCart(){
        setCartLoading(true)
        let response = await getCartByUserApi(userId, accessToken)
        if(response.err){
            let errormsg = getErrorMsg(response)
            if(response.error?.response?.status === 401){
                logout()
                return
            }
            setCartStatus({error: true, success: false, message: errormsg})
            setCartLoading(false)
            return {success: false}
        }else{
            setCart(response?.result?.data?.data)
            setCartLoading(false)
            return{ success: true}
        }
    }

    async function checkoutCart(payload){
        setCartLoading(true)
        let response = await checkoutCartApi(payload, accessToken)
        if(response.err){
            let errormsg = getErrorMsg(response)
            if(response.error?.response?.status === 401){
                logout()
                return
            }
            setCartStatus({error: true, success: false, message: errormsg})
            setCartLoading(false)
            return {success: false}
        }else{
            setCartLoading(false)
            return { success: true, link: response?.result?.data?.data}
        }
    }

    useEffect(()=>{
        getCart()
    },[userId])

    return{
        cart,
        checkoutCart,
        cartLoading,
        cartStatus,
    }
}