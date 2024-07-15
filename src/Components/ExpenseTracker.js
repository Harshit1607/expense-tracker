import React, {useEffect} from 'react'
import { AddExpense } from "./AddExpense.js";
import { Expense } from "./Expense.js";
import { Statements } from "./Statements.js"; 
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

export const ExpenseTracker = () => {
  const navigate = useNavigate();
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
    <div className='expense-tracker'>
      <div className="heading"><h2>Expense Tracker</h2></div>
      <Expense />
      <Statements />
      <AddExpense />
      <button className='logout' onClick={()=>{localStorage.setItem('token', '')
                                              localStorage.setItem('userId', '')
                            navigate('/login')
      }}>Logout</button>
    </div>
  )
}
