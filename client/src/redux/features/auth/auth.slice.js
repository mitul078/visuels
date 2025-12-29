import { createSlice } from "@reduxjs/toolkit";
import { get_me, login_user, register_user, verify_user } from "./auth.thunk";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loading: false,
        error: null,
        isAuthenticated: false
    },
    reducers: {
        logout: (state) => {
            state.user = null
            state.isAuthenticated = false
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register_user.pending, (state) => {
                state.loading = true
            })
            .addCase(register_user.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
            })
            .addCase(register_user.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                console.log(action.payload)
            })

            .addCase(verify_user.pending, (state) => {
                state.loading = true
            })

            .addCase(verify_user.fulfilled, (state, action) => {
                state.loading = false
                state.isAuthenticated = true
                state.user = action.payload
                console.log(action.payload)
            })

            .addCase(verify_user.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                console.log(action.payload)
            })

            .addCase(login_user.pending, (state) => {
                state.loading = true
            })

            .addCase(login_user.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload
                state.isAuthenticated = true
            })

            .addCase(login_user.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(get_me.fulfilled, (state, action) => {
                state.user = action.payload
                state.isAuthenticated = true
            })
    }
})


export const { logout } = authSlice.actions

export default authSlice.reducer