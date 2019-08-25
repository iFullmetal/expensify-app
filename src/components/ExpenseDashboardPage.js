import React from 'react'
import ExpenseList from "./ExpenseList";
import ExpenseListFilters from "./ExpenseListFilters";

console.log('test');

const ExpenseDashboardPage = ()=>(
    <div>
        <p>Dashboard page</p>
        <ExpenseListFilters/>
        <ExpenseList/>
    </div>
);

export default ExpenseDashboardPage