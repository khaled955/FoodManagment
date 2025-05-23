/* eslint-disable react-refresh/only-export-components */
import { createContext, useState ,ReactNode} from "react";
import { userAuthData } from "../interfaces/interfaces";



 export const UserToken = createContext<userAuthData | undefined>(undefined)

export default function UserAuthProvider({children}:{children:ReactNode}){
const [userAuth , setUserAuth] = useState(()=>localStorage.getItem("userToken"))

    return <UserToken.Provider value={{userAuth,setUserAuth}}>
    {children}
    </UserToken.Provider>
}