"use client"

import { register_user } from '@/redux/features/auth/auth.thunk'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import "./signup.scss"
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'
import { clearAuthState, setAuthError, setOtpPending } from '@/redux/features/auth/auth.slice'
import { motion, AnimatePresence } from "framer-motion";
import Rule from '@/pages/Rules/Rule'


const page = () => {

    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const router = useRouter()
    const { error, loading, success, authErrorMessage } = useSelector(state => state.auth)
    const searchParams = useSearchParams()
    const oauthError = searchParams.get("error")
    const [selectedRole, setSelectedRole] = useState("USER")
    const [showRules, setShowRules] = useState(false)
    const [rulesAccepted, setRulesAccepted] = useState(false)



    const onSubmit = async (data) => {
        if (loading) return
        const isConfirmed = confirm(`Do you want to continue as a ${data.role}?`);
        if (!isConfirmed) return;
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
            router.push("/auth/verify-otp")
            dispatch(clearAuthState())
        }

    }, [error, success, dispatch, router, oauthError])

    const handleRole = (role) => {
        setSelectedRole(role)
        if (role === "ARTIST") {
            setShowRules(true)
        } else {
            setShowRules(false)
            setRulesAccepted(false)
        }
    }

    const handleRulesAccept = (accepted) => {
        setRulesAccepted(accepted)
    }

    const handleRulesContinue = () => {
        if (rulesAccepted) {
            setShowRules(false)
        }
    }

    const handleRulesClose = () => {
        setShowRules(false)
        setRulesAccepted(false)
        // Reset to USER role if they close without accepting
        setSelectedRole("USER")
        // Uncheck artist radio button
        const artistRadio = document.getElementById("role-artist")
        const userRadio = document.getElementById("role-user")
        if (artistRadio && userRadio) {
            artistRadio.checked = false
            userRadio.checked = true
        }
    }



    const oauthHandle = () => {
        
        window.location.href = `${process.env.BACKEND_URL || "http://localhost:4000"}/auth/google?mode=signup&role=${selectedRole}`
    }

    return (
        <div className='Signup'>
            <AnimatePresence>
                {showRules && (
                    <motion.div
                        className="rules-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleRulesClose}
                    >
                        <motion.div
                            className="rules-modal-container"
                            initial={{ scale: 0.9, opacity: 0, y: 50 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 50 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="rules-modal-header">
                                <h2>Artist Rules & Regulations</h2>
                                <button className="rules-close-btn" onClick={handleRulesClose}>
                                    <i className="ri-close-line"></i>
                                </button>
                            </div>
                            <div className="rules-modal-content">
                                <Rule onAccept={handleRulesAccept} />
                                <div className="rules-modal-actions">
                                    <button
                                        className="rules-continue-btn"
                                        onClick={handleRulesContinue}
                                        disabled={!rulesAccepted}
                                    >
                                        Continue as Artist
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

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

                        <div className="role-selection">

                            <div className="role-options">
                                <motion.div
                                    className="role-card"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <input
                                        {...register("role", { required: true })}
                                        type="radio"
                                        value="USER"
                                        id="role-user"
                                        defaultChecked
                                        className="role-input"
                                        onClick={() => handleRole("USER")}
                                    />
                                    <label htmlFor="role-user" className="role-card-label">
                                        <div className="role-icon">
                                            <i className="ri-user-line"></i>
                                        </div>
                                        <div className="role-info">
                                            <span className="role-title">User</span>
                                            <span className="role-description">Browse and purchase artwork</span>
                                        </div>
                                        <div className="role-check">
                                            <i className="ri-check-line"></i>
                                        </div>
                                    </label>
                                </motion.div>

                                <motion.div
                                    className="role-card"
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <input
                                        {...register("role", { required: true })}
                                        onClick={() => handleRole("ARTIST")}
                                        type="radio"
                                        value="ARTIST"
                                        id="role-artist"
                                        className="role-input"
                                    />
                                    <label htmlFor="role-artist" className="role-card-label">
                                        <div className="role-icon">
                                            <i className="ri-palette-line"></i>
                                        </div>
                                        <div className="role-info">
                                            <span className="role-title">Artist</span>
                                            <span className="role-description">Create and sell your artwork</span>
                                        </div>
                                        <div className="role-check">
                                            <i className="ri-check-line"></i>
                                        </div>
                                    </label>
                                </motion.div>
                            </div>
                        </div>

                        <button type='submit' className='create' disabled={loading}>{loading ? "Wait..." : "Create Account"}</button>

                        <p className='te'>Or sign in with </p>

                        <div onClick={oauthHandle} className="icon">
                            <i className="ri-google-fill"></i>
                            <p>Google</p>
                        </div>

                        <p className='ts'>By creating an account you agree to <span>Visuels's</span> <br />Terms of Services and Privacy Policy </p>

                        <p className="signin">
                            Have an account? <Link href="/auth/signin">Signin</Link>
                        </p>
                    </form>
                </motion.div>
            </motion.div>
        </div >
    )
}

export default page
