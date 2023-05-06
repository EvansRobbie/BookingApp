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
      <Link to={`places/${_id}`} key={_id}>
        
          {images?.[0] && <Images images= {images}/> }
          
        
        
        <h2 className="font-bold">{address}</h2>
        <h3 className="text-sm">{title}</h3>
        <div className='py-2'>
          <span className="font-bold">$ {prices} per night</span>
        </div>
      </Link>
    )
  })
  return (
    <div className='relative py-16 mt-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8'>
      {places.length > 0 && placeElement}
    </div>
  )
}

export default Home