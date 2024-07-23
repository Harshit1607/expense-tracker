import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../Features/trackerSlice.js';

export const Signup = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate()
  const[user, setUser]=useState("");
  const[email, setEmail]=useState("");
  const[pass, setPass]=useState("");

  const token = !!useSelector(state=>state.expenses.userState.token);

  useEffect(()=>{
    if(token){
    navigate('/');
    }
  }, [token])

  function handleUser(e){
    const newText = e.target.value;
    setUser(newText);
  }
  function handleEmail(e){
    const newText = e.target.value;
    setEmail(newText);
  }
  function handlePass(e){
    const newText = e.target.value;
    setPass(newText);
  }
  function handleSubmit(){
    dispatch(signup({user, email, pass}));
  }


  return (
    <div className='Auth-container'>
      <div className='Auth-right'>
        <h2>Signup</h2>
        <input placeholder='username..' onChange={handleUser}/>
        <input placeholder='email...' onChange={handleEmail}/>
        <input placeholder='password...' onChange={handlePass} type='password'/>
        <button onClick={handleSubmit}>Signup</button>
        </div>
        <div className='Auth-left'>
        <p>Already a user, <a onClick={()=>{navigate('/login');}}>Login</a> instead</p>
      </div>
    </div>
  )
}