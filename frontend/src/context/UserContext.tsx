import {createContext, ReactNode, useContext, useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
type childProp = {
    children : ReactNode
}
type userProps = {
    user: {name: string, email: string} | null,
    setUser: React.Dispatch<React.SetStateAction<{name:string , email: string }| null>>
    ready: boolean
    handleLogout: () => void
    // setReady:  React.Dispatch<React.SetStateAction<boolean>>
}
const userContext =  createContext({} as userProps)

const UserContextProvider = ({children}: childProp ) =>{
    const navigate = useNavigate()
    const [user, setUser] = useState<null | {name: string , email: string}>(null)
    // this state will prevent theprotected rout from going back to login on refresh
    const [ ready, setReady] = useState<boolean>(false)
    // Grab user credentionals on page load if the user is already logged in
    
    useEffect( () =>{
        const fetchUser = async () =>{
            if (!user) {
             const {data} =  await axios.get('/profile')
             setUser(data)
             setReady(true)
            }
        }
        fetchUser()
    }, [])
    const handleLogout = async () =>{
        await axios.post('/logout')
        setUser(null)
        navigate('/')
        
      }
    return(
        <userContext.Provider value = {{user, setUser, ready, handleLogout}}>
            {children}
        </userContext.Provider>
    )
}
export const useUserContext = () =>{
  return  useContext(userContext)
}

export default UserContextProvider