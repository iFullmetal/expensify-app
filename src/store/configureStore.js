import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import expensesReducer from "../reducers/expenses";
import filterReducer from '../reducers/filters'
//с помощью этого middleware можно передавать вместо action-объектов action функции для того, чтобы
//отправлять стейты в бд
import thunk from 'redux-thunk';

//складываю все middleware в одно, чтобы использовать их вместе
const composeEchancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//Store creation

//по вызову функции, импортированной из этого файла, создаст store с нужными настройками
export default ()=>{
    return createStore(
        combineReducers({
            //свойство : редюсер, который занимается его менеджментом
            //(т.е. expenses преобритает значение state из редюсера, в данном случае массив)
            expenses: expensesReducer,
            filter: filterReducer
        }), composeEchancers(applyMiddleware(thunk)) //middleware девтулс + middleware thunk
    );
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() - для работы расширения
    //redux devtools для браузера
}


