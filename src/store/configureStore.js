import { createStore, combineReducers} from "redux";
import expensesReducer from "../reducers/expenses";
import filterReducer from '../reducers/filters'

//Store creation

//по вызову функции, импортированной из этого файла, создаст store с нужными настройками
export default ()=>{
    return createStore(
        combineReducers({
            //свойство : редюсер, который занимается его менеджментом
            //(т.е. expenses преобритает значение state из редюсера, в данном случае массив)
            expenses: expensesReducer,
            filter: filterReducer
        }), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );
    //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() - для работы расширения
    //redux devtools для браузера
}


