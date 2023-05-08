import axios from "axios"
// import { differenceInCalendarDays, format } from "date-fns"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Tilt } from "react-tilt"
import BookDates from "../components/BookDates"
import Image from "../components/Image"
interface bookProps{
    _id: string
    checkin:string
    checkout: string
    guests: number
    place:{
        images:string[]
        title:string
    }
    price:number
}

const BookingsPage = () => {
    const [booking, setBooking] = useState<bookProps[]>([])
    useEffect(()=>{
        axios.get('/booking').then(({data})=>{
            setBooking(data)
        })
    }, [])
    const defaultOptions = {
        max:45,
        scale: 1,
        speed:450
    }
    // console.log(booking)
    const BookingElement = booking.map((book)=>{
        const {_id, checkin, checkout, price, place, guests} = book
        return(
                <Link to={`/account/bookings/${_id}`} key={_id} className=" relative border min-h-[48vh] sm:min-h-[35vh] md:min-h-[27vh]  lg:min-h-[50vh] xl:min-h-[45vh] xl:w-64 sm:w-60 md:w-60 lg:w-56 bg-gray-200 bg-opacity-50  shadow shadow-gray-500 rounded-3xl ">
                    <Tilt options={defaultOptions}>
                        <div  className=" absolute top-0 left-[50%] drop-shadow-2xl h-[33vh] sm:h-[25vh] md:h-[20vh] lg:h-[30vh] w-72 sm:w-36 md:w-40 xl:w-44 -translate-y-[50%] -translate-x-[50%] rounded-2xl overflow-hidden" >
                             <Image className="object-cover w-full h-full" src={place.images[0]} />
                        </div>
                    </Tilt>
                    <div className=" flex flex-col w-full h-full  px-4 justify-center my-14 sm:my-10">
                        <h2 className="text-sm md:text-base">{book.place.title}</h2>
                         <div className="border-t border-gray-300 py-1">
                           <BookDates checkin= {checkin} checkout={checkout}/>
                        Total Price: $&nbsp;{price}
                        </div>
                    </div>
                    
                </Link>
        )
    })
   return (
    <div className='relative max-w-6xl mx-auto px-4 grid  sm:grid-cols-2  md:grid-cols-3  lg:grid-cols-4 gap-x-4 py-16 sm:py-10 md:py-16 gap-y-40 sm:gap-y-32 md:gap-y-40 rounded-2xl'>
        
    {booking.length > 0 && BookingElement}
    </div>
  )
}

export default BookingsPage