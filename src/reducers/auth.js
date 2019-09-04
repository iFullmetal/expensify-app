export default (state = {}, action)=>{
    switch (action.type) {
        case 'LOGIN':
            //сохраняю uid, что-то типа authtoken'а
            return {
                uid: action.uid
            };
        case 'LOGOUT':
            return {};
        default:
            return state;
    }
};