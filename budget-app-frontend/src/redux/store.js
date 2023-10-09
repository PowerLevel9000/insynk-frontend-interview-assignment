import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer  from "./categories/categoriesSlice";
import expensesReducer from "./expenses/expensesSlice";
import userReducer from "./users/userSlice";

const store = configureStore({
    reducer: {
        categories: categoriesReducer,
        expenses: expensesReducer,
        user: userReducer,
    },
});

export default store;