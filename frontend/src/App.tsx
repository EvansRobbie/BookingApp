
import './App.css'
import Modal from './components/Modal'
import Navbar from './components/Navbar'
import UserContextProvider from './context/UserContext'
import { useGlobalContext } from './context/GlobalContext'
import { Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import { useEffect, useRef} from 'react'
import Register from './pages/Register'
import Home from './pages/Home'
import axios from 'axios'
import Account from './pages/Account'
import PlacesForm from './components/PlacesForm'
import SinglePlace from './pages/SinglePlace'
import BookingsPage from './pages/BookingsPage'
import BookingPage from './pages/BookingPage'


axios.defaults.baseURL = 'http://127.0.0.1:4000'
axios.defaults.withCredentials =  true
function App() {
  const { showModal, setShowModal} = useGlobalContext()
  const modalRef = useRef<HTMLDivElement | null>(null)
 
      const handleClickOutside = (e: MouseEvent) =>{
          if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            setShowModal(false);
          }
        }
    
  useEffect(() => {
     
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);
  // console.log(showModal)
  return (
    
      <UserContextProvider>

      <Navbar/>
      { showModal && <Modal modalRef = {modalRef}/>}
      <Routes> 
        <Route path='/' element={<Home/>} />
        <Route path= '/login' element={<Login/>}/>
        <Route path='/register' element = {<Register/>} />
        <Route path='/account/:subpages?' element =  {<Account/>} />
        <Route path='/account/:subpages/:action' element =  {<Account/>} />
        <Route path='/account/places/new' element =  {<PlacesForm/>} />
        <Route path='/account/places/:id' element =  {<PlacesForm/>} />
        <Route path='/account/bookings/:id' element={<BookingPage/>}/>
        <Route path='/places/:id' element={<SinglePlace/>}/>
        
      </Routes>
    
      </UserContextProvider>
  )
}

export default App
