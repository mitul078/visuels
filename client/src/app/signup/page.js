"use client"

import { register_user } from '@/redux/features/auth/auth.thunk'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import "./signup.scss"

import Link from 'next/link'
import Spinner from '@/components/Loading/Spinner'
const page = () => {

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(true)
    useEffect(() => {

        const timer = setTimeout(() => {
            setLoading(false)
        }, 2000)

        return () => clearTimeout(timer)

    }, [])


    // const onSubmit = async (data) => {
    //     dispatch(register_user(data))
    // }


    if (loading) return <Spinner />

    return (
        <div className='Signup'>
            <div className="container">
                <div className="box">
                    <div className="header">
                        <h1>Visuels .com</h1>
                    </div>


                    <div className="top">
                        <h1>Create</h1>
                        <h1>account</h1>
                    </div>

                    <form>
                        <input type="text" placeholder='Email' />
                        <input type="password" placeholder='Password' />
                        <input type="text" placeholder='Username' />
                        <input type="text" placeholder='Name' />

                        <button className='create'>Create Account</button>

                        <p className='te'>Or sign in with </p>

                        <div className="icon">
                            <i className="ri-google-fill"></i>
                        </div>

                        <p className='ts'>By creating an account you agree to <span>Visuels's</span> <br />Terms of Services and Privacy Policy </p>

                        <p className="signin">
                            Have an account? <Link href="/signin">Signin</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default page
