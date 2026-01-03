import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

export const create_product = createAsyncThunk("create/product", async (data, { rejectWithValue }) => {
    try {

        const res = await axios.post("/products", data)
        return res.data.product

    } catch (error) {

        return rejectWithValue(error.response?.data?.message || "Create product error")
    }
})
export const update_product = createAsyncThunk("update/product", async ({ productId, data }, { rejectWithValue }) => {
    try {

        const res = await axios.patch(`/products/${productId}`, data)
        return res.data.product

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Update product error")
    }
})

export const delete_product = createAsyncThunk("delete/product", async (productId, { rejectWithValue }) => {
    try {

        await axios.delete(`/products/${productId}`)
        return productId

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Delete product error")

    }
})

export const get_products = createAsyncThunk("get/products", async ({ page = 1, category, q } = {}, { rejectWithValue }) => {
    try {

        const res = await axios.get(`/products`, {
            params: { page, category, q }
        })
        return res.data

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Fetched product error")
    }
})

export const get_all_category = createAsyncThunk("get/category", async (_, { rejectWithValue }) => {
    try {

        const res = await axios.get("/products/categories", { withCredentials: true })
        return res.data.allCategory

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Fetched category error")
    }
})

export const get_artist_product = createAsyncThunk("product/artist", async (_, { rejectWithValue }) => {
    try {

        const res = await axios.get(`/products/me/products`, { withCredentials: true })
        return res.data.products

    } catch (error) {
        return rejectWithValue(error.response?.data?.message || "Fetched artist product error")

    }
})