import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

//компонент-раут с обработкой ситуации, когда юзер попал на / по link из NotFoundPage,
// событие onAuthStateChanged не сработало и его не редируктнуло на /dashboard, хотя он залогинен.
//с этим раутом его редиректнет как надо.
export const PrivateRoute = (
    { isAuthenticated,
        component: Component, //переименовываю компонент, ибо реакт не любит лоуверкейс вызовы jsx компонентов
        //в нем будут лежать все остальные свойства аргумента, которые я не деструктуризировал
        ...rest
    })=>(
    <Route {...rest} component={(props)=>{
        //в props будут лежать history, location, etc.. для управления browser routing'ом, их передает Route по дефолту
        if(isAuthenticated){
            return <Redirect to='/dashboard'/>
        }

        return <Component {...props}/>
    }}/>
);

const mapStateToProps = (state)=>({
    isAuthenticated: !!state.auth.uid
});

export default connect(mapStateToProps)(PrivateRoute)