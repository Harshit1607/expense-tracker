import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

const API_URL='http://localhost:5000/';

export const fetchExpenses = createAsyncThunk('expenses/fetchExpenses', async (userId)=>{
try{  
  const result = await axios.get(API_URL, {params: {
    userId: userId
  },
  headers: 
  {authorization: localStorage.getItem('token')   
  }});
  return result.data;
} catch(err){
  alert(err)
}
} )

export const addExpenses = createAsyncThunk('expenses/addExpenses', async ({text, money, userId})=>{
try{
  const result = await axios.post(API_URL, {text, money, userId});
  return result.data;
} catch(err){
  alert(err)
}
} )

export const deleteExpenses = createAsyncThunk('expenses/deleteExpenses', async ({id, userId})=>{
try{
  const result =await axios.delete(`${API_URL}${id}`, {data: {userId: userId}});
  return result.data;
} catch(err){
  alert(err)
}
})

export const signup = createAsyncThunk('user/signup', async({user, email, pass})=>{
try{
  const result = await axios.post(`${API_URL}signup`, {user, email, pass});
  return result.data;
} catch(err){
  alert(err)
}
})

export const login = createAsyncThunk('user/login', async({user, email, pass})=>{
try{  
  const result = await axios.post(`${API_URL}login`, {user, email, pass});
  return result.data;
} catch(err){
  alert(err)
}
})


const initialState = {
  todoState : {
  expenses: [],
  credit: [],
  debit: [],
  },
  userState : {
    user: localStorage.getItem('user')? localStorage.getItem('user') : '',
    token: localStorage.getItem('token')? localStorage.getItem('token') : '',
    userId: localStorage.getItem('userId')? localStorage.getItem('userId') : '',
  }, 
  addContainer :{
    hidden: true
  }
}

const trackerSlice = createSlice({
  name: 'expenses',
  initialState,
  reducers: {
    hide: (state)=>{
      state.addContainer.hidden = !state.addContainer.hidden
    }
  },
  extraReducers: builder => {
    builder
          .addCase(fetchExpenses.pending, (state) => {
            state.todoState.status = 'loading';
          })
          .addCase(fetchExpenses.fulfilled, (state, action) => {
            state.todoState.expenses = [];
            state.todoState.credit = [];
            state.todoState.debit = [];
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
          .addCase(addExpenses.fulfilled, (state , action)=>{
            state.todoState.expenses = [];
            state.todoState.credit = [];
            state.todoState.debit = [];
            state.todoState.expenses = action.payload;
            state.todoState.expenses.map((expense)=>{
              if(expense.money >= 0){
                state.todoState.credit.push(expense.money);
              } else{
                state.todoState.debit.push(expense.money);
              }
            })
          })
          .addCase(deleteExpenses.fulfilled, (state , action)=>{
            state.todoState.expenses = [];
            state.todoState.credit = [];
            state.todoState.debit = [];
            state.todoState.expenses = action.payload;
            state.todoState.expenses.map((expense)=>{
              if(expense.money >= 0){
                state.todoState.credit.push(expense.money);
              } else{
                state.todoState.debit.push(expense.money);
              }
            })
          })
          .addCase(signup.fulfilled, (state, action)=>{
            localStorage.setItem('user', action.payload.newUser.user)
            localStorage.setItem('userId', action.payload.newUser._id)
            localStorage.setItem('token', action.payload.token);
            state.userState.token = action.payload.token
            state.userState.userId = action.payload.newUser._id
            state.userState.user = action.payload.newUser.user 

          })
          .addCase(login.fulfilled, (state, action)=>{
            localStorage.setItem('user', action.payload.existingUser.user)
            localStorage.setItem('userId', action.payload.existingUser._id)
            localStorage.setItem('token', action.payload.token);
            state.userState.token = action.payload.token
            state.userState.userId = action.payload.existingUser._id; 
            state.userState.user = action.payload.existingUser.user 
          })
  }
})

export default trackerSlice.reducer;
export const {hide} = trackerSlice.actions;