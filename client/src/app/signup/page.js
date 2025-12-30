"use client"

import { register_user } from '@/redux/features/auth/auth.thunk'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import "./signup.scss"
import Link from 'next/link'
import Spinner from '@/components/Loading/Spinner'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { clearAuthState, setOtpPending } from '@/redux/features/auth/auth.slice'

const page = () => {
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const router = useRouter()
    const { error, loading, success } = useSelector(state => state.auth)


    const onSubmit = async (data) => {
        if(loading) return
        dispatch(register_user(data))
    }

    useEffect(() => {
        if (error) {
            toast.error(error)
            dispatch(clearAuthState())
        }

        if (success) {
            toast.success(success)
            dispatch(setOtpPending(true))
            router.push("/verify-otp")
            dispatch(clearAuthState())
        }

    }, [error, success , dispatch])

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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("email")} type="text" placeholder='Email' required />
                        <input {...register("password")} type="password" placeholder='Password' required />
                        <input {...register("username")} type="text" placeholder='Username' required />
                        <input {...register("name")} type="text" placeholder='Name' required />

                        <button type='submit' className='create' disabled={loading}>{loading ? "Wait..." : "Create Account"}</button>

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
        </div >
    )
}

export default page
