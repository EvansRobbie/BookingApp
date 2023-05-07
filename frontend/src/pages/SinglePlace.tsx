import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AllPhotos from "../components/AllPhotos";
import Booking from "../components/Booking";
import Gallery from "../components/Gallery";
import AddressLink from "../components/AddressLink";
import PlaceTitle from "../components/PlaceTitle";

interface placeProp {
    _id:string
  title: string;
  address: string;
  images: string[];
  description: string
  checkIn: string
  checkOut: string
  extraInfo:string
  maxGuests:number
  prices: string
  
}


const SinglePlace = () => {
  const [place, setPlace] = useState<placeProp | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState<boolean>(false)
  const { id } = useParams();
  // console.log(id)
  useEffect(() => {
    if (!id) return;

    axios.get(`places/${id}`).then(({ data }) => setPlace(data));
  }, [id]);
  // console.log(place?.title)
  // const {title}  =  place

  return (
    <>
        {showAllPhotos ?  (
      <AllPhotos images ={place?.images} setShowAllPhotos ={setShowAllPhotos}/>
      ): (
        <div className="py-4 mt-20 max-w-6xl mx-auto ">
         <PlaceTitle>{place?.title}</PlaceTitle>
        <AddressLink>{place?.address}</AddressLink>
        <Gallery  images ={place?.images} setShowAllPhotos ={setShowAllPhotos}/>
        <Booking id={place?._id} checkIn = {place?.checkIn} checkOut={place?.checkOut} desc={place?.description} guest ={place?.maxGuests} price ={place?.prices}/>
      </div>

      ) }
    </>
  );
};

export default SinglePlace;
