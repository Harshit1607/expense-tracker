import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL='http://localhost:5000/';

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async ()=>{
  const result = await axios.get(API_URL);
  // console.log(result.data);
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
            state.status = "suceeded";
            state.expenses = action.payload;
          })
          .addCase(fetchExpenses.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          })
  }
})

export default trackerSlice.reducer;