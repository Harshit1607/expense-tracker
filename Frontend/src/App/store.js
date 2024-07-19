import { configureStore } from "@reduxjs/toolkit";
import trackerReducer from '../Features/trackerSlice.js'

const store = configureStore({
  reducer: {
    expenses: trackerReducer,
  }
})

export default store;