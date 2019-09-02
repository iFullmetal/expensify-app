const getExpensesTotal = (expenses)=> {
    if(expenses.length === 0) return 0;

    return expenses.reduce((total, expense)=>{
        return total + expense.amount;
    }, 0)
};

export default getExpensesTotal;