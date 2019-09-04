import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from "../actions/auth";

const Header = (props)=>(
    <header>
        <h1>Expensify</h1>
        {//навлинк тоже самое, что и линк, но можно применять стили в зависимости от текущей страницы с помощью activeClassName
        }
        <NavLink to='/dashboard' activeClassName='is-active' exact={true}>Home</NavLink>
        <NavLink to='/create' activeClassName='is-active' exact={true}>Create expense</NavLink>
        <button onClick={()=>{
            props.dispatch(startLogout());
        }}>Logout</button>
    </header>
);

export default connect()(Header);