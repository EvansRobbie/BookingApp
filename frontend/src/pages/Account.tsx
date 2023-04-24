import { useUserContext } from '../context/UserContext'
import { Link,  Navigate, useParams } from 'react-router-dom'

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

    const navlinks = (type:null | undefined | string = null) => {
      let styles = 'px-4 py-2'

      if (type === subpages){
        styles += ' bg-primary text-white rounded-full'
      }
      return styles
      
    }

  
  return (
    <div className=' relative w-full h-screen'>
        <nav className='my-24 flex items-center justify-center'>
          <Link to ='/account' className={navlinks('profile')}>My Profile</Link>
          <Link to ='/account/bookings' className={navlinks('bookings')}>My Bookings</Link>
          <Link to ='/account/accomodations'  className={navlinks('accomodations')}>My Accomodations</Link>
        </nav>
        {subpages === 'profile' && (
          <div className='text-center text-base'>
            Logged in as <span className='font-semibold text-lg'>{user?.name} ({user?.email}) </span>  <br />
            <button onClick={handleLogout} className='bg-primary px-4 py-1 active:scale-105 hover:shadow-md shadow-gray-300  text-white rounded-full max-w-sm my-4'>Logout</button>
          </div>
        )}
    </div>
  )
}

export default Account