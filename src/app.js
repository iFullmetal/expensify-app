import React from 'react'
import reactDOM from 'react-dom'
//для связи реакта с redux стором
import { Provider } from 'react-redux'
import AppRouter, { history } from "./routers/AppRouter";
//импортирую мой redux-ный store
import configureStore from "./store/configureStore";
import { startSetExpenses } from "./actions/expenses";
import { login, logout} from "./actions/auth";
import getVisibleExpenses from "./selectors/expenses";
//'reset' - штука, которая сносит дефолтные стили браузера, которые у всех браузеров разные
import 'normalize.css/normalize.css';
//инициализирую react-dates
import 'react-dates/initialize';
//гружу стили, а вебпак знает, что с ними делать, т.к. я ему это сказал в конфиге, а конфигу я все сказал в конфиге конфига, которому я.....
import './styles/styles.scss';
//подключаюсь к бд
import { firebase } from './firebase/firebase';

const store = configureStore();

const jsx = (
    //компоненты в обертке провайдера имеют доступ к redux стору
    <Provider store={store}>
        <AppRouter/>
    </Provider>
);

//чтобы не перерисовывать лишний раз
let hasRendered = false;
const renderApp = ()=>{
  if(!hasRendered){
      reactDOM.render(jsx , document.getElementById('app'));
      hasRendered = true;
  }
};

reactDOM.render(<p>loading...</p> , document.getElementById('app'));

//обработка событий log in/ log out
firebase.auth().onAuthStateChanged((user) => {
    //user != undefined => он залогинился
    if(user){
        //диспатчу auth token в стейты
        console.log(user);
        store.dispatch(login(user.uid));
        //рисую само приложение только после того, как все необходимые данные с бд пришли
        store.dispatch(startSetExpenses()).then(()=>{
            renderApp();
        });
        //редирекчу на дэшбоард
        //(т.к. это событие может вызваться не только при первом login с login пэйджа, а и при рефреше,
        // то нужно это обработать)
        if(history.location.pathname === '/') {
            history.push('/dashboard');
        }
    }
    else{
        store.dispatch(logout());
        //чтобы залогинится нужно риосвать LoginPage
        renderApp();
        //редирекчу на логин пэйдж
        history.push('/')
    }
});