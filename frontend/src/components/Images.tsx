import React, { useState } from 'react'
import { Link } from 'react-router-dom';

const Images = ({images, id}: {images: string[], id:string}) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [reachedEnd, setReachedEnd] = useState(false)
  const handlePrev = () => {
    // e.stopPropagation()
    setCurrentIndex((prevIndex)=>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1 
      
    )
    setReachedEnd(false)
    // console.log('clicked')
  };
  // console.log(currentIndex)
  // console.log(images.length -1)
  
  const handleNext = () =>{
    // if(e.target === e.currentTarget){

    //   e.stopPropagation()
      setCurrentIndex((prevIndex)=> prevIndex === images.length -1 ? 0 : prevIndex + 1)
      setReachedEnd(currentIndex === images.length - 2)
    // }
  }
  const goToNext = (index:number) =>{
      setCurrentIndex(index)
  }
  const ImageElement = images.map((image, index)=>{
    return(

    <div key={index} onClick={()=> goToNext(index)} className={ `${currentIndex === index ? 'text-white' : 'text-gray-200'} flex `}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 " viewBox="0 0 20 20" fill="currentColor">
        <circle cx="10" cy="10" r="8" />
      </svg>
    </div>
    )
  })
  return (
    <div className='relative group  bg-gray-500 rounded-2xl overflow-hidden flex my-2'>
      <Link to={`places/${id}`}>
        <img className=' aspect-square object-cover' src={`http://127.0.0.1:4000/uploads/${images?.[currentIndex]}`} alt="" />
      </Link>
    {/* {
        images.map((image, index)=>{
            
            <div key={index} className='w-full'>
                <img src={`http://127.0.0.1:4000/uploads/${image}`} alt={image[index]} />
            </div>
        })
    } */}
    <div onClick={handleNext} className={`${currentIndex === 0 ? '-left-full' : 'left-[10%]'} absolute z-30 bg-white p-2 rounded-full hidden group-hover:block font-bold  top-1/2  -translate-y-1/2 -translate-x-1/2`}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="rotate-180 w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>

    </div>
    <div onClick={handlePrev} className={`${reachedEnd ? '-right-full': 'right-0'} absolute z-30 bg-white p-2 rounded-full hidden group-hover:block font-bold bg-opacity-90 top-1/2  -translate-y-1/2 -translate-x-1/2`}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className=" w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
    
    </div>
    <div className='absolute z-30 bg-black bg-opacity-5 w-full justify-center py-2 mt-16 left-1/2 flex bottom-4 -translate-x-1/2 -translate-y-1/2 '>
    {ImageElement}

    </div>
    <div className='absolute top-2 right-4 text-white '>
        <svg xmlns="http://www.w3.org/2000/svg" fill="rgb(0, 0, 0, 0.5)" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>

    </div>
    </div>
  )
}

export default Images