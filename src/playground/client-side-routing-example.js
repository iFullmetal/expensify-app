import React from 'react'
import reactDOM from 'react-dom'
import { BrowserRouter, Route, Switch, Link, NavLink } from 'react-router-dom'
//'reset' - штука, которая сносит дефолтные стили браузера, которые у всех браузеров разные
import 'normalize.css/normalize.css'
//гружу стили, а вебпак знает, что с ними делать, т.к. я ему это сказал в конфиге, а конфигу я все сказал в конфиге конфига, которому я.....
import './styles/styles.scss'

const ExpenseDashboardPage = ()=>(
    <div>
        <p>Dashboard page</p>
    </div>
);

const AddExpensePage = ()=>(
    <div>
        <p>Add expense page</p>
    </div>
);

const EditExpensePage = ()=>(
    <div>
        <p>Edit expanse page</p>
    </div>
);

const HelpPage = ()=>(
    <div>
        <p>Help page</p>
    </div>
);

const NotFoundPage = ()=>(
    <div>
        <p>404 :c</p>
        {//Link - аналог href, но по дефолту в браузерах href вызывает рестарт страницы, т.к. приходиться обращаться
            //к серверу, что не есть хорошо в концепции слайент-сайд роутинга. В линке этого поведения нет.
        }
        <Link to='/'>Go home</Link>
    </div>
);

const Header = ()=>(
    <header>
        <h1>Expensify</h1>
        {//навлинк тоже самое, что и линк, но можно применять стили в зависимости от текущей страницы с помощью activeClassName
        }
        <NavLink to='/' activeClassName='is-active' exact={true}>Home</NavLink>
        <NavLink to='/create' activeClassName='is-active' exact={true}>Create expense</NavLink>
        <NavLink to='/edit' activeClassName='is-active' exact={true}>Edit</NavLink>
        <NavLink to='/help' activeClassName='is-active' exact={true}>Help</NavLink>
    </header>
);

const routes = (
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
                <Route path='/edit' component={EditExpensePage}/>
                <Route path='/help' component={HelpPage}/>
                {//если ни один рауто не совпал, то рисую этот, т.к. раут без path всегда и везде подходит
                }
                <Route component={NotFoundPage}/>

            </Switch>
        </div>

    </BrowserRouter>
);

reactDOM.render(routes , document.getElementById('app'))