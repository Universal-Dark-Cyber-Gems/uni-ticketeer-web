import { useState } from "react"
import useLogin from "./useLogin"
import { checkoutCartApi, deleteCartItemApi, getCartByUserApi } from "../api/cartapi"
import getErrorMsg from "../utils/getErrorMsg"
import { useEffect } from "react"
import handleErrorCase from "../utils/handleErrorCase"

export default function useCart(userId){
    let { accessToken, logout} = useLogin()
    let [cart, setCart] = useState(null)
    let [cartLoading, setCartLoading] = useState(false)
    let [cartStatus, setCartStatus] = useState({error: false, success: false, message: ""})

    async function getCart(){
        setCartLoading(true)
        let response = await getCartByUserApi(userId, accessToken)
        if(response.err){
            handleErrorCase(response, logout, setCartStatus, setCartLoading)
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
            handleErrorCase(response, logout, setCartStatus, setCartLoading)
            return {success: false}
        }else{
            setCartLoading(false)
            return { success: true, link: response?.result?.data?.data}
        }
    }

    async function deleteCartItem(id){
        setCartLoading(true)
        let response = await deleteCartItemApi(id, accessToken)
        if(response.err){
            handleErrorCase(response, logout, setCartStatus, setCartLoading)
            return { success: false }
        }else{
            setCart(response?.result?.data?.data)
            setCartLoading(false)
            return { success: true }
        }
    }

    useEffect(()=>{
        getCart()
    },[userId])

    return{
        cart,
        checkoutCart,
        deleteCartItem,
        cartLoading,
        cartStatus,
    }
}