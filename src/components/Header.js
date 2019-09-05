import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from "../actions/auth";

const Header = (props)=>(
    <header>

        {//навлинк тоже самое, что и линк, но можно применять стили в зависимости от текущей страницы с помощью activeClassName
        }
        <header className='header'>
            <div className='content-container'>
                <div className='header__content'>
                    <Link className="header__title" to='/dashboard'>
                        <h1>Expensify</h1>
                    </Link>
                    <button className="button button--link" onClick={()=>{
                        props.dispatch(startLogout());
                    }}>Logout</button>
                </div>
            </div>
        </header>
        {/*<NavLink to='/create' activeClassName='is-active' exact={true}>Create expense</NavLink>*/}
    </header>
);

export default connect()(Header);