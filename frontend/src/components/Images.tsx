import React from 'react'

const Images = ({images}: {images: string[]}) => {
  return (
    <div className='bg-gray-500 rounded-2xl overflow-hidden flex my-2'>
    <img className=' aspect-square object-cover' src={`http://127.0.0.1:4000/uploads/${images?.[0]}`} alt="" />
    {/* {
        images.map((image, index)=>{
            
            <div key={index} className='w-full'>
                <img src={`http://127.0.0.1:4000/uploads/${image}`} alt={image[index]} />
            </div>
        })
    } */}
    </div>
  )
}

export default Images