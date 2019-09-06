import React from 'react'
import { connect } from 'react-redux'
import ExpenseForm from './ExpenseForm'
//import { editExpense } from "../actions/expenses";
import { startRemoveExpense, startEditExpense } from "../actions/expenses";

const EditExpensePage = (props)=> {
    //т.к. этот компонент вызывается через React Router, то и params он сюда присылает свой
    //так что это объект с кучей всяких ништяков
    //по сути props это как request в экспресс
    //console.log(props);
    return (
        <div>
            <div className="page-header">
                <div className="content-container">
                    <h1 className='page-header__title'>Edit Expense</h1>
                </div>
            </div>
            <div className='content-container'>
                <ExpenseForm
                    onSubmit={(expense)=>{
                        props.dispatch(startEditExpense(props.expense.id, expense));
                        props.history.push('/');
                    }}
                    expense={props.expense}
                />
                <button
                    className="button button--secondary"
                    onClick={()=>{
                    props.dispatch(startRemoveExpense(props.expense));
                    props.history.push('/');
                }}>Remove expense</button>
            </div>
        </div>
    );
};

const mapStateToProps = (state, props)=>{
    return {
        expense: state.expenses.find((expense) => expense.id === props.match.params.id)
    }
};

export default connect(mapStateToProps)(EditExpensePage);
