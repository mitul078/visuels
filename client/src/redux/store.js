import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/auth/auth.slice"
import productSlice from "./features/product/product.slice"

export const store = configureStore({
    reducer: {
        auth: authSlice,
        product: productSlice
    }
})

