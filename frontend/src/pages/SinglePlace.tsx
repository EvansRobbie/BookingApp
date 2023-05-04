import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface placeProp {
  title: string;
  address: string;
  images: string[];
}

const SinglePlace = () => {
  const [place, setPlace] = useState<placeProp | null>(null);
  const [showAllPhotos, setShowAllPhotos] = useState(false)
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
        <div className="absolute z-40 inset-0 opacity-100 bg-white min-h-screen py-6 px-4">
            <button onClick={()=> setShowAllPhotos(false)} className="hover:bg-black hover:bg-opacity-5 rounded-full p-1 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
            </svg>
            </button>
            <div className="grid gap-3 justify-items-center py-8 bg-white">
                {place?.images && place?.images.map((image, index)=>{
                    return (
                        <div key={index} className=" w-7/12 h-[70vh] overflow-hidden hover:brightness-50">
                            <img className="w-full h-full" src={`http://127.0.0.1:4000/uploads/${image }`} alt="" />
                        </div>
                    )
                })}
            </div>
        </div>
      ): (
        <div className="py-4 mt-20 max-w-6xl mx-auto ">
      <h1 className="font-semibold text-2xl">{place?.title}</h1>
      <a
        className="font-bold underline underline-offset-2"
        href={`https://maps.google.com/?q=${place?.address}`}
        target="_blank"
      >
        {place?.address}
      </a>
      <div className="relative">

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 py-5">
            <div className="flex h-[53vh] rounded-tl-2xl rounded-bl-2xl overflow-hidden">
            {place?.images?.[0] && (
                <img
                className=" w-full"
                src={`http://127.0.0.1:4000/uploads/${place?.images[0]}`}
                alt="/"
                />
            )}
            </div>
            <div className="grid grid-cols-2 gap-2 ">
            {place?.images?.[1] && (
                
                <img
                className=" aspect-[1.75] h-full object-fill "
                src={`http://127.0.0.1:4000/uploads/${place?.images[1]}`}
                alt="/"
                />
            )}

            {place?.images?.[2] && (
                <img
                className="aspect-[1.75] object-fill h-full rounded-tr-2xl overflow-hidden"
                src={`http://127.0.0.1:4000/uploads/${place?.images[2]}`}
                alt="/"
                />
            )}
            {place?.images?.[3] && (
                <img
                className="h-full"
                src={`http://127.0.0.1:4000/uploads/${place?.images[3]}`}
                alt="/"
                />
            )}
            {place?.images?.[4] && (
                <img
                className=" h-full  rounded-br-2xl overflow-hidden"
                src={`http://127.0.0.1:4000/uploads/${place?.images[4]}`}
                alt="/"
                />
            )}
            </div>
        
        
      </div>
      <button onClick={()=> setShowAllPhotos(true)} className="flex absolute bottom-12 right-8 bg-white px-3 py-1 text-gray-800 rounded-xl items-center shadow-gray-700 shadow-sm border-gray-900 border gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
        </svg>

        <span>Show all photos</span>
      </button>
      </div> 
      </div>
      ) }
    </>
  );
};

export default SinglePlace;
