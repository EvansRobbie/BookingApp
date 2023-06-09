import {Link} from 'react-router-dom'
import { useGlobalContext } from '../context/GlobalContext'
import { useUserContext } from '../context/UserContext'

const Navbar  = () => {
    const { handleModal}= useGlobalContext()
    const {user}= useUserContext()
    // console.log(user?.name)
    
    // console.log(showModal)
  return (
    <div className='fixed top-0 left-0 opacity-100 w-full h-20 px-8 z-20 bg-white'>
        <header className='flex  items-center justify-between h-full w-full'>
            <Link to='/' className=" flex items-center gap-1">
                <div className=" -rotate-90 text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
                </div>
                <span className='font-bold text-2xl text-primary'>airbnb</span>
                
            </Link>
            <div className='hidden md:flex items-center border rounded-full py-1.5 px-6 gap-3 shadow shadow-gray-300 hover:shadow-xl overflow-hidden'>
                <div className='text-base font-semibold'>Anywhere</div>
                <div className=' border-l border-gray-300 font-light border  h-6 ' />
                <div className='text-base font-semibold'>Any week</div>
                <div className=' border-l border-gray-300 font-light border  h-6 ' />
                <div className='text-base  text-gray-500 truncate'>Add guests</div>
                <button className=' bg-primary text-white p-1 cursor-pointer relative -right-4 font-extrabold rounded-full '>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 p-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                </button>
            </div>

            <div onClick={handleModal} className=" flex border active:scale-105 rounded-full py-1.5 px-2 items-center gap-2 hover:shadow-xl shadow-gray-300">
                <div className='text-gray-600'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg>
                </div>
                <div className=" bg-gray-500 text-white rounded-full border border-gray-500 overflow-hidden">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1 ">
                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>

                </div>
                {!!user && (
                    <div>
                        {user.name}
                    </div>
                )}
            </div>
        </header>
    </div>
  )
}

export default Navbar