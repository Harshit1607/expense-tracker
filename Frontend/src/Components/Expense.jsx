import React from 'react'
import { useSelector } from 'react-redux'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Custom({item}){
      return(
        <div className='Total' id='Total'>
        <span className='balance'>{item.type}</span>
        <span>Rs.{item.money}</span>
      </div>
      )
    }
  


function Expense(){
  const {credit, debit} = useSelector(state => state.expenses.todoState)

  const totalCredit = credit.reduce((acc, curr)=>{
    return acc+curr;
  }, 0)
  const totalDebit = debit.reduce((acc, curr)=>{
    return acc+curr;
  }, 0)
  const totalExpense = totalCredit + totalDebit;

  const expensearray = [{
    type: 'Your balance',
    money: totalExpense
  },{
    type: 'Incoming',
    money: totalCredit
  },{
    type: 'Outgoing',
    money: totalDebit*(-1)
  }

  ]

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className='expense-container'>
      <Slider {...settings}>
      {
        expensearray.map((item, index)=>{
          return(
            <Custom item={item} key={index}/>
          )
        })
      }
        
       
      </Slider>
    </div>
  )
}

export default Expense