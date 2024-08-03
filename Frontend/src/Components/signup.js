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
  const[hidePass,setHidePass] = useState(true)

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
  function handleHidepass(){
    setHidePass(!hidePass)
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
        <div className="auth-pass-container">
        <input placeholder='password...' onChange={handlePass} type={hidePass? 'password' : 'text'} className='auth-pass'/>
        <img src={hidePass?'https://cdn-icons-png.flaticon.com/256/367/367070.png': 'https://www.svgrepo.com/show/325176/eye-off.svg'} className='auth-eye' onClick={handleHidepass}/>
        </div>
        <button onClick={handleSubmit}>Signup</button>
        </div>
        <div className='Auth-left'>
        <p>Already a user, <a onClick={()=>{navigate('/login');}}>Login</a> instead</p>
      </div>
    </div>
  )
}