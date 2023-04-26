import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

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
}
const PlacesDisplay = () => {
    const [places, setPlaces] = useState< placeProps[]>([])
  
  // console.log(action)
  useEffect(()=>{
    axios.get('/places').then(({data}) =>{
        setPlaces(data)
    })
  }, [])
    const placesElement = places.map((place)=>{
        const { _id: id, title, address, description, images, extraInfo, perks, checkIn, checkOut, maxGuests} = place
        return(

            <Link key={id} to={`/account/places/${id}`} className="bg-gray-200 p-4 cursor-pointer rounded-2xl flex gap-4">
                <div className="w-32 h-32 bg-gray-300 rounded-2xl grow shrink-0 ">
                    {images.length > 0 && (
                        <img src={images[0]} alt="" />
                    )}
                </div>
                <div className="">
                    <h2 className="text-xl">{title}</h2>
                    <p className="text-sm">{description}</p>
                </div>
                
            </Link>
        )
    })
  return (
    <>
        {places.length > 0 && placesElement}
    </>
  )
}

export default PlacesDisplay