import { createStore } from "redux";

//redux - глобальный state, доступный из любого компонента
//т.е. больше не нужно передавать 100500 коллбэков в props, у всех компонентов
//будет доступ к функциям от сюда

//Reducer - обработчик событий в redux
//p.s. функция будет взываться так же и при каждом диспатче экшена
//1. не изменять значения state/action напрямую. только через return
const countReducer = (state = { count: 0 }, action)=>{
    //обработка событий в стиле си. Как мы до этого докатились?
    switch (action.type) {
        case 'INCREMENT':
            return {
                //если в action.value пришло число, юзаю его
                count: state.count + action.value
            };
        case 'DECREMENT':
            return {
                count: state.count - action.value
            };
        case 'RESET':
            return {
                count: 0
            };
        case 'SET':
            return {
                count: action.count
            };
        default:
            return state;
    }
};

const store = createStore(countReducer);

const setCount = ({count = 0})=>(
    {
        type: 'SET',
        count
    }
);

const reset = ()=>(
    {
        type: 'RESET'
    }
);


//теперь переданная функция будет вызываться при любом изменении в сторе
store.subscribe(()=>{
    console.log(store.getState());
});


//диспатч - отправка объекта action в стор
//после этого вызывается createStore, второй аргумент - action
store.dispatch({
    //это поле всегда должно присутствовать
    type: 'INCREMENT',
    //так же можно предавать дополнительные поля
    value: 5
});

//action'ы можно делать так, передавая вызов в аргументы диспатча, чтобы каждый раз не прописывать свойства объекта
const incrementCount = ({ value = 1 } = {})=>(
    {
        type: 'INCREMENT',
        value: (typeof value === 'number' ? value : 1)
    }
);

store.dispatch(incrementCount({ value: 3 }));

store.dispatch({
    type: 'DECREMENT',
    value: 5
});

const decrementCount = ({ value = 1 } = {})=>(
    {
        type: 'DECREMENT',
        value: (typeof value === 'number' ? value : 1)
    }
);

store.dispatch(decrementCount({ value:5 }));


store.dispatch(reset());

store.dispatch(setCount({count:100500}));

