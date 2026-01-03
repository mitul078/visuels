import { createSlice } from "@reduxjs/toolkit";
import { create_product, delete_product, get_all_category, get_artist_product, get_products, update_product } from "./product.thunk";


const productSlice = createSlice({
    name: "product",
    initialState: {
        loading: false,
        products: [],
        error: null,
        selectedProduct: null,
        hasMore: true,
        page: 1,
        artistProducts: [],
        categories: [],
        success: null
    },
    reducers: {
        setSelectedProduct: (state, action) => {
            state.selectedProduct = action.payload.product
        },
        clearState: (state) => {
            state.error = null
            state.success = null
            state.loading = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(get_products.pending, (state) => {
                state.loading = true
            })
            .addCase(get_products.fulfilled, (state, action) => {
                state.loading = false
                if (action.payload.page === 1) {
                    state.products = action.payload.products
                } else {
                    state.products.push(...action.payload.product)
                }
                state.page = action.payload.page
                state.hasMore = action.payload.hasMore
            })
            .addCase(get_products.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })


            .addCase(get_artist_product.pending, (state) => {
                state.loading = true
            })
            .addCase(get_artist_product.fulfilled, (state, action) => {
                state.loading = false
                state.artistProducts = action.payload
            })
            .addCase(get_artist_product.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(get_all_category.pending, (state) => {
                state.loading = true
            })

            .addCase(get_all_category.fulfilled, (state, action) => {
                state.loading = false
                state.categories = action.payload
            })

            .addCase(create_product.pending, (state, action) => {
                state.loading = true
            })
            .addCase(create_product.fulfilled, (state, action) => {
                state.loading = false
                state.products.unshift(action.payload)
                state.success = "Product Listed Successfully"
            })
            .addCase(create_product.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(update_product.pending, (state) => {
                state.loading = true
            })
            .addCase(update_product.fulfilled, (state, action) => {
                state.loading = false
                const index = state.products.findIndex(p => p._id === action.payload._id)
                if (index !== -1) {
                    state.products[index] = action.payload
                    state.success = "Product updated successfully"
                }
            })
            .addCase(update_product.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })

            .addCase(delete_product.pending, (state) => {
                state.pending = true
            })
            .addCase(delete_product.fulfilled, (state, action) => {
                state.loading = false
                state.products = state.products.filter(p => p._id !== action.payload)
                state.success = "Product deleted successfully"
            })
            .addCase(delete_product.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const { setSelectedProduct, clearState } = productSlice.actions

export default productSlice.reducer