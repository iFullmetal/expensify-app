import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from "../selectors/expenses-total";
import numeral from 'numeral';

const ExpensesSummary = (props)=> {
    const filteredExpenses = getVisibleExpenses(props.expenses, props.filter);
    return (
        <div className="page-header">
            <div className='content-container'>
                <h1 className='page-header__title'>
                    Viewing <span>{filteredExpenses.length}</span> {filteredExpenses.length === 1? ' expense ' : " expenses " }
                    totaling <span>
                    {' ' + numeral(getExpensesTotal(filteredExpenses)/100).format('$0,0.00')} </span>
                </h1>
                <div className='page-header__actions'>
                    <Link className='button' to={'/create'}>
                        Add Expense
                    </Link>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state)=>({
    expenses: state.expenses,
    filter: state.filter
});

export default connect(mapStateToProps)(ExpensesSummary);

