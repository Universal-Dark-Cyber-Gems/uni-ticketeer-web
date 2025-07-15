import { createContext, useContext } from "react"
import useCart from "../hooks/useCart"
import { useUserProvider } from "./UserContext"

const CartContext = createContext(null)

export function CartProvider({children}){
    let userProvider = useUserProvider()
    let { cart, cartLoading, cartStatus } = useCart(userProvider?.user?._id)
    return(
        <CartContext.Provider
            value={{cart, cartLoading, cartStatus}}
        >
            {children}
        </CartContext.Provider>
    )
}

export function useCartProvider(){
    return useContext(CartContext)
}