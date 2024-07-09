import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL='http://localhost:5000/';

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async ()=>{
  const result = await axios.get(API_URL);
  return result.data;
} )

export const addExpenses = createAsyncThunk('expenses/addExpenses', async ({text, money})=>{
  const result = await axios.post(API_URL, {text, money});
  return result.data;
} )

const initialState = {
  expenses: [],
  credit: [],
  debit: [],
}

const trackerSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
          .addCase(fetchExpenses.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchExpenses.fulfilled, (state, action) => {
            state.credit = [];
            state.debit = [];
            state.status = "suceeded";
            state.expenses = action.payload;
            state.expenses.map((expense)=>{
              if(expense.money >= 0){
                state.credit.push(expense.money);
              } else{
                state.debit.push(expense.money);
              }
            })
          })
          .addCase(fetchExpenses.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
          .addCase(addExpenses.fulfilled, (state, action)=>{
            return{
              ...state,
              expenses: [...state.expenses, action.payload]
            }
          })
  }
})

export default trackerSlice.reducer;