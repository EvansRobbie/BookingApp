import React from 'react'
// type placeProp = {
//     images:string[]
// }
interface photoProp {
    images: string[] | undefined
    // images:string[]
    setShowAllPhotos: React.Dispatch<React.SetStateAction<boolean>>
  }
const AllPhotos:React.FC<photoProp> = ({images = [], setShowAllPhotos}) => {
    // console.log(images)
  return (
      
          <div className="absolute z-40 inset-0 opacity-100 bg-white min-h-screen py-6 px-4">
            <button onClick={()=> setShowAllPhotos(false)} className="hover:bg-black hover:bg-opacity-5 rounded-full p-1 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
            </svg>
            </button>
            <div className="grid gap-3 justify-items-center py-8 bg-white">
                {images && images.map((image, index)=>{
                    return (
                        <div key={index} className=" w-7/12 h-[70vh] overflow-hidden hover:brightness-75 duration-300 ease-in">
                            <img className="w-full h-full" src={`http://127.0.0.1:4000/uploads/${image }`} alt="" />
                        </div>
                    )
                })}
            </div>
        </div>
    
  )
}

export default AllPhotos