//pattern HOC - higher order component.
//HOC - компонент, который рендерить другой компонент
//1) reuse code
//2) render hijacking
//3) prop manipulation
//4) abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props)=>(
    <div>
        <h1>Very valuable info</h1>
        <p>is here: {props.info}</p>
    </div>
);

const withAdminWarning = (WrappedComponent)=>{
    return (props)=>(
        <div>
            {props.isAdmin && <p>This is private info. Please dont share!</p>
                //в jsx компонент можно заспредить объект и он распарсится на jsx аргументы тега. во как.
            }
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent)=>{
    return (props)=>(
        <div>
            {
                props.isAuthenticated ? <WrappedComponent {...props}/> :
                    <p>Please login.</p>
            }
        </div>
    )
}

const AdminInfo = withAdminWarning(Info);
const AuthInfo = requireAuthentication(Info);


// ReactDOM.render(<AdminInfo isAdmin={true} info="some info..."/>, document.getElementById('app'));
ReactDOM.render(<AuthInfo isAuthenticated={false} info="some info..."/>, document.getElementById('app'));

