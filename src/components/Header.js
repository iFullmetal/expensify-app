import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = ()=>(
    <header>
        <h1>Expensify</h1>
        {//навлинк тоже самое, что и линк, но можно применять стили в зависимости от текущей страницы с помощью activeClassName
        }
        <NavLink to='/' activeClassName='is-active' exact={true}>Home</NavLink>
        <NavLink to='/create' activeClassName='is-active' exact={true}>Create expense</NavLink>
        <NavLink to='/help' activeClassName='is-active' exact={true}>Help</NavLink>
    </header>
);

export default Header