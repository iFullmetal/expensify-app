import React from 'react';
import { connect } from 'react-redux';
import getVisibleExpenses from '../selectors/expenses';
import getExpensesTotal from "../selectors/expenses-total";
import numeral from 'numeral';

const ExpensesSummary = (props)=> {
    const filteredExpenses = getVisibleExpenses(props.expenses, props.filter);
    return (
        <div>
            <p>Viewing {filteredExpenses.length} {filteredExpenses.length === 1? ' expense ' : " expenses " }
            totaling
                {' ' + numeral(getExpensesTotal(filteredExpenses)/100).format('$0,0.00')}</p>
        </div>
    )
};

const mapStateToProps = (state)=>({
    expenses: state.expenses,
    filter: state.filter
});

export default connect(mapStateToProps)(ExpensesSummary);

