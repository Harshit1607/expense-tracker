import React from 'react'
import { useSelector } from 'react-redux'

export const Expense = () => {
  const {credit, debit} = useSelector(state => state.expenses)

  

  const totalCredit = credit.reduce((acc, curr)=>{
    return acc+curr;
  }, 0)
  const totalDebit = debit.reduce((acc, curr)=>{
    return acc+curr;
  }, 0)
  const totalExpense = totalCredit + totalDebit;
  return (
    <div className='expense-container'>
      <div className='Credit'>Incominng- Rs.{totalCredit}</div>
      <div className='Debit'>Outgoing- Rs.{totalDebit}</div>
      <div className='Total'> Total- Rs.{totalExpense}</div>
    </div>
  )
}
