import { USER_LOGIN_SUCCESS } from "../actions/actionTypes";

export default (state = {
    token: null,
    userId: null,
    isAuthenticated: false
}, action) => {
    switch (action.type) {
        case USER_LOGIN_SUCCESS:
            console.log('From reducer:' + action.token);
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                isAuthenticated: true
            };
        default:
            return state;
    }
}