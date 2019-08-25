//FILTER_SET_TEXT

export const setTextFilter = (text = '')=>({
    type: 'FILTER_SET_TEXT',
    text
});

//SORT_BY

export const sortByAmount = ()=>({
    type: 'SORT_BY',
    sortBy: 'amount'
});

export const sortByDate = ()=>({
    type: 'SORT_BY',
    sortBy: 'date'
});

//SET_START_DATE

export const setStartDate = (date)=>({
    type: 'SET_START_DATE',
    startDate: date
});

//SET_END_DATE

export const setEndDate = (date)=>({
    type: 'SET_END_DATE',
    endDate: date
});