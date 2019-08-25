import React from 'react'
import ExpenseForm from './ExpenseForm'
import { connect } from 'react-redux'
import { addExpense } from "../actions/expenses";

const AddExpensePage = (props) => (
    <div>
        <h1>Add Expense</h1>
        <ExpenseForm
            onSubmit={(expense)=>{
                props.dispatch(addExpense(expense))
                //редирукчу на страницу с затрами по browser routingовому.
                props.history.push('/');
            }}
        />
    </div>
);


//если из всего стейта нужен только доступ к диспатчам, то в коннект можно не отправлять стейт мапер.
//доступа к редюсерам не будет, но props.dispatch все равно придет
export default connect()(AddExpensePage)