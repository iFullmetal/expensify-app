import React from 'react'
import reactDOM from 'react-dom'
//для связи реакта с redux стором
import { Provider } from 'react-redux'
import AppRouter from "./routers/AppRouter";
//импортирую мой redux-ный store
import configureStore from "./store/configureStore";
import { addExpense } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";

//инициализирую react-dates
import 'react-dates/initialize';

//'reset' - штука, которая сносит дефолтные стили браузера, которые у всех браузеров разные
import 'normalize.css/normalize.css'
//гружу стили, а вебпак знает, что с ними делать, т.к. я ему это сказал в конфиге, а конфигу я все сказал в конфиге конфига, которому я.....
import './styles/styles.scss'

const store = configureStore();

store.dispatch(addExpense({
    description: 'water bill',
    amount: 20,
    createdAt: 121
}));

store.dispatch(addExpense({
    description: 'gas bill',
    amount: 75,
    createdAt: 1251
}));

store.dispatch(addExpense({
    description: 'rent',
    amount: 109500,
    createdAt: 1251
}));

const jsx = (
    //компоненты в обертке провайдера имеют доступ к redux стору
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

reactDOM.render(jsx , document.getElementById('app'))