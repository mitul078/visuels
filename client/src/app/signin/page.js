"use client"
import React, { useEffect, useState } from 'react'
import "./signin.scss"
import Link from 'next/link'
import Spinner from '@/components/Loading/Spinner'
const page = () => {

    const [loading, setLoading] = useState(true);
    useEffect(() => {

        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000)

        return () => clearTimeout(timer)

    }, [])

    if (loading) {
        return <Spinner />
    }

    return (
        <div className='Signin'>
            <div className="container">
                <div className="box">
                    <div className="header">
                        <h1>Visuels .com</h1>
                    </div>

                    <div className="top">
                        <h1>Welcome,</h1>
                        <h1>Back</h1>
                    </div>

                    <form>
                        <input type="text" placeholder='Email' />
                        <input type="password" placeholder='Password' />

                        <button className='create'>Signin</button>

                        <p className='te'>Or sign in with </p>

                        <div className="icon">
                            <i className="ri-google-fill"></i>
                        </div>


                        <p className="signup">
                            Don't have an account? <Link href="/signup">Signup</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page
