"use client"
import React from 'react'
import "./user_nav.scss"
import Link from 'next/link'

const UserNav = () => {
    return (
        <div>
            <section className='nav'>
                <div className="box"><h1><Link href={"/"}>Home</Link></h1></div>
                <div className="box"><h1><Link href={"/user/products"}>Products</Link></h1></div>
                <div className="box"><h1><Link href={"/user/artists"}>Artists</Link></h1></div>
                <div className="box"><h1><Link href={"/user/orders"}>Orders</Link></h1></div>
                <div className="box"><h1><Link href={"/user/messages"}>Messages</Link></h1></div>
            </section>
        </div>
    )
}

export default UserNav
