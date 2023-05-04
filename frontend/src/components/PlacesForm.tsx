import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Perks from './Perks';
import PhotoUploads from './PhotoUploads';
import AccountNav from './AccountNav';

const PlacesForm = () => {
  const {id} = useParams()
  // console.log(params)
  const navigate = useNavigate()
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("")
  const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState<string[]>([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState<number>(1);
  const [prices, setPrices] = useState<number>(100)

  useEffect(() =>{
    if(!id) return;
    axios.get(`places/${id}`).then(({data}) =>{
        // console.log(data)
        const {title, address, images, description, perks, extraInfo, checkIn, checkOut, maxGuests, prices } = data
        // console.log(perks)
        setTitle(title)
        setAddress(address)
        setAddedPhotos(images)
        setDescription(description)
        setPerks(perks)
        setExtraInfo(extraInfo)
        setCheckIn(checkIn)
        setCheckOut(checkOut)
        setMaxGuests(maxGuests)
        setPrices(prices)
    })
  }, [id])
  const Labels = (name: string, text: string) => {
    return (
      <label htmlFor={name} className="text-xl mt-4 font-semibold">
        {text}
      </label>
    );
  };
  const Paragraphs = (text: string) => {
    return <p className="text-gray-500 text-sm">{text}</p>;
  };

  const preInput = (name: string, header: string, description: string) => {
    return (
      <>
        {Labels(name, header)}
        {Paragraphs(description)}
      </>
    );
  };

  const handleGuestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuestValue = Number(e.target.value);
    setMaxGuests(newGuestValue);
  };
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPrice = Number(e.target.value);
    setPrices(newPrice);
  };

  const onSubmit = async   (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const data = {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, prices}
    if (id){
      // update place
     await axios.put('/places',{
        id, ...data
      })
    } else{
      // new place
      await axios.post('/places', data)

    }
   navigate('/account/places')
  }
  return (
    <>
      <AccountNav/>
         <form onSubmit= {onSubmit} className="flex flex-col px-4 -mt-10">
            {preInput(
              "title",
              "Title",
              "Title for your place. Should be short and catchy"
            )}
            <input
              type="text "
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="outline-none border  rounded-xl px-6 py-2"
              id="title"
              placeholder="title, for example: My Lovely Apartment"
            />

            {preInput("address", "Address", "Address to your place")}
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="outline-none border rounded-xl px-6 py-2"
              id="address"
              placeholder="Address"
            />

            {preInput("photos", "Photos", "More = better")}
           <PhotoUploads addedPhotos ={addedPhotos} setAddedPhotos={setAddedPhotos}/>

            {preInput("description", "Description", "Description of the place")}
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="outline-none border h-[200px] rounded-xl px-6 py-2 w-full "
            />

            {preInput("perks", "Perks", "select all the parks of your places")}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 my-2">
              <Perks perks={perks} onChange={setPerks} />
            </div>

            {preInput("extra", "Extra info", "house rules, etc")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
              id="extra"
              className="outline-none border h-[200px] rounded-xl px-6 py-2 w-full "
            />

            <h2 className="text-xl mt-4 font-semibold">
              Check in&out times, max guests
            </h2>
            <p className="text-gray-500 text-sm">
              Add check in and out times, remember to have some time window for
              cleaning
            </p>
            <div className="grid sm:grid-cols-3 gap-2 items-center">
              <div className="flex flex-col my-1">
                <label className="text-lg mt-4 font-semibold" htmlFor="checkin">
                  {" "}
                  Check in time
                </label>
                <input
                  id="checkin"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="outline-none border rounded-xl px-6 py-2"
                  type="text"
                  placeholder="13:00"
                />
              </div>
              <div className="flex flex-col my-1">
                <label
                  className="text-lg mt-4 font-semibold"
                  htmlFor="checkout"
                >
                  Check out time
                </label>
                <input
                  id="checkout"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="outline-none border rounded-xl px-6 py-2"
                  placeholder="17:00"
                  type="text"
                />
              </div>
              <div className="flex flex-col my-1">
                <label className="text-lg mt-4 font-semibold" htmlFor="guests">
                  Max number of Guests
                </label>
                <input
                  value={maxGuests}
                  onChange={handleGuestChange}
                  className="outline-none border rounded-xl px-6 py-2"
                  id="guests"
                  type="number"
                />
              </div>
              
            </div>
            <div className="flex flex-col my-1 w-full">
                <label className="text-lg mt-4 font-semibold " htmlFor="prices">
                  Price per night
                </label>
                <input
                  value={prices}
                  onChange={handlePriceChange}
                  className="outline-none border rounded-xl px-6 py-2"
                  id="prices"
                  type="number"
                />
              </div>
            <button className="bg-primary my-4 text-white rounded-2xl py-2 px-6">
              Save
            </button>
          </form>
    </>
  )
}

export default PlacesForm