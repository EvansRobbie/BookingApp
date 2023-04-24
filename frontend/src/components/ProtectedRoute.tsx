import { ReactNode} from 'react'
import { useUserContext } from '../context/UserContext'
import { Navigate, Route } from 'react-router-dom'

interface childrenProps {
  path: string;
    children: ReactNode
}

const ProtectedRoute = ({path, children}: childrenProps ) => {
    const { user } = useUserContext()
    // console.log(children)
    if (!user){
      return <Navigate to='/login' />
    }
  return <Route path={path}>
    
    {children}</Route>
  
}

export default ProtectedRoute