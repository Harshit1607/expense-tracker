import React, {useEffect} from 'react'
import { AddExpense } from "./AddExpense.js";
import { Expense } from "./Expense.js";
import { Statements } from "./Statements.js"; 
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Addcontainer } from './Addcontainer.js';
import { hide } from '../Features/trackerSlice.js';
import { useDispatch } from 'react-redux';

export const ExpenseTracker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(()=>{
    const token = localStorage.getItem('token');
    const tokenexp = (jwtDecode(token)).exp

    const now = Date.now() / 1000

    if(now>tokenexp){
      localStorage.setItem('token', '')
      localStorage.setItem('userId', '')
      navigate('/login')
    }
  }, [])
  return (
    <div className='main'>
    <div className='expense-tracker'>
      <div className="heading"><h2>Expense Tracker</h2></div>
      <Expense />
      <Statements />
      <div className='logout-add'>
      <button className='logout' onClick={()=>{localStorage.setItem('token', '')
                                              localStorage.setItem('userId', '')
                            navigate('/login')
      }}>Logout</button>
      <button onClick={()=>{dispatch(hide());}}>+</button>
      </div>
    </div>
    <Addcontainer />
    </div>
  )
}
