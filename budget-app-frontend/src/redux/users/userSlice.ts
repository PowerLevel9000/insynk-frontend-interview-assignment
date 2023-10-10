import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { userPost, base } from "../../types";

const signup = createAsyncThunk("users/signup", async (user: userPost) => {
    const response = await fetch(`${base}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
    if (response.status === 400 || response.status === 422) {
        const data = await response.json();
        throw new Error(data.error);
    }
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
    if (response.status === 400 || response.status === 422) {
        const data = await response.json();
        throw new Error(data.error);
    }

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
    if (response.status === 400 || response.status === 422) {
        const data = await response.json();
        throw new Error(data.error);
    }

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
    
    if (response.status === 400 || response.status === 422) {
        const data = await response.json();
        throw new Error(data.error);
    }

    const data = await response.json();
    localStorage.removeItem("user");
    return data;
});

const initialState: any = {
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

        // signup builder cases
        builder.addCase(signup.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(signup.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            user: payload,
            massage: "signup success"
        }));
        builder.addCase(signup.rejected, (state, payload) => ({
            ...state,
            loading: false,
            massage: "something went wrong while signup"
        }));

        // login builder cases
        builder.addCase(login.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(login.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            user: payload,
            massage: "login success"
        }));
        builder.addCase(login.rejected, (state) => ({
            ...state,
            loading: false,
            massage: "something went wrong while login"
        }));

        // update user builder cases
        builder.addCase(updateUser.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(updateUser.fulfilled, (state, { payload }) => ({
            ...state,
            loading: false,
            user: payload,
            massage: "update success"
        }));
        builder.addCase(updateUser.rejected, (state, payload) => ({
            ...state,
            loading: false,
            massage: payload
        }));
    }
});

export const { logout } = userSlice.actions;
export { signup, login, updateUser, deleteUser };
export default userSlice.reducer;
