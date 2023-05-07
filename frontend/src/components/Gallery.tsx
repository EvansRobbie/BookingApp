import React from 'react'
interface photoProp {
    images: string[] | undefined
    // images:string[]
    setShowAllPhotos: React.Dispatch<React.SetStateAction<boolean>>
  }

const Gallery:React.FC<photoProp> = ({images= [], setShowAllPhotos}) => {
  return (
    <div className="relative px-2">

        <div className=" grid grid-cols-1 md:grid-cols-2 gap-2 py-5">
            <div className="flex h-[55vh] rounded-t-2xl md:rounded-t-none md:rounded-tl-2xl md:rounded-bl-2xl overflow-hidden">
            {images?.[0] && (
                <img onClick={()=>setShowAllPhotos(true)}
                className=" hover:brightness-75 cursor-pointer duration-300 ease-in  w-full h-full"
                src={`http://127.0.0.1:4000/uploads/${images[0]}`}
                alt="/"
                />
            )}
            </div>
            <div className="grid grid-cols-2 gap-2 ">
            {images?.[1] && (
                
                <img onClick={()=>setShowAllPhotos(true)}
                className=" hover:brightness-75 cursor-pointer duration-300 ease-in aspect-[1.4]  md:aspect-[1.75] h-full object-fill "
                src={`http://127.0.0.1:4000/uploads/${images[1]}`}
                alt="/"
                />
            )}

            {images?.[2] && (
                <img onClick={()=>setShowAllPhotos(true)}
                className=" hover:brightness-75 cursor-pointer duration-300 ease-in aspect-[1.4]  md:aspect-[1.75] object-fill h-full md:rounded-tr-2xl overflow-hidden"
                src={`http://127.0.0.1:4000/uploads/${images[2]}`}
                alt="/"
                />
            )}
            {images?.[3] && (
                <img onClick={()=>setShowAllPhotos(true)}
                className=" hover:brightness-75 cursor-pointer rounded-bl-2xl md:rounded-none  duration-300 ease-in h-full"
                src={`http://127.0.0.1:4000/uploads/${images[3]}`}
                alt="/"
                />
            )}
            {images?.[4] && (
                <img onClick={()=>setShowAllPhotos(true)}
                className=" hover:brightness-75 cursor-pointer duration-300 ease-in  h-full rounded-br-2xl  md:rounded-br-2xl overflow-hidden"
                src={`http://127.0.0.1:4000/uploads/${images[4]}`}
                alt="/"
                />
            )}
            </div>
        
        
        </div>
          <button onClick={()=> setShowAllPhotos(true)} className="flex absolute md:bottom-12 bottom-9 right-3 md:right-8 bg-white px-3 py-1 text-gray-800 rounded-xl items-center shadow-gray-700 shadow-sm border-gray-900 border gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h2.25a3 3 0 013 3v2.25a3 3 0 01-3 3H6a3 3 0 01-3-3V6zm9.75 0a3 3 0 013-3H18a3 3 0 013 3v2.25a3 3 0 01-3 3h-2.25a3 3 0 01-3-3V6zM3 15.75a3 3 0 013-3h2.25a3 3 0 013 3V18a3 3 0 01-3 3H6a3 3 0 01-3-3v-2.25zm9.75 0a3 3 0 013-3H18a3 3 0 013 3V18a3 3 0 01-3 3h-2.25a3 3 0 01-3-3v-2.25z" clipRule="evenodd" />
            </svg>

            <span>Show all photos</span>
          </button>
      </div> 
  )
}

export default Gallery