import { createStore, combineReducers} from "redux";
import uuid from 'uuid'

//ADD_EXPENSE
const addExpense = (
    { description = '',
        note = '',
        amount = 0,
        createdAt = 0 }
        = {}
    )=>({
    type:'ADD_EXPENSE',
    //в свойствах action будет лежать expense
    expense: {
        id: uuid(),
        note,
        description,
        amount,
        createdAt
    }
});

//REMOVE_EXPENSE

const removeExpense = ({ id } = {})=>(
    {
        type: 'REMOVE_EXPENSE',
        id
    }
);

//EDIT_EXPENSE

const editExpense = (id, updates)=>({
   type: 'EDIT_EXPENSE',
    id,
   updates
});

//FILTER_SET_TEXT

const setTextFilter = (text = '')=>({
    type: 'FILTER_SET_TEXT',
    text
});

//SORT_BY

const sortByAmount = ()=>({
   type: 'SORT_BY',
   sortBy: 'amount'
});

const sortByDate = ()=>({
   type: 'SORT_BY',
   sortBy: 'date'
});

//SET_START_DATE

const setStartDate = (date)=>({
    type: 'SET_START_DATE',
    startDate: date
});

//SET_END_DATE

const setEndDate = (date)=>({
    type: 'SET_END_DATE',
    endDate: date
});

//Expenses reducer

const expensesReducerDefaultState = [];

const expensesReducer = (state = expensesReducerDefaultState, action) => {
    switch (action.type) {
        case 'ADD_EXPENSE':
            return [...state, action.expense]; //модный синтаксис конкатинации массива
        case 'REMOVE_EXPENSE':
            return state.filter((expense) => expense.id !== action.id);
        case 'EDIT_EXPENSE':
            return state.map((expense)=>{
                if(expense.id === action.id){
                    return {
                        ...expense,
                        ...action.updates
                    }
                }
                return expense
            });
        default:
            return state
    }
};

//Filter reducer

const filterReducerDefaultState = {
    text: '',
    sortBy: 'date',
    startDate: undefined,
    endDate: undefined
};

const filterReducer = (state = filterReducerDefaultState, action)=>{
    switch (action.type) {
        case 'FILTER_SET_TEXT':
            return {
                ...state,
                text: action.text
            };
        case 'SORT_BY':
            return {
                ...state,
                sortBy: action.sortBy
            };
        case 'SET_START_DATE':
            return {
                ...state,
                startDate: action.startDate
            };
        case 'SET_END_DATE':
            return {
                ...state,
                endDate: action.endDate
            };
        default:
            return state;
    }
};

//Get filtered expenses

const getVisibleExpenses = (expenses, { text, sortBy, startDate, endDate })=>{

  const filteredExpenses = expenses.filter((expense) => (startDate === undefined || expense.createdAt >= startDate)
      && (endDate === undefined || expense.createdAt <= endDate)
      && expense.description.toLowerCase().includes(text.toLowerCase()));

  return filteredExpenses.sort((a, b)=>{
      if(sortBy === 'date'){
          return a.createdAt > b.createdAt ? -1 : 1;
      }
      else{
          return a.amount > b.amount ? -1 : 1;
      }
  })
};

//Store creation

const store = createStore(
    combineReducers({
        //свойство : редюсер, который занимается его менеджментом
        //(т.е. expenses преобритает значение state из редюсера, в данном случае массив)
        expenses: expensesReducer,
        filter: filterReducer
    })
);

//вызывается при любом изменении в store
store.subscribe(()=>{
    const state = store.getState();
    console.log(getVisibleExpenses(state.expenses, state.filter))
    //console.log(store.getState());
});

const firstExpense = store.dispatch(addExpense({ description: 'rent', amount: 100, createdAt: 123 }));
const secondExpense = store.dispatch(addExpense({ description: 'rent for my house', amount: 111, createdAt: 4215 }));
console.log(secondExpense);

// store.dispatch(removeExpense(secondExpense.expense));
//
// store.dispatch(editExpense(firstExpense.expense.id, { amount: 500 }));
//
// store.dispatch(setTextFilter('rent'));
// store.dispatch(setTextFilter());
//
// store.dispatch(sortByAmount());
// store.dispatch(sortByDate());
console.log('start_date')
store.dispatch(setStartDate(125));
store.dispatch(setStartDate());
console.log('end date');
store.dispatch(setEndDate(1231));
store.dispatch(setEndDate());
console.log('text filter')
store.dispatch(setTextFilter('HoUSe'));
store.dispatch(setTextFilter());
console.log('amount sort');
store.dispatch(sortByAmount());

