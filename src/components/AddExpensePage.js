import React from 'react'
import ExpenseForm from './ExpenseForm'
import { connect } from 'react-redux'
import { startAddExpense } from "../actions/expenses";

const AddExpensePage = (props) => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h1 className='page-header__title'>Add Expense</h1>
            </div>
        </div>
        <div className='content-container'>
            <ExpenseForm
                onSubmit={(expense)=>{
                    //диспатчу action с middleware, который заодно шлет expense на бд после валидации reducer'ом
                    props.dispatch(startAddExpense(expense));
                    //редирукчу на страницу с затрами по browser routingовому.
                    props.history.push('/');
                }}
            />
        </div>
    </div>
);


//если из всего стейта нужен только доступ к диспатчам, то в коннект можно не отправлять стейт мапер.
//доступа к редюсерам не будет, но props.dispatch все равно придет
export default connect()(AddExpensePage)