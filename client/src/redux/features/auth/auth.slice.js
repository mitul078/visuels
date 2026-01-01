import { createSlice } from "@reduxjs/toolkit";
import { get_me, login_user, register_user, verify_user } from "./auth.thunk";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false,
        authChecked: false,
        success: null,
        otpPending: false,
        authErrorMessage: null
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
            state.authChecked = true
        },
        clearAuthState: (state) => {
            state.success = null
            state.error = null
        },
        setOtpPending: (state, action) => {
            state.otpPending = action.payload
        },
        setAuthError: (state, action) => {
            state.authErrorMessage = action.payload
        },
        clearAuthError: (state) => {
            state.authErrorMessage = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register_user.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(register_user.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.success = action.payload?.message || "Otp Sent"
                state.otpPending = true
            })
            .addCase(register_user.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(verify_user.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(verify_user.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.user = action.payload
                state.success = action.payload?.message || "Verification Completed"
                state.otpPending = false
            })

            .addCase(verify_user.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.success = null
            })

            .addCase(login_user.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(login_user.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
                state.success = action.payload.message || "Logged-in successful"
            })

            .addCase(login_user.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.success = null
            })

            .addCase(get_me.pending, (state) => {
                state.loading = true
            })

            .addCase(get_me.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuthenticated = true
                state.authChecked = true
                state.loading = false
                state.authErrMessage = null
            })

            .addCase(get_me.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.authChecked = true
            })
    }
})


export const { logout, clearAuthState, setOtpPending, setAuthError, clearAuthError } = authSlice.actions

export default authSlice.reducer