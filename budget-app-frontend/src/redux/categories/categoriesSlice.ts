import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { base, postCategories, userId } from "../../types";

// Asychronous Thunk to get categories
const getCategories = createAsyncThunk("categories/getCategories", async () => {
    const response = await fetch(`${base}/users/${userId}/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
});

// Asychronous Thunk to add category
const addCategory = createAsyncThunk("categories/addCategory", async (category: postCategories) => {
    const response = await fetch(`${base}/users/${userId}/categories`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
    const data = await response.json();
    return data;
});

//  Asychronous Thunk to update category
const updateCategory = createAsyncThunk("categories/updateCategory", async (category: any) => {
    const response = await fetch(`${base}/users/${userId}/categories/${category.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
    const data = await response.json();
    return data;
});

// Asychronous Thunk to delete category
const deleteCategory = createAsyncThunk("categories/deleteCategory", async (category: any) => {
    const response = await fetch(`${base}/users/${userId}/categories/${category.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
    });
    const data = await response.json();
    return data;
});

const initialState:any = {
    categories: [],
    loading: false,
    error: null,
    massage: null,
};

const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // builder to get categories cases  
        builder.addCase(getCategories.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(getCategories.fulfilled, (state, { payload }) => ({
            ...state,
            categories: payload,
            loading: false,
            massage: "success get categories"
        }));
        builder.addCase(getCategories.rejected, (state, {payload}) => ({
            ...state,
            loading: false,
            massage: payload,
        }));

        // builder to add category cases
        builder.addCase(addCategory.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(addCategory.fulfilled, (state, { payload }) => ({
            ...state,
            categories: [...state.categories, payload],
            loading: false,
            massage: "success add category"
        }));
        builder.addCase(addCategory.rejected, (state, payload) => ({
            ...state,
            loading: false,
            massage: payload,
        }));

        // builder to update category cases
        builder.addCase(updateCategory.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(updateCategory.fulfilled, (state, { payload }) => ({
            ...state,
            categories: state.categories.map((category: any) => category.id === payload.id ? payload : category),
            loading: false,
            massage: "success update category"
        }));
        builder.addCase(updateCategory.rejected, (state, payload) => ({
            ...state,
            loading: false,
            massage: payload,
        }));

        // builder to delete category cases
        builder.addCase(deleteCategory.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(deleteCategory.fulfilled, (state, { payload }) => ({
            ...state,
            categories: state.categories.filter((category: any) => category.id !== payload.id),
            loading: false,
            massage: "success delete category"
        }));
        builder.addCase(deleteCategory.rejected, (state, payload) => ({
            ...state,
            loading: false,
            massage: payload,
        }));
    },
});

export { getCategories, addCategory, updateCategory, deleteCategory };
export default categoriesSlice.reducer;
