import { createContext, useContext } from "react"
import useUser from "../hooks/useUser"

export const UserContext = createContext(null)

export function UserProvider({children}){
    let { 
        user, 
        accountDetails, 
        userLoading, 
        organiserStats, 
        userStatus 
    } = useUser()


    return(
        <UserContext.Provider value={{
            user, 
            accountDetails, 
            userLoading,
            organiserStats, 
            userStatus
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserProvider(){
    return useContext(UserContext)
}