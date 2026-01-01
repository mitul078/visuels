"use client"

import { register_user } from '@/redux/features/auth/auth.thunk'
import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import "./signup.scss"
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { clearAuthState, setAuthError, setOtpPending } from '@/redux/features/auth/auth.slice'
import { motion } from "framer-motion";

const page = () => {

    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const router = useRouter()
    const { error, loading, success, authErrorMessage } = useSelector(state => state.auth)
    const searchParams = useSearchParams()
    const oauthError = searchParams.get("error")


    const onSubmit = async (data) => {
        if (loading) return
        dispatch(register_user(data))
        dispatch(setOtpPending(true))
    }

    useEffect(() => {
        if (oauthError) {
            dispatch(setAuthError(decodeURIComponent(oauthError)))
            toast.error(authErrorMessage)
        }

        if (error) {
            toast.error(error)
            dispatch(clearAuthState())
        }

        if (success) {
            toast.success(success)
            router.push("/verify-otp")

            dispatch(clearAuthState())
        }

    }, [error, success, dispatch, router, oauthError])


    const oauthHandle = () => {
        window.location.href = `${process.env.BACKEND_URL || "http://localhost:4000"}/auth/google?mode=signup`
    }

    return (
        <div className='Signup'>
            <motion.div
                className="container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
            >
                <motion.div
                    className="box"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: .50, ease: "easeInOut" }}
                >
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

                        <div onClick={oauthHandle} className="icon">
                            <i className="ri-google-fill"></i>
                            <p>Google</p>
                        </div>

                        <p className='ts'>By creating an account you agree to <span>Visuels's</span> <br />Terms of Services and Privacy Policy </p>

                        <p className="signin">
                            Have an account? <Link href="/signin">Signin</Link>
                        </p>
                    </form>
                </motion.div>
            </motion.div>
        </div >
    )
}

export default page
