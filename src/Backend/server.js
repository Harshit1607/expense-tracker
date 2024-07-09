import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
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

const Expense = mongoose.model("Expense", expenseSchema);

// const expense = new Expense({
//   text: "first",
//   money: 10
// })
// expense.save();

app.get("/", async (req, res)=>{
  try{
    const expenses = await Expense.find();
    console.log(expenses)
    res.json(expenses);
  } catch (err){
    console.log(err)
  }
})

app.post("/", async (req, res)=>{
  const newText = req.body.text;
  const newMoney = req.body.money;
  try{
    const expense = new Expense({
      text: newText,
      money: newMoney
    })
    await expense.save();
    res.redirect("/");
  }catch(err){
    console.log(err)
  }
})

app.delete("/:id", async (req, res)=>{
  const id = req.params.id;
  try{
    await Expense.deleteOne({_id: id});
    res.redirect("/");
  }catch (err){

  }
})

app.listen(port,  () => {
  console.log(`Server running on port ${port}`);
})