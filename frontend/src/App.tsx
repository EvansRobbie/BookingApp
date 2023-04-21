
import './App.css'
import Modal from './components/Modal'
import Navbar from './components/Navbar'
import { useGlobalContext } from './context/GlobalContext'
import { Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import { useEffect, useRef} from 'react'
import Register from './pages/Register'
import Home from './pages/Home'
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
    <div className="">
      <Navbar/>
      { showModal && <Modal modalRef = {modalRef}/>}
      <Routes> 
        <Route path='/' element={<Home/>} />
        <Route path= '/login' element={<Login/>}/>
        <Route path='/register' element = {<Register/>} />
      </Routes>
    </div>
  )
}

export default App
