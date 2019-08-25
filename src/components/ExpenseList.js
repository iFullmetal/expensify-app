import React from 'react'
import { connect } from 'react-redux'
import ExpenseListItem from "./ExpenseListItem";
import getVisibleExpenses from "../selectors/expenses";

const ExpenseList = (props)=>(
  <div>
      <h1>ExpenseList</h1>
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


//размечаю, к каким редюсерам у компонента будет доступ
const mapStateToProps = (state)=> {
    return {
        expenses: state.expenses,
        filter: state.filter
    }
}

//коннекчу компонент к редукс стору, если он в <Provider>,
//то у него теперь есть доступ к стору и работать это будет как и дефолтеные стейты реакта, т.е.
//все плюшки умного рендера включены
export default connect(mapStateToProps)(ExpenseList); //вызываю полученную из connect функцию со своим компонетом в аргументах
