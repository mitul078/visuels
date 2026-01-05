import { createSlice } from "@reduxjs/toolkit";
import { update_user_profile, user_profile } from "./profile.thunk";

const profileSlice = createSlice({
    name: "profile",
    initialState: {
        profile: null,
        error: null,
        loading: false,
        success: null,
    },
    reducers: {
        clearState: (state) => {
            state.error = null
            state.success = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(user_profile.pending, (state) => {
                state.loading = true
            })
            .addCase(user_profile.fulfilled, (state, action) => {
                state.loading = false
                state.profile = action.payload
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
    }

})

export const { clearState } = profileSlice.actions
export default profileSlice.reducer