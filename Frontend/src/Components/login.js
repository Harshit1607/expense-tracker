import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom'
import { login } from '../Features/trackerSlice.js';

export const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = !!useSelector(state=>state.expenses.userState.token);

  useEffect(()=>{
    if(token){
    navigate('/');
    }
  }, [token])

  const[user, setUser]=useState("");
  const[email, setEmail]=useState("");
  const[pass, setPass]=useState("");
  const[hidePass,setHidePass] = useState(true)

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
  function handleHidepass(){
    setHidePass(!hidePass)
  }
  async function handleSubmit(e){
    dispatch(login({user, email, pass}));
  }


  return (
    <div className='Auth-container'>
    <div className='Auth-right'>
      <h2>Login</h2>
      <input placeholder='username..' onChange={handleUser}/>
      <input placeholder='email...' onChange={handleEmail}/>
      <div className="auth-pass-container">
        <input placeholder='password...' onChange={handlePass} type={hidePass? 'password' : 'text'} className='auth-pass'/>
        <img src={hidePass?'https://cdn-icons-png.flaticon.com/256/367/367070.png': 'https://www.svgrepo.com/show/325176/eye-off.svg'} className='auth-eye' onClick={handleHidepass}/>
      </div>
      <button onClick={handleSubmit}>Login</button>
      </div>
      <div className='Auth-left'>
      <p>New user, <a onClick={()=>{navigate('/signup');}}> Signup</a> instead</p>
    </div>
  </div>
  )
}