import React from 'react'
import { Link } from 'react-router-dom'

const NotFoundPage = ()=>(
    <div>
        <p>404 :c</p>
        {//Link - аналог href, но по дефолту в браузерах href вызывает рестарт страницы, т.к. приходиться обращаться
            //к серверу, что не есть хорошо в концепции слайент-сайд роутинга. В линке этого поведения нет.
        }
        <Link to='/'>Go home</Link>
    </div>
);

export default NotFoundPage