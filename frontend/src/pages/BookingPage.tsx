import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Gallery from '../components/Gallery'
import AllPhotos from '../components/AllPhotos'
import AddressLink from '../components/AddressLink'
import PlaceTitle from '../components/PlaceTitle'
import BookDates from '../components/BookDates'

interface placeProp {
  _id:string
  checkin?: string 
  checkout?: string 
  place:{
    title: string;
    address: string;
    images: string[] ;
    description: string
  }

extraInfo:string
maxGuests:number
price: string

}

const BookingPage = () => {
    const {id} = useParams()
    const [booking, setBooking] = useState<placeProp | null>(null)
    const [ShowAllPhotos, setShowAllPhotos] = useState(false)
    const formattedCheckin = booking?.checkin || '';
    const formattedCheckout = booking?.checkout || '';
    useEffect(() =>{
        axios.get('/booking').then(({data})=>{
          const foundBooking = data.find(({_id}:{_id:string})=> _id === id)
          // if(foundBooking){
          //     setBooking(foundBooking)
          // }
          foundBooking ? setBooking(foundBooking) : ''
        })
    },[id])
    // console.log(booking)
  return (
    <div className='my-20'>
      {ShowAllPhotos ?
      <AllPhotos images={booking?.place.images} setShowAllPhotos={setShowAllPhotos}/> :
      <div className="py-4 px-4 mt-20 max-w-6xl mx-auto ">
      <PlaceTitle>{booking?.place.title}</PlaceTitle>
      <AddressLink>{booking?.place.address}</AddressLink>
      <div className='bg-gray-300  rounded-2xl px-4 mt-4 py-2 flex items-center justify-between'>

      <BookDates checkin={formattedCheckin} checkout={formattedCheckout} ifExists/>
      <div className='bg-primary text-white rounded-2xl px-4 py-2 flex flex-col items-center drop-shadow-sm '>
        <div>Total Price</div>
        <div className="font-bold">$ {booking?.price}</div>
      </div>
      </div>
      <Gallery images={booking?.place.images} setShowAllPhotos={setShowAllPhotos}/>
      </div>
    }
    </div>
  )
}

export default BookingPage