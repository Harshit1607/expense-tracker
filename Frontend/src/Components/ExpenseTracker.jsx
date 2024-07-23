import React, {useEffect} from 'react'
import Expense  from "./Expense.jsx";
import { Statements } from "./Statements.js"; 
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { Addcontainer } from './Addcontainer.jsx';
import { hide, logout } from '../Features/trackerSlice.js';
import { useDispatch, useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout.js';
import AddIcon from '@mui/icons-material/Add';

export const ExpenseTracker = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state=>state.expenses.userState.user)
  const hidden = useSelector(state=>state.expenses.addContainer.hidden)
  useEffect(()=>{
    const token = localStorage.getItem('token');
    const tokenexp = (jwtDecode(token)).exp

    const now = Date.now() / 1000

    if(now>tokenexp){
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('user');
        dispatch(logout());
        navigate('/login')
    }
  }, [])
  return (
    <div className='main'>
    <div className='expense-tracker' style={{
          display: hidden? '' : 'none',
        }}>
      <div className="heading">
        <div className='greet'>
          <span>Hello</span>
          <span className='name'>{user}</span>
        </div>
        <LogoutIcon onClick={()=>{
          localStorage.removeItem('token');
          localStorage.removeItem('userId');
          localStorage.removeItem('user');
          dispatch(logout());
          navigate('/login')
      }} style={{'cursor': 'pointer'}}/>
      </div>
      <Expense />
      <Statements />
      <div className='logout-add'>
        <AddIcon onClick={()=>{dispatch(hide())}} style={{'cursor': 'pointer'}}/>
      </div>
    </div>
    <Addcontainer />
    </div>
  )
}
