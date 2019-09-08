import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from "./ExpenseListItem";
import getVisibleExpenses from "../selectors/expenses";

const ExpenseList = (props)=>(
  <div className='content-container'>
      <div className='list-header'>
          <div className='show-for-mobile'>Expenses</div>
          <div className='show-for-desktop'>Expense</div>
          <div className='show-for-desktop'>Amount</div>
      </div>
      <div className='list-item__body'>
          {
              props.expenses.length === 0 ?
                  ( <p className='list-item list-item--message'>No expenses</p> ) :
                  //рисую отфильтрованные затраты
                  (props.expenses.map((expense, index)=>
                      <ExpenseListItem
                          expense={expense}
                          key={index}
                      />))
          }
      </div>
  </div>
);

//в пропах будут лежать уже отфильтрованные экспенсы
const mapStateToProps = (state)=> {
    return {
        expenses: getVisibleExpenses(state.expenses, state.filter),
    }
//размечаю, к каким редюсерам у компо
}

//коннекчу компонент к редукс стору, если он в <Provider>,
//то у него теперь есть доступ к стору и работать это будет как и дефолтеные стейты реакта, т.е.
//все плюшки умного рендера включены
export default connect(mapStateToProps)(ExpenseList); //вызываю полученную из connect функцию со своим компонетом в аргументах
