import { useUserContext } from '../context/UserContext'
import { Link,  NavLink,  Navigate, useParams } from 'react-router-dom'
import Places from './Places'
import AccountNav from '../components/AccountNav'

const Account = () => {
    const { user, ready, handleLogout } = useUserContext()
    
    
    let {subpages} = useParams()
    if (subpages === undefined){ 
      
      subpages ='profile'
    } 
    

    if (!ready){
      return <div className='flex items-center w-full h-screen justify-center'>Loading..</div>
    }
    if (!user && ready ){
      return <Navigate to='/login'   />
    }
    
    // console.log({subpages})

  
  
  return (
    <div className=' relative w-full h-screen'>
       <AccountNav />
        {subpages === 'profile' && (
          <div className='text-center text-base'>
            Logged in as <span className='font-semibold text-lg'>{user?.name} ({user?.email}) </span>  <br />
            <button onClick={handleLogout} className='bg-secondary hover:bg-primary px-4 py-1 active:scale-105 hover:shadow-md shadow-gray-300  text-white rounded-full max-w-sm my-4'>Logout</button>
          </div>
        )}
        { subpages === 'places' && (
          <Places/>
        )}
    </div>
  )
}

export default Account