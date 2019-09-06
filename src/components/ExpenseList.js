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
      {
          //рисую отфильтрованные затраты
          getVisibleExpenses(props.expenses, props.filter).map((expense, index)=>
              <ExpenseListItem
                  expense={expense}
                  key={index}
              />)
      }
  </div>
);

const mapStateToProps = (state)=> {
    return {
        expenses: state.expenses,
        filter: state.filter
    }
//размечаю, к каким редюсерам у компо
}

//коннекчу компонент к редукс стору, если он в <Provider>,
//то у него теперь есть доступ к стору и работать это будет как и дефолтеные стейты реакта, т.е.
//все плюшки умного рендера включены
export default connect(mapStateToProps)(ExpenseList); //вызываю полученную из connect функцию со своим компонетом в аргументах
