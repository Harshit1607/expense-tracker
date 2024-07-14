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

export const deleteExpenses = createAsyncThunk('expenses/deleteExpenses', async (id)=>{
  const result =await axios.delete(`${API_URL}${id}`);
  return result.data;
} )

const initialState = {
  todoState : {
  expenses: [],
  credit: [],
  debit: [],
  },
  userState : {

  }
}

const trackerSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
          .addCase(fetchExpenses.pending, (state) => {
            state.todoState.status = 'loading';
          })
          .addCase(fetchExpenses.fulfilled, (state = initialState.todoState, action) => {
            state.todoState.status = "suceeded";
            state.todoState.expenses = action.payload;
            state.todoState.expenses.map((expense)=>{
              if(expense.money >= 0){
                state.todoState.credit.push(expense.money);
              } else{
                state.todoState.debit.push(expense.money);
              }
            })
          })
          .addCase(fetchExpenses.rejected, (state, action) => {
            state.todoState.status = 'failed';
            state.todoState.error = action.error.message;
          })
          .addCase(addExpenses.fulfilled, (state = initialState.todoState, action)=>{
            state.todoState.expenses = action.payload;
            state.todoState.expenses.map((expense)=>{
              if(expense.money >= 0){
                state.todoState.credit.push(expense.money);
              } else{
                state.todoState.debit.push(expense.money);
              }
            })
          })
          .addCase(deleteExpenses.fulfilled, (state = initialState.todoState, action)=>{
            state.todoState.expenses = action.payload;
            state.todoState.expenses.map((expense)=>{
              if(expense.money >= 0){
                state.todoState.credit.push(expense.money);
              } else{
                state.todoState.debit.push(expense.money);
              }
            })
          })
  }
})

export default trackerSlice.reducer;