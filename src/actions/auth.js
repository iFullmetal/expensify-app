import { firebase, googleAuthProvider } from '../firebase/firebase'

export const login = (uid)=>({
    type: 'LOGIN',
    uid
});

//открывает окошко браузера для гугловскойаунтификации
export const startLogin = ()=>{
    return (dispatch)=>{
        return firebase.auth().signInWithPopup(googleAuthProvider);
    }
};

export const logout = ()=>({
    type: 'LOGOUT'
});

export const startLogout = ()=>{
    return (dispatch)=> {
        return firebase.auth().signOut();
    }
};