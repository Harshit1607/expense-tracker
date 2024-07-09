import React , {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchExpenses, deleteExpenses} from '../Features/trackerSlice.js'


export const Statements = () => {
  const {expenses, status, error} = useSelector((state)=> state.expenses)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchExpenses());
  }, [dispatch])

  function deleteExpense(id){
    dispatch(deleteExpenses(id));
  }
  
  return (
    <div className='statements-container'>
      <div className='statement statement-heading' >
          <span>Information</span>
          <span>Amount</span>
        </div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'suceeded' && expenses.map((expense)=>(
          <div className='statement' key={expense._id} onClick={()=>deleteExpense(expense._id)}>
          <span>{expense.text}</span>
          <span>Rs.{expense.money}</span>
        </div>
      ))}
      
    </div>
  )
}
