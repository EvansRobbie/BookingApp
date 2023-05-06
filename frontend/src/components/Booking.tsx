import React, { useEffect, useState } from "react";
import {differenceInCalendarDays} from 'date-fns'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
interface placeProp {
    id: string | undefined
  checkIn: string | undefined;
  checkOut: string | undefined;
  desc: string | undefined;
  guest: number | undefined;
  price: string | undefined;
}

const Booking: React.FC<placeProp> = ({
    id,
  checkIn,
  checkOut,
  desc,
  price,
  guest,
}) => {
    const navigate =  useNavigate()
    const {user} = useUserContext()
  const [checkin, setCheckIn] = useState<string>("");
  const [checkout, setCheckout] = useState<string>("");
  const [guests, setGuests] = useState<number>(1);
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')

  let numberOfNights  = 0
  if (checkout && checkin){
    numberOfNights = differenceInCalendarDays(new Date(checkout), new Date(checkin))
  }
  useEffect(() =>{
    if (user){
        setName(user.name)
      }
  }, [user])
 
  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuest = Number(e.target.value);
    setGuests(newGuest);
  };

  const BookAPlace = async () =>{
    const BookingData =  {
        place:id,
        checkin, checkout, guests, name, phone,
        price: numberOfNights * Number(price)
    }  
   const {data} = await axios.post('/booking', BookingData)
//    console.log(data._id)
//    console.log('clicked')
const bookingId = data._id
navigate(`/account/bookings/${bookingId}`)
   }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 py-4 my-2 px-4 md:px-0 gap-4">
      <div className="col-span-2">
        <h2 className="text-2xl font-semibold">Description</h2>
        <p className="text-gray-600 text-base">{desc}</p>

        <div className="flex flex-wrap gap-x-4 md:flex-col py-4 ">
          <span>
            {" "}
            <b>Check In: </b> {checkIn}
          </span>
          <span>
            {" "}
            <b>Check Out:</b> {checkOut}{" "}
          </span>
          <p>
            {" "}
            <b>Maximum number of Guests: </b> {guest}
          </p>
        </div>
      </div>
      <div className=" col-span-1">
        <div className="border p-4 max-w-sm mx-auto rounded-2xl shadow-2xl shadow-gray-400">
          <p className="text-xl font-bold">
            $ {price}{" "}
            <span className="font-medium text-base text-gray-500">night</span>
          </p>
          <div className="w-full pt-3">
            <div className="grid grid-cols-2 ">
              <div className="py-1 px-2  cursor-pointer flex flex-col border-[#c13515] border rounded-tl-2xl w-full ">
                <label
                  className="uppercase text-xs text-[#c13515] font-bold"
                  htmlFor="checkin"
                >
                  Check In
                </label>
                <input className="outline-none"
                  onChange={(e) => setCheckIn(e.target.value)}
                  value={checkin}
                  type="date"
                  id="checkin"
                />
              </div>
              <div className="py-1 px-2 cursor-pointer border-[#c13515] border rounded-tr-2xl flex flex-col  w-full ">
                <label
                  className="uppercase text-xs text-[#c13515] font-bold"
                  htmlFor="checkout"
                >
                  Check Out
                </label>
                <input className="outline-none"
                  onChange={(e) => setCheckout(e.target.value)}
                  value={checkout}
                  type="date"
                  id="checkout"
                />
              </div>
            </div>
            <div className="py-1 px-5 border border-gray-500 rounded-b-2xl cursor-pointer flex flex-col  ">
              <label className="text-xs" htmlFor="guests">
                Guests
              </label>
              <input className="outline-none"
                onChange={handleGuestChange}
                value={guests}
                type="number"
                id="guests"
                placeholder="1 Guest"
              />
            </div>
          </div>
          {numberOfNights > 0 && 
          <div className="my-4 flex flex-col gap-2">
          <div className="py-1 px-5 border border-gray-500 rounded-2xl cursor-pointer flex flex-col">
             <label className="text-xs" htmlFor="name">
                Your Full Name
              </label>
              <input className="outline-none"
                onChange={(e)=>setName(e.target.value)}
                value={name}
                type="text"
                id="name"
                placeholder="John Doe"
              />
          </div>
          <div className="py-1 px-5 border border-gray-500 rounded-2xl cursor-pointer flex flex-col">
             <label className="text-xs" htmlFor="phone">
                Phone Number
              </label>
              <input className="outline-none"
                onChange={(e)=>setPhone(e.target.value)}
                value={phone}
                type="tel"
                id="phone"
                placeholder="+254759 000 000"
              />
          </div>
          </div>
          }
          <button onClick={BookAPlace} className="bg-primary mt-4 w-full flex justify-around items-center rounded-2xl py-2.5 text-white active:scale-105 shadow-md duration-500 ease-in hover:shadow-secondary">
            Book this place
            {numberOfNights > 0 && typeof price !== 'undefined' && (<span> $ { numberOfNights * Number(price)}</span>)}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Booking;
