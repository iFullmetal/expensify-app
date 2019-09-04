import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import Header from '../components/Header';

//для раутов, где необходима аунтификация

export const PrivateRoute = (
    { isAuthenticated,
        component: Component, //переименовываю компонент, ибо реакт не любит лоуверкейс вызовы jsx компонентов
        //в нем будут лежать все остальные свойства аргумента, которые я не деструктуризировал
        ...rest
    })=>(
    <Route {...rest} component={(props)=>{
        //в props будут лежать history, location, etc.. для управления browser routing'ом, их передает Route по дефолту
        if(isAuthenticated){
            //если юзер авторизован, рисую компонент
            return (
                <div>
                    <Header/>
                    <Component {...props}/>
                </div>
            );
        }
        //нет? дуй на логин пэйдж
        return <Redirect to='/'/>
    }}/>
);

const mapStateToProps = (state)=>({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute)