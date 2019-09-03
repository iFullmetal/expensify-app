import React from 'react'
import reactDOM from 'react-dom'
//для связи реакта с redux стором
import { Provider } from 'react-redux'
import AppRouter from "./routers/AppRouter";
//импортирую мой redux-ный store
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { setTextFilter } from "./actions/filters";
import getVisibleExpenses from "./selectors/expenses";
//'reset' - штука, которая сносит дефолтные стили браузера, которые у всех браузеров разные
import 'normalize.css/normalize.css';
//инициализирую react-dates
import 'react-dates/initialize';
//гружу стили, а вебпак знает, что с ними делать, т.к. я ему это сказал в конфиге, а конфигу я все сказал в конфиге конфига, которому я.....
import './styles/styles.scss';
import './firebase/firebase';

const store = configureStore();

const jsx = (
    //компоненты в обертке провайдера имеют доступ к redux стору
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

reactDOM.render(<p>loading...</p> , document.getElementById('app'));

//рисую само приложение только после того, как все необходимые данные с бд пришли
store.dispatch(startSetExpenses()).then(()=>{
    reactDOM.render(jsx , document.getElementById('app'));
});

