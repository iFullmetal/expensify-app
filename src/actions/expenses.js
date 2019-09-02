import uuid from 'uuid'
import database from '../firebase/firebase'

//ADD_EXPENSE
export const addExpense = (expense)=>({
    type:'ADD_EXPENSE',
    //в свойствах action будет лежать expense
    expense
});

//thunk-action, теперь action возвращает функцию, что-то типа middleware, с которым я могу слать стейты(обработанные
//в редюсере) в базу данных
export const startAddExpense = (expenseData = {})=>{
    return (dispatch)=>{
        //деструктурирую expense, который создал юзер
        const {
            description = '',
            note = '',
            amount = 0,
            createdAt = 0
        } = expenseData;

        //отправляю его в базу данных
        const expense = {
            description,
            note,
            amount,
            createdAt
        };
        //вот теперь можно диспатчить этот экспенс в redux-state
        database.ref('expenses').push(expense).then((ref)=>{
            dispatch(addExpense({
                id: ref.key, //id документа в бд
                ...expense
            }))
        })
    }
};

//REMOVE_EXPENSE

export const removeExpense = ({ id } = {})=>(
    {
        type: 'REMOVE_EXPENSE',
        id
    }
);

//EDIT_EXPENSE

export const editExpense = (id, updates)=>({
    type: 'EDIT_EXPENSE',
    id,
    updates
});