import { createContext, useContext } from "react"
import useUser from "../hooks/useUser"

export const UserContext = createContext(null)

export function UserProvider({children}){
    let { 
        user, 
        bankList,
        accountDetails, 
        userLoading, 
        organiserStats, 
        userStatus,
        addUserAccountDetails,
        editUserAccountDetails,
        withdrawOrganiserFunds
    } = useUser()


    return(
        <UserContext.Provider value={{
            user, 
            bankList,
            accountDetails, 
            userLoading,
            organiserStats, 
            userStatus,
            addUserAccountDetails,
            editUserAccountDetails,
            withdrawOrganiserFunds
        }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUserProvider(){
    return useContext(UserContext)
}