
"use client"
import React, { useEffect } from 'react'
import Sidebar from './components/Sidebar'
import axios from 'axios'
import { base_url } from '../utls'
import { useRouter } from 'next/navigation'

axios.defaults.withCredentials = true
const layout = ({children}) => {
const route = useRouter()
const verifyAdmin = async()=>{
  try {
    const response = await axios.get(`${base_url}/admin/getadmin`)
    const data = await response.data
  } catch (error) {
    route.push("/adminlogin")
  }
}
useEffect(()=>{verifyAdmin()},[])

  return (
    <div className='flex h-screen'> 
<Sidebar />
<div className='w-full h-screen overflow-auto'>

        {children}
</div>
    </div>
  )
}

export default layout