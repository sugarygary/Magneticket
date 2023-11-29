import React from 'react'
import CineplexCreatePromo from '../components/CineplexCreatePromo'
import { useLoaderData } from 'react-router-dom'

const CineplexCreateKodePromo = () => {
  const data = useLoaderData();
  if (data == "Request failed with status code 401") {
    throw new Response('', { status: 401 })
  }
  
  return (
    <>
        <CineplexCreatePromo />
    </>
  )
}

export default CineplexCreateKodePromo