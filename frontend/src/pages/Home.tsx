import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Images from '../components/Images'
import { Link } from 'react-router-dom'
interface placeProps {
  _id:string
  title:string
  images: string[]
  address: string
  prices:number
}

const Home:React.FC = () => {
  const [places, setPlaces] = useState<placeProps[]>([])
  useEffect(() =>{
    const fetchPlaces = async () =>{
      try{
        const {data} = await axios.get('/places')
        setPlaces(data )
      }catch(e){
        console.log(e)
      }
    }
    fetchPlaces()
  },[])
  // console.log(places)

  const placeElement = places.map((place)=>{
    const {_id, title, images, address, prices} = place
    return(
      <div className='relative z-10'key={_id}>
        
          {images?.[0] && <Images images= {images} id = {_id}/> }
          
        
        <Link to={`places/${_id}`}>
          <h2 className="font-bold truncate">{address}</h2>
          <h3 className="text-sm truncate">{title}</h3>
          <div className='py-2'>
            <span className="font-bold">$ {prices} night</span>
          </div>
        </Link> 
      
  
      </div>
    )
  })
  return (
    <div className='relative py-16 mt-8 px-4 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8'>
      {places.length > 0 && placeElement}
    </div>
  )
}

export default Home