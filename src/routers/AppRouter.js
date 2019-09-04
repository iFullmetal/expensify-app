import React from 'react'
import { Router, Route, Switch, Link, NavLink } from 'react-router-dom'
import { createBrowserHistory } from 'history'//для управления браузерраутингом ото всюду
import NotFoundPage from "../components/NotFoundPage";
import AddExpensePage from "../components/AddExpensePage";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import EditExpensePage from "../components/EditExpensePage";
import Header from '../components/Header'
import LoginPage from '../components/LoginPage'
//мой компонент-раут с проверкой аунтификации и отрисов
import PrivateRoute from './PrivateRoute';
//мой компонент-раут с обработкой ситуации, когда юзер попал на / по link из NotFoundPage,
// событие onAuthStateChanged не сработало и его не редируктнуло на /dashboard, хотя он залогинен
import PublicRoute from "./PublicRoute";

export const history = createBrowserHistory();//для browser-routing'а

//пихаю роутер в компонент,
// теперь реакт будет реднедрить роутер => роутер решает, какой раут активен => раут рисует свой компонент
const AppRouter = ()=>(
    //client routing rout handlers
    <Router history={history}>
        <div>
            {//свитч делает поведение раутов как в экспрессе, т.е. нашел совпадение => дальше по раутам не иду
            }
            <Switch>
                <PublicRoute
                    path='/'
                    component={LoginPage}
                    //без этого пропа если какой-то другой адресс будет включать в себя этот(/), то этот тоже будет вызван
                    exact={true}/>
                <PrivateRoute path='/dashboard' component={ExpenseDashboardPage}/>
                <PrivateRoute path='/create' component={AddExpensePage}/>
                <PrivateRoute path='/edit/:id' component={EditExpensePage}/>
                {//если ни один раут не совпал, то рисую этот, т.к. раут без path всегда и везде подходит
                }
                <Route component={NotFoundPage}/>

            </Switch>
        </div>

    </Router>
);

export default AppRouter