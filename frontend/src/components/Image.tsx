import React from 'react'
interface imageProp{
    onClick?: () => void
}
const Image = ({src, ...rest}:{src:string, className:string, onClick?:() => void}) => {
    src = src.includes('https://') ? src : `http://localhost:4000/uploads/${src}`
  return (
    <img {...rest} src={src} alt={`uploads/${src}`}/>
  )
}

export default Image