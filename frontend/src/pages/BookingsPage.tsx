import axios from "axios"
import { differenceInCalendarDays, format } from "date-fns"
import { useEffect, useState } from "react"
import { Tilt } from "react-tilt"
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
                <div key={_id} className=" relative border min-h-[40vh] sm:w-60 lg:w-64 bg-gray-200 bg-opacity-50  shadow shadow-gray-500 rounded-2xl ">
                    <Tilt options={defaultOptions} className=" absolute top-[-40%] left-[15%] sm:left-[20%] drop-shadow-2xl  h-[30vh] w-40 -translate-y-[50%] -translate-x-[50%] rounded-2xl overflow-hidden" >
                        <img className="object-cover w-full h-full" src={`http://127.0.0.1:4000/uploads/${place.images[0]}`} alt="" />
                    </Tilt>
                    <div className=" flex flex-col w-full h-full  px-4 justify-center my-12 sm:my-10">
                        <h2 className="text-sm md:text-base">{book.place.title}</h2>
                         <div className="border-t border-gray-300 py-1">
                            <div className="flex flex-col ">
                                <div className=" flex gap-2 pb-2 items-center">
                                    <p className="font-bold">From:</p>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                    </svg>

                                    <span className="text-sm"> {format(new Date(checkin), 'yyyy-MM-dd')} </span>
                                </div>
                               {/* &rarr; */}
                            <div className="flex gap-2 items-center">
                                <p className="font-bold">To:</p>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                                </svg>

                                    <span className="text-sm">{format(new Date(checkout), 'yyyy-MM-dd')}</span>
                            </div>
                            </div>
                         </div>
                         <div className="font-semibold">
                            <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="rotate-180 w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                            </svg>
                                 {differenceInCalendarDays(new Date(checkout), new Date(checkin))} {differenceInCalendarDays(new Date(checkout), new Date(checkin)) === 1 ? 'night': 'nights'} <br />
                            </div>
                        Total Price: $ {price}
                    </div>
                    </div>
                    
                </div>
        )
    })
   return (
    <div className='relative max-w-6xl mx-auto px-4 grid grid-cols-2  md:grid-cols-3  lg:grid-cols-4 gap-x-4  py-20 gap-y-32 gap rounded-2xl'>
        
    {booking.length > 0 && BookingElement}
    </div>
  )
}

export default BookingsPage