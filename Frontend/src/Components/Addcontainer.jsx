import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addExpenses } from '../Features/trackerSlice.js';
import { hide } from '../Features/trackerSlice.js';
import BackspaceIcon from '@mui/icons-material/Backspace';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const Addcontainer = () => {
  const [text, setText] = useState("");
  const [money, setMoney] = useState();
  const userId = useSelector(state=>state.expenses.userState.userId);
  const hidden = useSelector(state=>state.expenses.addContainer.hidden)
  const dispatch = useDispatch();

  function handleHide(){
    dispatch(hide());
  }
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
  function numPad(event){
    const newMoney = event.target.value;
    if (!money){
      setMoney(newMoney)
    }else{ 
    const val = parseInt(`${money}${newMoney}`)
    setMoney(val);}
  }
  function numPad2(event){
    const val = event.target.value;
    
    setMoney(val)
  }
  function numPad3(){
    const newMoney = money;
    if(money<0){
      let val = newMoney * (-1);
      val = Math.floor(val/10)
      val = val * -1
      setMoney(val)
    } else if(money >= 0){
    const val = Math.floor(newMoney/10)
    setMoney(val)
  }else{
      setMoney('');
    }
  }

  return (
    <div className='add-container' style={{
      display: hidden? 'none' : '',
    }}>
      <div className='add-heading'>
        <ArrowBackIcon onClick={handleHide} style={{'cursor': 'pointer', 'marginLeft':'10px'}}/>
      </div>
      <div className='add-input'>
        {/* <span>
          Amount
        </span> */}
        <input placeholder='Amount...' value={money} onChange={handleMoney}/>
      </div>
      <div className='add-input'>
        {/* <span>
          Expenses made for?
        </span> */}
        <input placeholder='Made for...' value={text} onChange={handleText} />
      </div>
      <button className='add-expense' onClick={addExpense}>Add Expense</button>
      <div className='numpad'>
        <button className='numpad-button' onClick={numPad} value='1'>1</button>
        <button className='numpad-button' onClick={numPad} value='2'>2</button>
        <button className='numpad-button' onClick={numPad} value='3'>3</button>
        <button className='numpad-button' onClick={numPad} value='4'>4</button>
        <button className='numpad-button' onClick={numPad} value='5'>5</button>
        <button className='numpad-button' onClick={numPad} value='6'>6</button>
        <button className='numpad-button' onClick={numPad} value='7'>7</button>
        <button className='numpad-button' onClick={numPad} value='8'>8</button>
        <button className='numpad-button' onClick={numPad} value='9'>9</button>
        <button className='numpad-button corner-left' onClick={numPad2} value='-'>-</button>
        <button className='numpad-button' onClick={numPad} value='0'>0</button>
        <button className='numpad-button corner-right' onClick={numPad3}><BackspaceIcon /></button>
      </div>
    </div>
  )
}
