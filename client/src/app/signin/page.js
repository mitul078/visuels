"use client"
import React, { useEffect } from 'react'
import "./signin.scss"
import Link from 'next/link'

import { useRouter, useSearchParams } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { login_user } from '@/redux/features/auth/auth.thunk'
import toast from 'react-hot-toast'
import { clearAuthError, clearAuthState, setAuthError } from '@/redux/features/auth/auth.slice'
import { motion } from "framer-motion"
const page = () => {
    const { error, success, loading, authErrorMessage } = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const router = useRouter()
    const searchParams = useSearchParams()
    const { register, handleSubmit } = useForm()
    const oauthError = searchParams.get("error")


    const onSubmit = async (data) => {
        if (loading) return
        dispatch(login_user(data))
    }

    useEffect(() => {
        if (!oauthError) return;

        dispatch(setAuthError(decodeURIComponent(oauthError)));

        router.replace("/signin", { scroll: false });

    }, [oauthError, dispatch, router]);

    useEffect(() => {
        if (!authErrorMessage) return;

        toast.error(authErrorMessage);
        dispatch(clearAuthError());

    }, [authErrorMessage, dispatch]);

    useEffect(() => {
        if (!error) return;

        toast.error(error);
        dispatch(clearAuthState());

    }, [error, dispatch]);

    useEffect(() => {
        if (!success) return;

        toast.success(success);
        router.push("/");
        dispatch(clearAuthState());

    }, [success, router, dispatch]);




    const oauthHandle = () => {
        window.location.href = `${process.env.BACKEND_URL || "http://localhost:4000"}/auth/google?mode=signin`
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
