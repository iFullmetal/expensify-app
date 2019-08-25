//Get filtered expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate })=>{
    return expenses.filter((expense) => (startDate === null || expense.createdAt >= startDate)
        && (endDate === null || expense.createdAt <= endDate)
        && expense.description.toLowerCase().includes(text.toLowerCase())).sort((a, b)=>{
        if(sortBy === 'date'){
            return a.createdAt > b.createdAt ? -1 : 1;
        }
        else{
            return a.amount > b.amount ? -1 : 1;
        }
    })
};

export default getVisibleExpenses;