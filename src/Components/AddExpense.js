import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addExpenses } from '../Features/trackerSlice.js';

export const AddExpense = () => {
  const [text, setText] = useState("");
  const [money, setMoney] = useState();
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
    dispatch(addExpenses({text, money}))
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
