import React from 'react'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
import NotFoundPage from "../components/NotFoundPage";
import HelpPage from "../components/HelpPage";
import AddExpensePage from "../components/AddExpensePage";
import ExpenseDashboardPage from "../components/ExpenseDashboardPage";
import EditExpensePage from "../components/EditExpensePage";
import Header from '../components/Header'

//пихаю роутер в компонент,
// теперь реакт будет реднедрить роутер => роутер решает, какой раут активен => раут рисует свой компонент
const AppRouter = ()=>(
    //client routing rout handlers
    <BrowserRouter>
        <div>
            <Header/>
            {//свитч делает поведение раутов как в экспрессе, т.е. нашел совпадение => дальше по раутам не иду
            }
            <Switch>
                <Route
                    path='/'
                    component={ExpenseDashboardPage}
                    //без этого пропа если какой-то другой адресс будет включать в себя этот(/), то этот тоже будет вызван
                    exact={true}/>
                <Route path='/create' component={AddExpensePage}/>
                <Route path='/edit/:id' component={EditExpensePage}/>
                <Route path='/help' component={HelpPage}/>
                {//если ни один рауто не совпал, то рисую этот, т.к. раут без path всегда и везде подходит
                }
                <Route component={NotFoundPage}/>

            </Switch>
        </div>

    </BrowserRouter>
);

export default AppRouter