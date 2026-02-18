
"use client"
import axios from 'axios'
import React, { useEffect } from 'react'
import { base_url } from '../utls'
import { useRouter } from 'next/navigation'
axios.defaults.withCredentials = true
const layout = ({children}) => {
const route = useRouter()
const verifyUser=async()=>{
  try {
    const response = await axios.get(`${base_url}/user/get`)
    const data = await response.data;
  } catch (error) {
    route.push("/userlogin")
  }
}

useEffect(()=>{verifyUser()},[ ])
// getcourse
  return (
    <div>

        {children}
    </div>
  )
}

export default layout