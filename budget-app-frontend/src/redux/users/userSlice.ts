import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userPost } from "../../types";

const base = "http://localhost:3000";
const signup = createAsyncThunk("users/signup", async (user: userPost) => {
    const response = await fetch(`${base}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data));
    return data;
});

const login = createAsyncThunk("users/login", async (user: userPost) => {
    const response = await fetch(`${base}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data));
    return data;
});

const updateUser = createAsyncThunk("users/updateUser", async (user: any) => {
    const response = await fetch(`${base}/users/${user.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data));
    return data;
});

const deleteUser = createAsyncThunk("users/deleteUser", async (user: any) => {
    const response = await fetch(`${base}/users/${user.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(data));
    return data;
});

const initialState = {
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : {},
    loading: false,
    error: null,
    massage: "",
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            localStorage.removeItem("user");
            state.user = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(signup.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(signup.fulfilled, (state, action) => ({
            ...state,
            loading: false,
            user: action.payload,
            massage: "signup success"
        }));
        builder.addCase(signup.rejected, (state) => ({
            ...state,
            loading: false,
            massage: "something went wrong while signup"
        }));
        builder.addCase(login.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(login.fulfilled, (state, action) => ({
            ...state,
            loading: false,
            user: action.payload,
            massage: "login success"
        }));
        builder.addCase(login.rejected, (state) => ({
            ...state,
            loading: false,
            massage: "something went wrong while login"
        }));
        builder.addCase(updateUser.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(updateUser.fulfilled, (state, action) => ({
            ...state,
            loading: false,
            user: action.payload,
            massage: "update success"
        }));
        builder.addCase(updateUser.rejected, (state) => ({
            ...state,
            loading: false,
            massage: "something went wrong while update"
        }));
    }
});

export const { logout } = userSlice.actions;
export { signup, login, updateUser, deleteUser };
export default userSlice.reducer;
