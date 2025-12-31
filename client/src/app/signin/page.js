"use client"
import React, { useEffect } from 'react'
import "./signin.scss"
import Link from 'next/link'

import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login_user } from '@/redux/features/auth/auth.thunk'
import toast from 'react-hot-toast'
import { clearAuthState } from '@/redux/features/auth/auth.slice'
import { motion } from "framer-motion"
const page = () => {
    const { error, success, loading } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { register, handleSubmit } = useForm()


    const onSubmit = async (data) => {
        if (loading) return
        dispatch(login_user(data))
    }

    useEffect(() => {
        // Handle OAuth errors
        const oauthError = searchParams.get("oauthError")
        if (oauthError) {
            let errorMessage = "Google sign-in failed. Please try again.";
            
            switch (oauthError) {
                case "user_not_found":
                    errorMessage = "User not found. Please sign up first.";
                    break;
                case "user_already_exists":
                    errorMessage = "User already exists. Please sign in instead.";
                    break;
                case "no_email":
                    errorMessage = "No email found from Google account.";
                    break;
                case "authentication_failed":
                    errorMessage = "Google authentication failed. Please try again.";
                    break;
                case "server_error":
                    errorMessage = "Server error occurred. Please try again later.";
                    break;
                case "invalid_action":
                    errorMessage = "Invalid action. Please try again.";
                    break;
                default:
                    errorMessage = "Google sign-in failed. Please try again.";
            }
            
            toast.error(errorMessage);
            // Clean up the URL
            router.replace("/signin");
        }

        if (error) {
            toast.error(error)
            dispatch(clearAuthState())
        }
        if (success) {
            toast.success(success)
            router.push("/")
            dispatch(clearAuthState())
        }

    }, [error, success, dispatch, searchParams, router])

    const oauthHandle = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000"}/auth/google?action=signin`
    }


    return (
        <div className='Signin'>
            <motion.div
                className="container"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: .25, ease: "easeOut" }}
            >
                <motion.div
                    className="box"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: .50, ease: "easeInOut" }}
                >
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

                        <div onClick={oauthHandle} className="icon">
                            <i className="ri-google-fill"></i>
                            <p>Google</p>
                        </div>


                        <p className="signup">
                            Don't have an account? <Link href="/signup">Signup</Link>
                        </p>
                    </form>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default page
