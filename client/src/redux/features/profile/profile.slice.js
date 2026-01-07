import { createSlice } from "@reduxjs/toolkit";
import { artist_profile, complete_profile, update_user_profile, user_profile } from "./profile.thunk";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        error: null,
        loading: false,
        success: null,
        isProfileCompleted: false,
        isCompleted: false
    },
    reducers: {
        clearState: (state) => {
            state.error = null
            state.success = null
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(user_profile.pending, (state) => {
                state.loading = true
            })
            .addCase(user_profile.fulfilled, (state, action) => {
                state.loading = false
                state.profile = action.payload
                state.isProfileCompleted = !!action.payload
            })
            .addCase(user_profile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(update_user_profile.pending, (state) => {
                state.loading = true
            })
            .addCase(update_user_profile.fulfilled, (state, action) => {
                state.loading = false
                state.profile = action.payload
                state.success = "Profile updated successfully"
            })
            .addCase(update_user_profile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(artist_profile.pending, (state) => {
                state.loading = true
            })
            .addCase(artist_profile.fulfilled, (state, action) => {
                state.loading = false
                state.profile = action.payload
                state.isProfileCompleted = !!action.payload
                state.isCompleted = true
            })
            .addCase(artist_profile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.isCompleted = true

            })

            .addCase(complete_profile.pending, (state) => {
                state.loading = true
            })
            .addCase(complete_profile.fulfilled, (state, action) => {
                state.loading = false
                state.profile = action.payload
                state.success = "Profile completed successfully"
                state.isProfileCompleted = true
            })
            .addCase(complete_profile.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { clearState } = profileSlice.actions
export default profileSlice.reducer