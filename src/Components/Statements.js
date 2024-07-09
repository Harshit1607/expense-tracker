import React , {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchExpenses} from '../Features/trackerSlice.js'


export const Statements = () => {
  const {expenses, status, error} = useSelector((state)=> state.expenses)
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchExpenses());
  }, [dispatch])
  

  return (
    <div className='statements-container'>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'suceeded' && expenses.map((expense)=>(
          <div className='statement' key={expense._id} >
          <span>{expense.text}</span>
          <span>{expense.money}</span>
        </div>
      ))}
      
    </div>
  )
}
