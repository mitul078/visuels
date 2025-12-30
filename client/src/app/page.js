"use client"
import React, { useEffect, useState } from 'react'
import "./home.scss"
import Spinner from '@/components/Loading/Spinner'
const page = () => {

  return (
    <div className='Home'>
      <section className='nav'>
        <div className="box"><h1>Home</h1></div>
        <div className="box"><h1>Products</h1></div>
        <div className="box"><h1>Artists</h1></div>
        <div className="box"><h1>Orders</h1></div>
        <div className="box"><h1>Messages</h1></div>
      </section>
    </div>
  )
}

export default page
