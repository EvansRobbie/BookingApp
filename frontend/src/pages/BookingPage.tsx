import React from 'react'
import { useParams } from 'react-router-dom'

const BookingPage = () => {
    const {id} = useParams()
  return (
    <div className=''>BookingPage {id}</div>
  )
}

export default BookingPage