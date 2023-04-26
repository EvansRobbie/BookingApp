import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Perks from "../components/Perks";
import axios from "axios";
import PhotoUploads from "../components/PhotoUploads";

const Places = () => {
  const { action } = useParams();
  const navigate = useNavigate()
  // console.log(action)
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("")
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState<string[]>([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState<number>(1);

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

  const onSubmit =  (e:React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault()
    const data = {title, address, description, perks, extraInfo, checkIn, checkOut, maxGuests}
    axios.post('/places', data)
   navigate('/account/places')
  }
  return (
    <div>
      {action !== "new" && (
        <div className="text-center -mt-8">
          <Link
            to={``}
            className="bg-secondary hover:bg-primary rounded-full inline-flex  gap-3 px-6 py-2 text-white font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            Add new places
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
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
           <PhotoUploads/>

            {preInput("description", "Description", "Description of the place")}
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="outline-none border  rounded-xl px-6 py-2 w-full "
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
              className="outline-none border  rounded-xl px-6 py-2 w-full "
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
            <button className="bg-primary my-4 text-white rounded-2xl py-2 px-6">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Places;
