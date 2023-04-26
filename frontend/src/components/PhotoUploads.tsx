import axios from 'axios';
import React, { useState } from 'react'

const PhotoUploads = () => {
    const [addedPhotos, setAddedPhotos] = useState<string[]>([]);
  const [photoLink, setPhotoLink] = useState("");

    const addPhotoByLink = async (e: React.FormEvent<HTMLButtonElement>) =>{
        e.preventDefault()
        const {data: filename} = await axios.post('/upload-by-link', {link: photoLink})
        setAddedPhotos(prev => {
          return  [...prev, filename]
        })
        setPhotoLink('')
      }
    
      const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) =>{
            const files = e.target.files
            // console.log(files)
            const data = new FormData()
            if (files) {
                for (let i = 0; i < files.length; i++){
                    data.append('photos', files[i])
                }
                const {data: filenames} = await axios.post('/upload', data, {
                    headers: {'Content-Type':'multipart/form-data'}
                })
                setAddedPhotos(prev => {
                    return  [...prev, ...filenames]
                  })
            }
      }
  return (
    <>
         <div className="flex gap-2">
              <input
                type="text"
                value={photoLink}
                onChange={(e) => setPhotoLink(e.target.value)}
                className="outline-none border  rounded-xl px-6 py-2 w-full"
                placeholder="Add using Link....jpg"
              />
              <button onClick={addPhotoByLink} className="bg-gray-200 px-4 rounded-2xl">
                Add&nbsp;Photo
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-6 mt-2">
                {addedPhotos.length > 0 && addedPhotos.map((link) =>(
                    <div key={link} className="h-32 ">
                        <img className="rounded-2xl  h-full" src={`http://localhost:4000/uploads/${link}`} alt="" />
                    </div>
                ))}
              <label className="border h-32 bg-transparent p-2 justify-center cursor-pointer rounded-xl text-xl text-gray-600 flex items-center gap-2 ">
                <input type="file" multiple className="hidden" onChange={handleUpload} />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                Upload
              </label>
            </div>
    </>
  )
}

export default PhotoUploads