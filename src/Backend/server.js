import express from 'express';
import bodyParser from "body-parser";
import mongoose, { Mongoose } from "mongoose";
import cors from 'cors'


const app = express();
const port = 5000;


mongoose.connect('mongodb://localhost:27017/expense-tracker');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

const expenseSchema = new mongoose.Schema({
  text : {
    type: String,
    required: true
  },
  money : {
    type: Number,
    required: true,
  }
})
