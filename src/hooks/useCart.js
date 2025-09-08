import { useState } from "react"
import useLogin from "./useLogin"
import { checkoutCartApi, deleteCartItemApi, getCartByUserApi } from "../api/cartapi"
import getErrorMsg from "../utils/getErrorMsg"
import { useEffect } from "react"
import handleErrorCase from "../utils/handleErrorCase"
import useUser from "./useUser"

export default function useCart(){
    let { accessToken, logout} = useLogin()
    let { user } = useUser()
    let [cart, setCart] = useState(null)
    let [cartLoading, setCartLoading] = useState(false)
    let [cartStatus, setCartStatus] = useState({error: false, success: false, message: ""})

    let userId = user?._id

    console.log("user id fed into useCart hook from userprovider", userId)
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
            console.log(response)
            handleErrorCase(response, logout, setCartStatus, setCartLoading, true)
            return {success: false}
        }else{
            getCart()
            return { success: true, link: response?.result?.data?.data}
        }
    }

    async function deleteCartItem(id){
        setCartLoading(true)
        let response = await deleteCartItemApi(id, accessToken)
        console.log("response from delete cart", response)
        if(response.err){
            handleErrorCase(response, logout, setCartStatus, setCartLoading, true)
            return { success: false }
        }else{
            let res = await getCart()
            if(res.success === false){
                setCart(null)
            }
            setCartLoading(false)
            return { success: true }
        }
    }

    useEffect(()=>{
        getCart()
    }, [userId])

    return{
        cart,
        getCart,
        checkoutCart,
        deleteCartItem,
        cartLoading,
        cartStatus,
    }
}