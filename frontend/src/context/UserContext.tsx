import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import axios from 'axios'
type childProp = {
    children : ReactNode
}
type userProps = {
    user: {name: string} | null,
    setUser: React.Dispatch<React.SetStateAction<{name:string }| null>>
}
const userContext =  createContext({} as userProps)

const UserContextProvider = ({children}: childProp ) =>{
    const [user, setUser] = useState<null | {name: string}>(null)
    // Grab user credentionals on page load if the user is already logged in
    useEffect( () =>{
        const fetchUser = async () =>{
            if (!user) {
             const {data} =  await axios.get('/profile')
             setUser(data)
            }
        }
        fetchUser()
    }, [])
    return(
        <userContext.Provider value = {{user, setUser}}>
            {children}
        </userContext.Provider>
    )
}
export const useUserContext = () =>{
  return  useContext(userContext)
}

export default UserContextProvider