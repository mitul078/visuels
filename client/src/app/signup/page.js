"use client"

import { register_user } from '@/redux/features/auth/auth.thunk'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import "./signup.scss"

const page = () => {

    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()

    // const onSubmit = async (data) => {
    //     dispatch(register_user(data))
    // }

    return (
        <div className='Signup'>
            
        </div>
    )
}

export default page
