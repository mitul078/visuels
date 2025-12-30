"use client"
import React, { useEffect } from 'react'
import "./signin.scss"
import Link from 'next/link'

import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login_user } from '@/redux/features/auth/auth.thunk'
import toast from 'react-hot-toast'
import { clearAuthState } from '@/redux/features/auth/auth.slice'
const page = () => {
    const { error, success, loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const router = useRouter()
    const { register, handleSubmit } = useForm()



    const onSubmit = async (data) => {
        if(loading) return
        dispatch(login_user(data))
    }

    useEffect(() => {

        if (error) {
            toast.error(error)
            dispatch(clearAuthState())
        }
        if (success) {
            toast.success(success)
            router.push("/")
            dispatch(clearAuthState())
        }

    }, [error, success , dispatch])


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

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <input {...register("email")} type="text" placeholder='Email' />
                        <input {...register("password")} type="password" placeholder='Password' />

                        <button type='submit' className='create' disabled={loading}>{loading ? "Signin..." : "Sign in"}</button>

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
