import express from 'express';
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors'
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv';
import path from 'path'

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const mongopass = process.env.MONGOPASS;

mongoose.connect(`mongodb+srv://harshu:${mongopass}@expensecluster.h93exru.mongodb.net/?retryWrites=true&w=majority&appName=ExpenseCluster`);


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
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

const userSchema = new mongoose.Schema({
  user : {
    type: String,
    required: true,
    unique: true
  },
  email : {
    type: String,
    required: true,
  },
  pass : {
    type: String,
    required: true
  }
})

const Expense = mongoose.model("Expense", expenseSchema);
const User = mongoose.model("User", userSchema);


app.get("/", cors(), auth, async (req, res)=>{
  const userId = (req.query.userId)
  try{
    console.log(userId)
    const objectid = new mongoose.Types.ObjectId(userId);
    const expenses = await Expense.find({userId: objectid});
    res.json(expenses);
  } catch (err){
    console.log(err)
  }
})

app.post("/", async (req, res)=>{
  const newText = req.body.text;
  const newMoney = req.body.money;
  const userId = req.body.userId
  try{
    console.log(userId)
    const expense = new Expense({
      text: newText,
      money: newMoney,
      userId: userId
    })
    await expense.save();
    const expenses = await Expense.find({userId: userId});
    res.json(expenses);
  }catch(err){
    console.log(err)
  }
})

app.delete("/:id", async (req, res)=>{
  const userId = req.body.userId;
  const id = req.params.id;
  try{
    await Expense.deleteOne({_id: id, userId: userId});
    const expenses = await Expense.find({userId: userId});
    res.json(expenses);
  }catch (err){

  }
})

app.post('/signup', async(req, res)=>{
  const {user, email, pass} = req.body;
  try{
    const existingUser = await User.findOne({email});

    if(existingUser){
    return res.json({message: 'user already exists'})
    }
    const hashedpass = await bcrypt.hash(pass, 10);
    const newUser = new User({user, email, pass: hashedpass});
    await newUser.save();

    const token = jwt.sign({email: newUser.email, id: newUser._id}, 'secret', { expiresIn: '1h' })

    return res.json({newUser, token, message: 'signed up'})
    
      }
  catch (err){
    console.log(err);
  }
})

app.post('/login', async(req, res)=>{
  const {user, email, pass} = req.body;
  try {
    const existingUser = await User.findOne({email});

    if(!existingUser){
      return res.json({message: 'user does not exist'})
    }

    const isPassCorrect = await bcrypt.compare(pass, existingUser.pass);

    if(!isPassCorrect){
      return res.status(401).json({message: 'Pass incorrect'})
    }

    const token =  jwt.sign({email: existingUser.email, id: existingUser._id}, 'secret', { expiresIn: '1h' })

    res.json({existingUser, token, message: 'logged in'})
    
  } catch (error) {
    console.log(err)
  }  
})

async function auth(req, res, next) {
  const token = req.headers.authorization;

  if(!token){
    return res.status(401).json({message: 'authprization failed'})
  }
  try {
    const decoded = jwt.verify(token, 'secret');
    req.user = decoded;
    next();
  } catch (error) {
    next();
  }

}

app.listen(port,  () => {
  console.log(`Server running on port ${port}`);
})