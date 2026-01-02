"use client"
import React from 'react'
import "./artist_nav.scss"
import Link from 'next/link'
import { useSelector } from 'react-redux'

const ArtistNav = () => {
    const { user } = useSelector(state => state.auth)
    return (
        <div>
            <section className='nav'>
                <div className="box"><h1><Link href={"/"}>Home</Link></h1></div>
                <div className="box"><h1><Link href={"/artist/products"}>Products</Link></h1></div>
                <div className="box"><h1><Link href={"/artist/my-orders"}>Orders</Link></h1></div>
                <div className="box"><h1><Link href={`/artist/${user?.username}`}>Profile</Link></h1></div>
                <div className="box"><h1><Link href={"/artist/messages"}>Messages</Link></h1></div>
            </section>
        </div>
    )
}

export default ArtistNav
