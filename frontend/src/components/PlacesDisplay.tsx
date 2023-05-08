import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Image from './Image'

interface placeProps {
    _id: string
    title: string
    address: string
    images: string[]
    description: string
    perks: string[]
    extraInfo: string
    checkIn: number
    checkOut:number
    maxGuests: number
    prices: string
}
interface strProp{

    str:string
    num: number
}
const PlacesDisplay = () => {
    const [places, setPlaces] = useState< placeProps[]>([])
  
  // console.log(action)
  useEffect(()=>{
    axios.get('/user-places').then(({data}) =>{
        setPlaces(data)
    })
  }, [])
  const truncate= (str:string, num: number) =>{
    if (str.length > num){
       return str.slice(0, num) + '...'
    }
    return str
  }
    const placesElement = places.map((place)=>{
        // console.log(places)
        const { _id: id, title, address, description, images, extraInfo, perks, checkIn, checkOut, maxGuests} = place
        return(

            <Link key={id} to={`/account/places/${id}`} className="bg-gray-200 p-4 cursor-pointer rounded-2xl flex gap-4">
                <div className="w-32 h-32 bg-gray-300 rounded-xl grow shrink-0 overflow-hidden flex ">
                    {images.length > 0 && (
                        <Image className=' object-cover hover:scale-105 duration-500 ease-in transition-all' src={images[0]} />
                    )}
                </div>
                <div className="">
                    <h2 className="text-xl font-medium">{title}</h2>
                    <p className="text-sm">{truncate(description, 200)}</p>
                </div>
                
            </Link>
        )
    })
  return (
    <div className='flex flex-col gap-y-4 py-2'>
        {places.length > 0 && placesElement}
    </div>
  )
}

export default PlacesDisplay