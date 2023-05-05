import axios from "axios"
import { useEffect, useState } from "react"
interface bookProps{
    _id: string
    checkin:string
    checkout: string
    guests: number
    place:string
    price:number
}

const BookingsPage = () => {
    const [booking, setBooking] = useState<bookProps[]>([])
    useEffect(()=>{
        axios.get('/booking').then(({data})=>{
            setBooking(data)
        })
    }, [])
    // console.log(booking)
    const BookingElement = booking.map((book)=>{
        const {_id, checkin, checkout, price, place, guests} = book
        return(
                <div>{checkin}</div>
        )
    })
   return (
    <div className='mt-32'>
        
    {BookingElement}
    </div>
  )
}

export default BookingsPage