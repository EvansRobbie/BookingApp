import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Images from '../components/Images'
interface placeProps {
  _id:string
  title:string
  images: string[]
  address: string
}

const Home:React.FC = () => {
  const [places, setPlaces] = useState<placeProps[]>([])
  useEffect(() =>{
    const fetchPlaces = async () =>{
      try{
        const {data} = await axios.get('/places')
        setPlaces([...data, ...data, ...data, ...data, ...data] )
      }catch(e){
        console.log(e)
      }
    }
    fetchPlaces()
  },[])
  // console.log(places)

  const placeElement = places.map((place)=>{
    const {_id, title, images, address} = place
    return(
      <div key={_id}>
        
          {images?.[0] && <Images images= {images}/> }
          
        
        <h2 className="text-sm">{title}</h2>
        <h3 className="font-bold">{address}</h3>
      </div>
    )
  })
  return (
    <div className='relative py-16 mt-8 max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-8'>
      {places.length > 0 && placeElement}
    </div>
  )
}

export default Home