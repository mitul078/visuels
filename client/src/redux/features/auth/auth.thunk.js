import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "@/config/axios"

export const register_user = createAsyncThunk("auth/register", async (data, { rejectWithValue }) => {
    try {

        const res = await axios.post("/auth/email-signup", data);
        return res.data.user

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Registration failed")
    }
})


export const verify_user = createAsyncThunk("/auth/verify", async (data, { rejectWithValue }) => {
    try {

        const res = await axios.post("/auth/email-verify", data, { withCredentials: true })
        return res.data.user

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Verification failed")

    }
})

export const login_user = createAsyncThunk("auth/login", async (data, { rejectWithValue }) => {
    try {

        const res = await axios.post("/auth/email-signin", data, { withCredentials: true })
        return res.data.user

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Login failed")
    }
})

export const get_me = createAsyncThunk("/auth/me", async (_, { rejectWithValue }) => {
    try {

        const res = await axios.get("auth/me", { withCredentials: true })
        return res.data.user

    } catch (error) {
        return rejectWithValue(error.response.data.message)
    }
})
