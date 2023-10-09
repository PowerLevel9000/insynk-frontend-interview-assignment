import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { base } from "../../types";

// Asychronous Thunk to get expenses
const getExpenses = createAsyncThunk("expenses/getExpenses", async () => {
    const response = await fetch(`${base}/expenses`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data;
});

// Asychronous Thunk to add expense
const addExpense = createAsyncThunk("expenses/addExpense", async (expense: any) => {
    const response = await fetch(`${base}/expenses`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
    });
    const data = await response.json();
    return data;
});

//  Asychronous Thunk to update expense
const updateExpense = createAsyncThunk("expenses/updateExpense", async (expense: any) => {
    const response = await fetch(`${base}/expenses/${expense.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
    });
    const data = await response.json();
    return data;
});

// Asychronous Thunk to delete expense
const deleteExpense = createAsyncThunk("expenses/deleteExpense", async (expense: any) => { 
    const response = await fetch(`${base}/expenses/${expense.id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(expense),
    });
    const data = await response.json();
    return data;
});

const initialState:any = {
    expenses: [],
    loading: false,
    error: null,
    massage: "",
};

const expensesSlice = createSlice({
    name: "expenses",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        // get expenses builder cases
        builder.addCase(getExpenses.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(getExpenses.fulfilled, (state, { payload }) => ({
            ...state,
            expenses: payload,
            loading: false,
            massage: "success get expenses"
        }));
        builder.addCase(getExpenses.rejected, (state, { payload }) => ({
            ...state,
            loading: false,
            error: payload,
        }));

        // add expense builder cases
        builder.addCase(addExpense.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(addExpense.fulfilled, (state, { payload }) => ({
            ...state,
            expenses: [...state.expenses, payload],
            loading: false,
            massage: "success add expense"
        }));
        builder.addCase(addExpense.rejected, (state, { payload }) => ({
            ...state,
            loading: false,
            error: payload,
        }));

        // update expense builder cases
        builder.addCase(updateExpense.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(updateExpense.fulfilled, (state, { payload }) => ({
            ...state,
            expenses: [...state.expenses, payload],
            loading: false,
            massage: "success update expense"
        }));
        builder.addCase(updateExpense.rejected, (state, { payload }) => ({
            ...state,
            loading: false,
            error: payload,
        }));

        // delete expense builder cases
        builder.addCase(deleteExpense.pending, (state) => ({
            ...state,
            loading: true,
        }));
        builder.addCase(deleteExpense.fulfilled, (state, { payload }) => ({
            ...state,
            expenses: state.expenses.filter((expense: any) => expense.id !== payload.id),
            loading: false,
            massage: "success delete expense"
        }));
        builder.addCase(deleteExpense.rejected, (state, { payload }) => ({
            ...state,
            loading: false,
            error: payload,
        }));
    }
});

export { getExpenses, addExpense, updateExpense, deleteExpense };
export default expensesSlice.reducer;