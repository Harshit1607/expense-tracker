import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addExpenses } from '../Features/trackerSlice.js';

export const AddExpense = () => {
  const [text, setText] = useState("");
  const [money, setMoney] = useState();
  const userId = useSelector(state=>state.expenses.userState.userId);
  const dispatch = useDispatch();

  function handleText(event){
    const newText = event.target.value;
    setText(newText);
  }
  function handleMoney(event){
    const newMoney = event.target.value;
    setMoney(newMoney);
  }
  function addExpense(){
    dispatch(addExpenses({text, money, userId}))
    setText("");
    setMoney('');
  }

  return (
    <div className='add'>
      <input placeholder='text...' value={text} onChange={handleText}/>
      <input placeholder='money...' value={money} onChange={handleMoney}/>
      <button onClick={addExpense}>Add</button>
    </div>
  )
}
