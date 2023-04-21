import React, {useState,  createContext, useContext, } from 'react'

type childrenProps = {
    children: React.ReactNode
}
type modalContextProp ={
    showModal: boolean 
    setShowModal:React.Dispatch<React.SetStateAction<boolean>>
    handleModal: () => void
}

 const GlobalContext = createContext({} as modalContextProp)
const GlobalContextProvider = ({children}:childrenProps) => {
    const [showModal, setShowModal] = useState<boolean >(false)
    const handleModal = () =>{
        setShowModal(!showModal)
    }
    
  return (
    <GlobalContext.Provider value={{showModal, setShowModal, handleModal}}>
        {children}
    </GlobalContext.Provider>
 
  )
}
export const useGlobalContext =  () =>{
    return useContext(GlobalContext)
}
export default GlobalContextProvider