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
    return (dispatch, getState)=>{
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

        //пушу экспенс в массив экспенсов юзера, id которого лежит в auth стейте
        return database.ref(`users/${getState().auth.uid}/expenses`).push(expense).then((ref)=>{
            //вот теперь можно диспатчить этот экспенс в redux-state, возвращая промис, который приходит из обращения к бд
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

//удаляет экспенс из бд, потом уже из стейта. асинхронная, возвращает промис
export const startRemoveExpense = ({ id } = {})=>{
    return (dispatch, getState)=>{
        return database.ref(`users/${getState().auth.uid}/expenses/${id}`).remove().then(()=>{
            dispatch(removeExpense({ id }));
        })
    };
};

//EDIT_EXPENSE

export const editExpense = (id, updates)=>({
    type: 'EDIT_EXPENSE',
    id,
    updates
});

export const startEditExpense = (id, updates)=>{
    return (dispatch, getState)=>{
        return database.ref(`users/${ getState().auth.uid }/expenses/${id}`).set({
            ...updates
        }).then(()=>{
            dispatch(editExpense(id, updates));
        })
    };
};

//SET_EXPENSE

export const setExpense = (expenses)=>({
    type: 'SET_EXPENSES',
    expenses
});

//берет из бд все экспенсы юзера и пихает их в redux стейты
export const startSetExpenses = ()=>{
    return (dispatch, getState)=>{
        return database.ref(`users/${ getState().auth.uid }/expenses`).once('value').then((snapshot)=>{
            //перевожу дибильный firebase массив в нормальный человеческий вид
            const expenses = [];
            snapshot.forEach((childSnapshot)=>{
               expenses.push({
                   id: childSnapshot.key,
                   ...childSnapshot.val()
               })
            });
            //диспатчу экспенсы в стейт
            dispatch(setExpense(expenses));
        })
    }
};