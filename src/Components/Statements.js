import React , {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {fetchExpenses, deleteExpenses} from '../Features/trackerSlice.js'


export const Statements = () => {
  const {expenses} = useSelector((state)=> state.expenses.todoState)
  const userId = useSelector(state=>state.expenses.userState.userId);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(fetchExpenses(userId));
  }, [])

  function deleteExpense({id, userId}){
    dispatch(deleteExpenses({id, userId}));
  }
  
  return (
    <div className='statements-container'>
      <span className='statement-heading'>Trasactions</span>
      {expenses.map((expense)=>(
          <div className='statement' key={expense._id} onClick={()=>deleteExpense({id: expense._id, userId})}>
          <span>{expense.text}</span>
          <span>Rs.{expense.money}</span>
        </div>
      ))}
    </div>
  )
}
