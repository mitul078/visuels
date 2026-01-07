import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

export const user_profile = createAsyncThunk("profile/user/me", async (_, { rejectWithValue }) => {
    try {

        const res = await axios.get("/user/profile/me", { withCredentials: true })
        return res.data.profile

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Profile fetched error")
    }
})

export const update_user_profile = createAsyncThunk("profile/user/update", async (data, { rejectWithValue }) => {
    try {

        const res = await axios.patch("/user/profile/update", data)
        return res.data.profile

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Updated profile error")

    }
})

export const artist_profile = createAsyncThunk("artist/profile/me", async (_, { rejectWithValue }) => {
    try {

        const res = await axios.get("/artist/profile/me", { withCredentials: true })
        return res.data.profile

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Artist profile page error")
    }
})

export const complete_profile = createAsyncThunk("artist/complete" ,async(data , {rejectWithValue}) => {
    try {

        const res = await axios.post("/artist/profile/create" , data)
        return res.data.profile
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Complete profile error")
        
    }
} )